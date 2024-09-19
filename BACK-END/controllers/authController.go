package controllers

import (
	"ASE/BACK-END/models"
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LoginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// type RegisterInput struct {
// 	Username string `json:"username" binding:"required"`
// 	Password string `json:"password" binding:"required"`
// 	Email    string `json:"email" binding:"required"`
// 	Role     string `json:"role" validate:"required,oneof=Kasir Tenant" binding:"required"`
// }

// LoginUser godoc
// @Summary Login as as user.
// @Description Logging in to get jwt token to access admin or user api by roles.
// @Tags Auth
// @Param Body body LoginInput true "the body to login a user"
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Router /login [post]
func Login(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var input LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u := models.User{}

	u.Username = input.Username
	u.Password = input.Password

	token, err := models.LoginCheck(u.Username, u.Password, db)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "username or password is incorrect."})
		return
	}

	if err := db.Where("username = ?", u.Username).First(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	user := map[string]string{
		"username": u.Username,
		"email":    u.Email,
		"Role":     u.Role,
	}

	c.JSON(http.StatusOK, gin.H{"message": "login success", "user": user, "token": token})

}

// Register godoc
// @Summary Register a user.
// @Description Registering a user from public access.
// @Tags Auth
// @Accept multipart/form-data
// @Param Username formData string true "Username"
// @Param Email formData string true "Email"
// @Param Password formData string true "Password"
// @Param Role formData string true "Role"
// @Param Pfp formData file false "Pfp"
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Router /register [post]
func Register(c *gin.Context) {
	// Define default photo URL
	defaultPhotoURL := "http://localhost:8080/Default_Photo/Default.png"

	// Get the file from the form data
	file, err := c.FormFile("Pfp")

	var fileName string
	if err != nil {
		// If no photo is uploaded, use the default photo URL
		fileName = defaultPhotoURL
	} else {
		// Define the path where the file will be saved, using UUID for uniqueness
		fileName = uuid.New().String() + filepath.Ext(file.Filename)
		filePath := filepath.Join("Storage_Photo", fileName)

		// Save the file to the defined path
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
			return
		}
	}

	// Validate input data using struct tags
	var user models.User
	user.Email = c.PostForm("Email")
	user.Username = c.PostForm("Username")
	user.Password = c.PostForm("Password")
	user.Role = c.PostForm("Role")

	user.Pfp = fileName
	// If no photo was uploaded, set ImageURL to default photo URL
	if fileName == defaultPhotoURL {
		user.ImageURL = defaultPhotoURL
	} else {
		user.ImageURL = fmt.Sprintf("http://localhost:8080/Storage_Photo/%s", fileName)
	}

	db := c.MustGet("db").(*gorm.DB)
	_, err = user.SaveUser(db)

	// Response data
	users := map[string]string{
		"username": user.Username,
		"email":    user.Email,
		"role":     user.Role,
		"profile":  user.Pfp,
	}

	c.JSON(http.StatusOK, gin.H{"message": "registration success", "user": users})
}

// GetAllUser godoc
// @Summary Get all User.
// @Description Get a list of User.
// @Tags Auth
// @Produce json
// @Success 200 {object} []models.User
// @Router /listUser [get]
func GetAllUser(c *gin.Context) {
	// get db from gin context
	db := c.MustGet("db").(*gorm.DB)
	var names []models.User
	db.Find(&names)

	c.JSON(http.StatusOK, gin.H{"data": names})
}

// GetUserById godoc
// @Summary Get User.
// @Description Get an User by id.
// @Tags Auth
// @Produce json
// @Param id path string true "user id"
// @Success 200 {object} models.User
// @Router /listUser/id/{id} [get]
func GetUserById(c *gin.Context) {
	var user models.User

	db := c.MustGet("db").(*gorm.DB)
	if err := db.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})

}

// GetUserByUsername godoc
// @Summary Get User.
// @Description Get an User by Username.
// @Tags Auth
// @Produce json
// @Param username path string true "user username"
// @Success 200 {object} models.User
// @Router /listUser/username/{username} [get]
func GetUserByUsername(c *gin.Context) {
	var user models.User

	db := c.MustGet("db").(*gorm.DB)
	//get user id
	if err := db.Where("username = ?", c.Param("username")).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})

}
