package models

import (
	"html"
	"strings"
	"time"

	"ASE/BACK-END/utils/token"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type (
	// User
	User struct {
		ID       uint   `gorm:"primaryKey;autoIncrement:true"`
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Role     string `json:"role" validate:"required,oneof=Kasir Tenant"`
	}

	// Order
	Order struct {
		ID     uint   `gorm:"primaryKey;autoIncrement:true"`
		Amount int    `json:"amount"`
		UserID []User `json:"-"`
		MenuID []Menu `json:"-"`
	}

	// Menu
	Menu struct {
		ID        uint      `gorm:"primaryKey;autoIncrement:true"`
		Name      string    `json:"name"`
		Amount    int       `json:"amount"`
		Desc      string    `json:"desc"`
		Tenant    string    `json:"tenant"`
		CreatedAt time.Time `json:"created_at"`
		UpdatedAt time.Time `json:"updated_at"`
	}
)

func VerifyPassword(password, hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func LoginCheck(username string, password string, db *gorm.DB) (string, error) {

	var err error

	u := User{}

	err = db.Model(User{}).Where("username = ?", username).Take(&u).Error

	if err != nil {
		return "", err
	}

	err = VerifyPassword(password, u.Password)

	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", err
	}

	token, err := token.GenerateToken(u.ID)

	if err != nil {
		return "", err
	}

	return token, nil

}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {
	//turn password into hash
	hashedPassword, errPassword := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if errPassword != nil {
		return &User{}, errPassword
	}
	u.Password = string(hashedPassword)
	//remove spaces in username
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))

	var err error = db.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}
