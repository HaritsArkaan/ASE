// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/laporan": {
            "get": {
                "description": "Get a list of Laporan.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Laporan"
                ],
                "summary": "Get all Laporan.",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Laporan"
                            }
                        }
                    }
                }
            }
        },
        "/listUser": {
            "get": {
                "description": "Get a list of User.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Get all User.",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.User"
                            }
                        }
                    }
                }
            }
        },
        "/listUser/id/{id}": {
            "get": {
                "description": "Get an User by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Get User.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    }
                }
            }
        },
        "/listUser/username/{username}": {
            "get": {
                "description": "Get an User by Username.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Get User.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user username",
                        "name": "username",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.User"
                        }
                    }
                }
            }
        },
        "/login": {
            "post": {
                "description": "Logging in to get jwt token to access admin or user api by roles.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Login as as user.",
                "parameters": [
                    {
                        "description": "the body to login a user",
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.LoginInput"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        },
        "/menus": {
            "get": {
                "description": "Get a list of Menu.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Menu"
                ],
                "summary": "Get all Menu.",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Menu"
                            }
                        }
                    }
                }
            },
            "post": {
                "security": [
                    {
                        "BearerToken": []
                    },
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Creating a new Menu.\nCreating a new Menu.",
                "consumes": [
                    "multipart/form-data",
                    "multipart/form-data"
                ],
                "produces": [
                    "application/json",
                    "application/json"
                ],
                "tags": [
                    "Menu",
                    "Menu"
                ],
                "summary": "Create New Menu.",
                "parameters": [
                    {
                        "type": "file",
                        "description": "Photo menu",
                        "name": "Photo",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "description": "Nama Menu",
                        "name": "Name",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Amount",
                        "name": "Amount",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Nama Tenant",
                        "name": "Tenant",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Quantity",
                        "name": "Quantity",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    },
                    {
                        "type": "file",
                        "description": "Photo menu",
                        "name": "Photo",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "description": "Nama Menu",
                        "name": "Name",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Amount",
                        "name": "Amount",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Nama Tenant",
                        "name": "Tenant",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Quantity",
                        "name": "Quantity",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Menu"
                        }
                    }
                }
            }
        },
        "/menus/id/{id}": {
            "get": {
                "description": "Get an Menu by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Menu"
                ],
                "summary": "Get Menu.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Menu id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Menu"
                        }
                    }
                }
            }
        },
        "/menus/name/{name}": {
            "get": {
                "description": "Get an id by nama Menu.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Menu"
                ],
                "summary": "Get Id.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Menu Name",
                        "name": "name",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Menu"
                        }
                    }
                }
            }
        },
        "/menus/{id}": {
            "delete": {
                "security": [
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Delete a Menu by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Menu"
                ],
                "summary": "Delete one Menu.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Menu id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "additionalProperties": {
                                "type": "boolean"
                            }
                        }
                    }
                }
            },
            "patch": {
                "security": [
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Update Menu by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Menu"
                ],
                "summary": "Update Menu.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Menu id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "file",
                        "description": "Photo menu",
                        "name": "Photo",
                        "in": "formData"
                    },
                    {
                        "type": "string",
                        "description": "Nama Menu",
                        "name": "Name",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Amount",
                        "name": "Amount",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Nama Tenant",
                        "name": "Tenant",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "integer",
                        "description": "Quantity",
                        "name": "Quantity",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Menu"
                        }
                    }
                }
            }
        },
        "/order": {
            "get": {
                "description": "Get a list of Order.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Order"
                ],
                "summary": "Get all Order.",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.Order"
                            }
                        }
                    }
                }
            },
            "post": {
                "security": [
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Creating a new Order.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Order"
                ],
                "summary": "Create New Order.",
                "parameters": [
                    {
                        "description": "the body to create a new Order",
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.OrderInput"
                        }
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Order"
                        }
                    }
                }
            }
        },
        "/order/id/{id}": {
            "patch": {
                "security": [
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Update Order by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Order"
                ],
                "summary": "Update Order.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Order id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "the body to update ",
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.OrderInputId"
                        }
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Order"
                        }
                    }
                }
            }
        },
        "/order/{id}": {
            "delete": {
                "security": [
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Delete a Order by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Order"
                ],
                "summary": "Delete one Order.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Order id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "additionalProperties": {
                                "type": "boolean"
                            }
                        }
                    }
                }
            },
            "patch": {
                "security": [
                    {
                        "BearerToken": []
                    }
                ],
                "description": "Update Order by id.",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Order"
                ],
                "summary": "Update Order.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Order id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "the body to update ",
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.OrderInput"
                        }
                    },
                    {
                        "type": "string",
                        "description": "Authorization. How to input in swagger : 'Bearer \u003cinsert_your_token_here\u003e'",
                        "name": "Authorization",
                        "in": "header",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.Order"
                        }
                    }
                }
            }
        },
        "/register": {
            "post": {
                "description": "Registering a user from public access.",
                "consumes": [
                    "multipart/form-data"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Register a user.",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Username",
                        "name": "Username",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Email",
                        "name": "Email",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Password",
                        "name": "Password",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "Role",
                        "name": "Role",
                        "in": "formData",
                        "required": true
                    },
                    {
                        "type": "file",
                        "description": "Pfp",
                        "name": "Pfp",
                        "in": "formData"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "additionalProperties": true
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "controllers.LoginInput": {
            "type": "object",
            "required": [
                "password",
                "username"
            ],
            "properties": {
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "controllers.OrderInput": {
            "type": "object",
            "properties": {
                "menu_name": {
                    "type": "string"
                },
                "user_name": {
                    "type": "string"
                }
            }
        },
        "controllers.OrderInputId": {
            "type": "object",
            "properties": {
                "menu_id": {
                    "type": "integer"
                },
                "user_id": {
                    "type": "integer"
                }
            }
        },
        "models.Laporan": {
            "type": "object",
            "properties": {
                "created_at": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "metode_pembayaran": {
                    "type": "string"
                },
                "order_id": {
                    "type": "integer"
                },
                "pesanan": {
                    "type": "string"
                },
                "tenant": {
                    "type": "string"
                },
                "total": {
                    "type": "integer"
                }
            }
        },
        "models.Menu": {
            "type": "object",
            "properties": {
                "amount": {
                    "type": "integer"
                },
                "id": {
                    "type": "integer"
                },
                "imageURL": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "photo": {
                    "type": "string"
                },
                "quantity": {
                    "type": "integer"
                },
                "tenant": {
                    "type": "string"
                }
            }
        },
        "models.Order": {
            "type": "object",
            "properties": {
                "amount": {
                    "type": "integer"
                },
                "id": {
                    "type": "integer"
                },
                "menu_id": {
                    "type": "integer"
                },
                "user_id": {
                    "type": "integer"
                }
            }
        },
        "models.User": {
            "type": "object",
            "required": [
                "role"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "imageURL": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "pfp": {
                    "type": "string"
                },
                "role": {
                    "type": "string",
                    "enum": [
                        "Kasir",
                        "Tenant"
                    ]
                },
                "username": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
