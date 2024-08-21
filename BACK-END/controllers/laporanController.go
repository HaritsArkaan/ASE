package controllers

import (
	"ASE/BACK-END/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type LaporanInput struct {
	OrderID uint   `json:"order_id"`
	Tenant  string `json:"tenant"`
	Pesanan string `json:"pesanan"`
	Total   int    `json:"total"`
}

// GetAllLaporan godoc
// @Summary Get all Laporan.
// @Description Get a list of Laporan.
// @Tags Laporan
// @Produce json
// @Success 200 {object} []models.Laporan
// @Router /laporan [get]
func GetAllLaporan(c *gin.Context) {
	// get db from gin context
	db := c.MustGet("db").(*gorm.DB)
	var names []models.Laporan
	db.Find(&names)

	c.JSON(http.StatusOK, gin.H{"data": names})
}
