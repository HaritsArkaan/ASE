package controllers

import (
	"net/http"

	"ASE/BACK-END/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type OrderInput struct {
	UserName string `json:"user_name"`
	MenuName string `json:"menu_name"`
}

type OrderInputId struct {
	MenuID int `json:"menu_id"`
	UserID int `json:"user_id"`
}

// GetAllOrder godoc
// @Summary Get all Order.
// @Description Get a list of Order.
// @Tags Order
// @Produce json
// @Success 200 {object} []models.Order
// @Router /order [get]
func GetAllOrder(c *gin.Context) {
	// get db from gin context
	db := c.MustGet("db").(*gorm.DB)
	var names []models.Order
	db.Find(&names)

	c.JSON(http.StatusOK, gin.H{"data": names})
}

// CreateOrder godoc
// @Summary Create New Order.
// @Description Creating a new Order.
// @Tags Order
// @Param Body body OrderInput true "the body to create a new Order"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Produce json
// @Success 200 {object} models.Order
// @Router /order [post]
func CreateOrder(c *gin.Context) {
	// Validate input
	var input OrderInput
	var menu models.Menu
	var user models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := c.MustGet("db").(*gorm.DB)
	//get menu id
	if err := db.Where("name = ?", input.MenuName).First(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}
	// Check if the menu quantity is less than one
	if menu.Quantity < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Stock habis/kosong"})
		return
	}
	//get user id
	if err := db.Where("username = ?", input.UserName).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Create Order
	Order := models.Order{
		UserID: user.ID,
		MenuID: menu.ID,
		Amount: menu.Amount,
	}

	// Decrease menu quantity
	menu.Quantity -= 1

	// Save updated menu to the database
	if err := db.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update menu quantity"})
		return
	}

	// Save Order to database
	if err := db.Create(&Order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Order})
}

// UpdateOrder godoc
// @Summary Update Order.
// @Description Update Order by id.
// @Tags Order
// @Produce json
// @Param id path string true "Order id"
// @Param Body body OrderInput true "the body to update "
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Success 200 {object} models.Order
// @Router /order/{id} [patch]
func UpdateOrder(c *gin.Context) {
	var input OrderInput
	var menu, menu1 models.Menu
	var user models.User
	db := c.MustGet("db").(*gorm.DB)
	// Get model if exist
	var order models.Order
	if err := db.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if err := db.Where("id = ?", order.MenuID).First(&menu1).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//get menu id
	if err := db.Where("name = ?", input.MenuName).First(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}
	// Check if the menu quantity is less than one
	if menu.Quantity < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Stock habis/kosong"})
		return
	}

	// Increase Quantity of Previous Menu
	menu1.Quantity += 1
	// Save updated menu1 to the database
	if err := db.Save(&menu1).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update menu quantity"})
		return
	}

	// Decrease menu quantity
	menu.Quantity -= 1
	// Save updated menu to the database
	if err := db.Save(&menu).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update menu quantity"})
		return
	}

	//get user id
	if err := db.Where("username = ?", input.UserName).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	updatedInput := models.Order{
		UserID: user.ID,
		MenuID: menu.ID,
		Amount: menu.Amount,
	}

	db.Model(&order).Updates(updatedInput)

	c.JSON(http.StatusOK, gin.H{"data": order})
}

// UpdateOrder godoc
// @Summary Update Order.
// @Description Update Order by id.
// @Tags Order
// @Produce json
// @Param id path string true "Order id"
// @Param Body body OrderInputId true "the body to update "
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Success 200 {object} models.Order
// @Router /order/id/{id} [patch]
func UpdateOrderbyId(c *gin.Context) {
	var input OrderInputId
	var menu models.Menu
	db := c.MustGet("db").(*gorm.DB)
	// Get model if exist
	var order models.Order
	if err := db.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Where("id = ?", order.MenuID).First(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	updatedInput := models.Order{
		UserID: uint(input.UserID),
		MenuID: uint(input.MenuID),
		Amount: menu.Amount,
	}

	db.Model(&order).Updates(updatedInput)

	c.JSON(http.StatusOK, gin.H{"data": order})
}

// DeleteOrder godoc
// @Summary Delete one Order.
// @Description Delete a Order by id.
// @Tags Order
// @Produce json
// @Param id path string true "Order id"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Success 200 {object} map[string]boolean
// @Router /order/{id} [delete]
func DeleteOrder(c *gin.Context) {
	// Get model if exist
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	if err := db.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&order)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
