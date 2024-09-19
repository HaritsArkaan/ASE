package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"ASE/BACK-END/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MenuInput struct {
	Photo    string `json:"photo"`
	Name     string `json:"name"`
	Amount   int    `json:"amount"`
	Tenant   string `json:"tenant"`
	Quantity uint   `json:"quantity"`
}

// GetAllMenu godoc
// @Summary Get all Menu.
// @Description Get a list of Menu.
// @Tags Menu
// @Produce json
// @Success 200 {object} []models.Menu
// @Router /menus [get]
func GetAllMenu(c *gin.Context) {
	// get db from gin context
	db := c.MustGet("db").(*gorm.DB)
	var names []models.Menu
	db.Find(&names)

	c.JSON(http.StatusOK, gin.H{"data": names})
}

// GetMenuById godoc
// @Summary Get Menu.
// @Description Get an Menu by id.
// @Tags Menu
// @Produce json
// @Param id path string true "Menu id"
// @Success 200 {object} models.Menu
// @Router /menus/id/{id} [get]
func GetMenuById(c *gin.Context) { // Get model if exist
	var menu models.Menu

	db := c.MustGet("db").(*gorm.DB)
	if err := db.Where("id = ?", c.Param("id")).First(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// GetIdByMenu godoc
// @Summary Get Id.
// @Description Get an id by nama Menu.
// @Tags Menu
// @Produce json
// @Param name path string true "Menu Name"
// @Success 200 {object} models.Menu
// @Router /menus/name/{name} [get]
func GetIdByMenu(c *gin.Context) {
	var menu models.Menu

	db := c.MustGet("db").(*gorm.DB)
	if err := db.Where("name = ?", c.Param("name")).First(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// CreateMenu godoc
// @Summary Create New Menu.
// @Description Creating a new Menu.
// @Tags Menu
// @Accept multipart/form-data
// @Param Photo formData file false "Photo menu"
// @Param Name formData string true "Nama Menu"
// @Param Amount formData int true "Amount"
// @Param Tenant formData string true "Nama Tenant"
// @Param Quantity formData int true "Quantity"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Produce json
// @Success 200 {object} models.Menu
// @Router /menus [post]
// CreateMenu godoc
// @Summary Create New Menu.
// @Description Creating a new Menu.
// @Tags Menu
// @Accept multipart/form-data
// @Param Photo formData file false "Photo menu"
// @Param Name formData string true "Nama Menu"
// @Param Amount formData int true "Amount"
// @Param Tenant formData string true "Nama Tenant"
// @Param Quantity formData int true "Quantity"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Produce json
// @Success 200 {object} models.Menu
// @Router /menus [post]
func CreateMenu(c *gin.Context) {
	// Define default photo URL
	defaultPhotoURL := "http://localhost:8080/Default_Photo/Default.png"

	// Get the file from the form data (optional)
	file, err := c.FormFile("Photo")

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
	var menu models.Menu
	menu.Name = c.PostForm("Name")
	Amount, _ := strconv.Atoi(c.PostForm("Amount"))
	menu.Amount = Amount
	menu.Tenant = c.PostForm("Tenant")
	Quantity, _ := strconv.Atoi(c.PostForm("Quantity"))
	menu.Quantity = Quantity

	menu.Photo = fileName
	// If no photo was uploaded, set ImageURL to default photo URL
	if fileName == defaultPhotoURL {
		menu.ImageURL = defaultPhotoURL
	} else {
		menu.ImageURL = fmt.Sprintf("http://localhost:8080/Storage_Photo/%s", fileName)
	}

	db := c.MustGet("db").(*gorm.DB)
	db.Create(&menu)

	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// UpdateMenu godoc
// @Summary Update Menu.
// @Description Update Menu by id.
// @Tags Menu
// @Produce json
// @Param id path string true "Menu id"
// @Param Photo formData file false "Photo menu"
// @Param Name formData string true "Nama Menu"
// @Param Amount formData int true "Amount"
// @Param Tenant formData string true "Nama Tenant"
// @Param Quantity formData int true "Quantity"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Success 200 {object} models.Menu
// @Router /menus/{id} [patch]
func UpdateMenu(c *gin.Context) {

	db := c.MustGet("db").(*gorm.DB)
	// Get model if exist
	var menu models.Menu
	if err := db.Where("id = ?", c.Param("id")).First(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input data using struct tags
	menu.Name = c.PostForm("Name")
	Amount, _ := strconv.Atoi(c.PostForm("Amount"))
	menu.Amount = Amount
	menu.Tenant = c.PostForm("Tenant")
	Quantity, _ := strconv.Atoi(c.PostForm("Quantity"))
	menu.Quantity = Quantity

	// Check if a new thumbnail file is uploaded
	file, err := c.FormFile("Photo")
	if err != nil && err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// If a new file is uploaded, save it and update the thumbnail field
	if file != nil {
		// Define the path where the file will be saved, using UUID for uniqueness
		fileName := uuid.New().String() + filepath.Ext(file.Filename)
		filePath := filepath.Join("Storage_Photo", fileName)

		// Save the file to the defined path
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
			return
		}

		// Remove old file if it's not the default photo
		if menu.Photo != "http://localhost:8080/Default_Photo/Default.png" {
			oldFilePath := filepath.Join("Storage_Photo", menu.Photo)
			if err := os.Remove(oldFilePath); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove old file", "Photo": menu})
				return
			}
		}

		// Update the thumbnail field in the database
		menu.Photo = fileName
		menu.ImageURL = fmt.Sprintf("http://localhost:8080/Storage_Photo/%s", fileName)
	}

	// Save updated menu to the database
	if err := db.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save updated news to database"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": menu})
}

// DeleteMenu godoc
// @Summary Delete one Menu.
// @Description Delete a Menu by id.
// @Tags Menu
// @Produce json
// @Param id path string true "Menu id"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Success 200 {object} map[string]boolean
// @Router /menus/{id} [delete]
func DeleteMenu(ctx *gin.Context) {
	menuID := ctx.Param("id")

	// Cari menu dari id
	var menu models.Menu
	db := ctx.MustGet("db").(*gorm.DB)
	if err := db.Where("id = ?", menuID).First(&menu).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Menu not found"})
		return
	}

	// tentuin file path dari file yg mau didelete
	filePath := filepath.Join("Storage_Photo", menu.Photo)

	// Check if the file exists and it's not the default photo
	if menu.Photo != "Default_Photo/Default.png" {
		if _, err := os.Stat(filePath); err == nil {
			// Delete file
			if err := os.Remove(filePath); err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete file"})
				return
			}
		}
	}

	// Delete menu from database
	if err := db.Delete(&menu).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete news from database"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Menu deleted successfully"})
}
