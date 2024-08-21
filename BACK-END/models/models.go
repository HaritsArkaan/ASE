package models

import (
	"html"
	"strings"

	"ASE/BACK-END/utils/token"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type (
	// User
	User struct {
		ID       uint    `gorm:"primaryKey;autoIncrement:true"`
		Username string  `json:"username"`
		Email    string  `json:"email"`
		Password string  `json:"password"`
		Role     string  `json:"role" validate:"required,oneof=Kasir Tenant"`
		Pfp      string  `json:"pfp"`
		ImageURL string  `json:"imageURL"`
		Orders   []Order `json:"-"`
	}

	// Menu
	Menu struct {
		ID       uint    `gorm:"primaryKey;autoIncrement:true"`
		Photo    string  `json:"photo"`
		Name     string  `json:"name"`
		Amount   int     `json:"amount"`
		Tenant   string  `json:"tenant"`
		ImageURL string  `json:"imageURL"`
		Quantity int     `json:"quantity"`
		Orders   []Order `json:"-"`
	}

	// Order
	Order struct {
		ID     uint `gorm:"primaryKey;autoIncrement:true"`
		Amount int  `json:"amount"`
		UserID uint `json:"user_id"`
		MenuID uint `json:"menu_id"`
		Menu   Menu `json:"-"`
		User   User `json:"-"`
	}

	// Laporan
	Laporan struct {
		ID               uint   `gorm:"primaryKey;autoIncrement:true"`
		OrderID          uint   `json:"order_id"`
		Tenant           string `json:"tenant"`
		Pesanan          string `json:"pesanan"`
		MetodePembayaran string `json:"metode_pembayaran"`
		Total            int    `json:"total"`
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

	token, err := token.GenerateToken(u.ID, u.Role) // Pass the user's role to generateToken function
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
