package config

import (
	"ASE/BACK-END/models"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func ConnectDataBase() *gorm.DB {
	username := "root"
	password := "AtlanTica001"
	host := "tcp(127.0.0.1:3306)"
	database := "db_ase"

	dsn := fmt.Sprintf("%v:%v@%v/%v?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, database)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}

	db.AutoMigrate(&models.User{}, &models.Order{}, &models.Menu{})

	return db
}
