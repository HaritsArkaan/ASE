package controllers

import (
	"net/http"

	"ASE/BACK-END/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type OrderInput struct {
	Amount int  `json:"amount"`
	UserID uint `json:"user_id"`
	MenuID uint `json:"menu_id"`
}

// GetAllOrder godoc
// @Summary Get all Order.
// @Description Get a list of Order.
// @Tags Order
// @Produce json
// @Success 200 {object} []models.Order
// @Router /orders [get]
func GetAllBrand(c *gin.Context) {
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
// @Router /orders [post]
func CreateOrder(c *gin.Context) {
	// Validate input
	var input OrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create Order
	Order := models.Order{Amount: input.Amount}
	db := c.MustGet("db").(*gorm.DB)
	db.Create(&Order)

	c.JSON(http.StatusOK, gin.H{"data": Order})
}

// UpdateOrder godoc
// @Summary Update Order.
// @Description Update Order by id.
// @Tags Order
// @Produce json
// @Param id path string true "Order id"
// @Param Body body OrderInput true "the body to update age rating category"
// @Param Authorization header string true "Authorization. How to input in swagger : 'Bearer <insert_your_token_here>'"
// @Security BearerToken
// @Success 200 {object} models.Order
// @Router /orders/{id} [patch]
func UpdateOrder(c *gin.Context) {

	db := c.MustGet("db").(*gorm.DB)
	// Get model if exist
	var order models.Order
	if err := db.Where("id = ?", c.Param("id")).First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input OrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updatedInput models.Order
	updatedInput.Amount = input.Amount

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
