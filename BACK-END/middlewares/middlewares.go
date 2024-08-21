package middlewares

import (
	"net/http"

	"ASE/BACK-END/utils/token"

	"github.com/gin-gonic/gin"
)

func TenantCheckMinddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := token.TokenValid(c)
		if err != nil {
			c.String(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}

		// Extract the user's role from the token
		role, err := token.ExtractUserRole(c)
		if err != nil {
			c.String(http.StatusUnauthorized, "Invalid token3")
			c.Abort()
			return
		}

		// Jika role tidak sesuai, berikan pesan error dan hentikan proses.
		if role != "Tenant" {
			c.String(http.StatusForbidden, "Access denied. Insufficient role.")
			c.Abort()
			return
		}
	}
}

func KasirCheckMinddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := token.TokenValid(c)
		if err != nil {
			c.String(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}

		// Extract the user's role from the token
		role, err := token.ExtractUserRole(c)
		if err != nil {
			c.String(http.StatusUnauthorized, "Invalid token")
			c.Abort()
			return
		}

		// Jika role tidak sesuai, berikan pesan error dan hentikan proses.
		if role != "Kasir" {
			c.String(http.StatusForbidden, "Access denied. Insufficient role.")
			c.Abort()
			return
		}
	}
}
