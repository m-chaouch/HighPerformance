const path = require('path');

const optionsSwagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'HighPerformacen REST API Docs',
            version: '1.0.0',
            description: 'This is a simple REST API made with Express and documented with Swagger.'
        },
        servers: [
            {
                url: 'http://localhost:8080/api'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "The unique identifier for the user (automatically generated)"
                        },
                        username: {
                            type: "string",
                            description: "The username of the user",
                            example: "johndoe"
                        },
                        firstname: {
                            type: "string",
                            description: "The first name of the user",
                            example: "John"
                        },
                        lastname: {
                            type: "string",
                            description: "The last name of the user",
                            example: "Doe"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "The email address of the user",
                            example: "johndoe@example.com"
                        },
                        jobTitle: {
                            type: "string",
                            description: "The job title of the user",
                            example: "Software Engineer"
                        },
                        password: {
                            type: "string",
                            description: "The password for the user account",
                            example: "P@ssw0rd"
                        },
                        isAdmin: {
                            type: "boolean",
                            description: "Indicates if the user has admin privileges",
                            example: false
                        }
                    },
                    required: [
                        "username",
                        "firstname",
                        "lastname",
                        "email",
                        "password"
                    ]
                },
                PerformanceRecord: {
                    type: "object",
                    properties: {
                        salesManId: {
                            type: "string",
                            description: "The ID of the salesman",
                            example: "12345"
                        },
                        socialPerformance: {
                            type: "object",
                            properties: {
                                leadershipCompetence: {
                                    type: "object",
                                    properties: {
                                        actual: {
                                            type: "number",
                                            example: 75
                                        },
                                        target: {
                                            type: "number",
                                            example: 4
                                        }
                                    }
                                },
                                opennessToEmployee: {
                                    type: "object",
                                    properties: {
                                        actual: {
                                            type: "number",
                                            example: 100
                                        },
                                        target: {
                                            type: "number",
                                            example: 4
                                        }
                                    }
                                },
                                socialBehaviourToEmployee: {
                                    type: "object",
                                    properties: {
                                        actual: {
                                            type: "number",
                                            example: 50
                                        },
                                        target: {
                                            type: "number",
                                            example: 4
                                        }
                                    }
                                },
                                attitudeTowardsClients: {
                                    type: "object",
                                    properties: {
                                        actual: {
                                            type: "number",
                                            example: 100
                                        },
                                        target: {
                                            type: "number",
                                            example: 4
                                        }
                                    }
                                },
                                communicationSkills: {
                                    type: "object",
                                    properties: {
                                        actual: {
                                            type: "number",
                                            example: 120
                                        },
                                        target: {
                                            type: "number",
                                            example: 4
                                        }
                                    }
                                },
                                integrityToCompany: {
                                    type: "object",
                                    properties: {
                                        actual: {
                                            type: "number",
                                            example: 120
                                        },
                                        target: {
                                            type: "number",
                                            example: 4
                                        }
                                    }
                                }
                            }

                        },
                        salesPerformance: {
                            type: "object",
                            properties: {
                                list: {
                                    type: "object",
                                    example: {
                                        "Innovative Tech": {
                                            "rating": "0",
                                            "soldQuantity": 200
                                        },
                                        "Eco Solutions": {
                                            "rating": "1",
                                            "soldQuantity": 150
                                        },
                                        "Green Energy": {
                                            "rating": "1",
                                            "soldQuantity": 180
                                        },
                                        "Tech Dynamics": {
                                            "rating": "3",
                                            "soldQuantity": 100
                                        }  // Properly closing the object here
                                    }
                                }
                            }
                        },
                        date: {
                            type: "string",
                            description: "The year the record was created",
                            example: "12-05-2024"
                        },
                        calculatedBonus: {
                            type: "object",
                            description: "The calculated bonus for the performance record",
                            properties: {
                                socialBonus: {
                                    type: "object",
                                    properties: {
                                        leadershipCompetence: { type: "number" },
                                        opennessToEmployee: { type: "number" },
                                        socialBehaviourToEmployee: { type: "number" },
                                        attitudeTowardsClients: { type: "number" },
                                        communicationSkills: { type: "number" },
                                        integrityToCompany: { type: "number" },
                                        total: { type: "number" }
                                    }
                                },
                                salesBonus: {
                                    type: "object",
                                    example:{
                                        "InnovativeTech":2000,
                                        "EcoSolutions": 2250,
                                        "GreenEnergy": 2700,
                                        "TechDynamics": 2500,
                                        "total": 9450,
                                    }
                                }
     ,
                                totalBonus: {
                                    type: "object",
                                    properties: {
                                        sum: { type: "number", example: 9450 },
                                    }

                                }
                            }
                        },
                        isAcceptedByCEO: {
                            type: "boolean",
                            description: "Indicates if the record was accepted by the CEO",
                            example: false
                        },
                        isAcceptedByHR: {
                            type: "boolean",
                            description: "Indicates if the record was accepted by HR",
                            example: true
                        },
                        remark: {
                            type: "string",
                            description: "Any remarks associated with the performance record",
                            example: "Good performance overall"
                        }
                    },
                    required: [
                        "salesManId",
                        "socialPerformance",
                        "salesPerformance",
                        "date"
                    ]
                },
                CompanySales: {
                    type: "object",
                    properties: {
                        clientName: {
                            type: "string",
                            description: "The name of the client company",
                            example: "Acme Corp"
                        },
                        rating: {
                            type: "number",
                            description: "The rating of the company's sales performance",
                            example: 4.5
                        },
                        soldQuantity: {
                            type: "number",
                            description: "The quantity of products sold",
                            example: 150
                        }
                    },
                    required: [
                        "clientName",
                        "rating",
                        "soldQuantity"
                    ]
                },
                SalesPerformance: {
                    type: "object",
                    properties: {
                        list: {
                            type: "object",
                            additionalProperties: {
                                $ref: "#/components/schemas/CompanySales"
                            }
                        }
                    },
                    required: [
                        "list"
                    ]
                },
                Order: {
                    type: "object",
                    properties: {
                        SalesOrderID: {
                            type: "string",
                            description: "The unique identifier for the sales order",
                            example: "KASNBDKJBASF"
                        },
                        contractID: {
                            type: "string",
                            description: "The contract number associated with the order",
                            example: "UUDASDNGAC"
                        },
                        name: {
                            type: "string",
                            description: "The name of the order",
                            example: "Order for XYZ Corp"
                        },
                        clientID: {
                            type: "string",
                            description: "The unique identifier for the client",
                            example: "CL67890"
                        },
                        clientName: {
                            type: "string",
                            description: "The name of the client",
                            example: "XYZ Corp"
                        },
                        totalAmount: {
                            type: "number",
                            description: "The total amount for the order excluding tax",
                            example: 1000
                        },
                        totalAmountIncludingTax: {
                            type: "number",
                            description: "The total amount for the order including tax",
                            example: 1190
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "The date when the order was created",
                            example: "2024-09-15T12:00:00Z"
                        },
                        activeOn: {
                            type: "string",
                            format: "date",
                            description: "The date when the order becomes active",
                            example: "2024-09-20"
                        },
                        expiresOn: {
                            type: "string",
                            format: "date",
                            description: "The date when the order expires",
                            example: "2025-09-20"
                        },
                        contractCurrency: {
                            type: "string",
                            description: "The currency used in the contract",
                            example: "USD"
                        },
                        pricingRule: {
                            type: "number",
                            description: "The pricing rule applied to the order, if available",
                            example: 1
                        },
                        pricingState: {
                            type: "number",
                            description: "The current pricing state of the order",
                            example: 430
                        },
                        calcRule: {
                            type: "number",
                            nullable: true,
                            description: "The calculation rule applied to the order, if available",
                            example: 3
                        },
                        priority: {
                            type: "number",
                            description: "The priority level of the order",
                            example: 2
                        },
                        state: {
                            type: "string",
                            description: "The state of the contract associated with the order",
                            example: "active"
                        },
                        sellerID: {
                            type: "string",
                            description: "The unique identifier for the seller",
                            example: "SADFGGQWGD"
                        },
                        sellerName: {
                            type: "string",
                            description: "The name of the seller",
                            example: "John Doe"
                        }
                    },
                    required: [
                        "SalesOrderID",
                        "contractID",
                        "name",
                        "clientID",
                        "clientName",
                        "totalAmount",
                        "totalAmountIncludingTax",
                        "createdAt",
                        "activeOn",
                        "expiresOn",
                        "contractCurrency",
                        "pricingState",
                        "priority",
                        "state",
                        "sellerID",
                        "sellerName"
                    ]
                },
                Account: {
                    type: "object",
                    properties: {
                        UID: {
                            type: "string",
                            description: "The unique identifier for the account",
                            example: "SDAFGDGSBDDFH"
                        },
                        fullName: {
                            type: "string",
                            description: "The full name of the account holder",
                            example: "John Doe"
                        },
                        industry: {
                            type: "string",
                            description: "The industry the account is associated with",
                            example: "Technology"
                        },
                        name: {
                            type: "string",
                            description: "The name of the account, if available",
                            example: "XYZ Corp"
                        },
                        numberOfEmployeesCategory: {
                            type: "string",
                            description: "The category for the number of employees, if available",
                            example: "50-100"
                        },
                        rating: {
                            type: "integer",
                            description: "The rating of the account",
                            example: 5
                        },
                        governmentId: {
                            type: "string",
                            description: "The government ID associated with the account",
                            example: "90233"
                        },
                        vcard: {
                            type: "string",
                            description: "The vCard information of the account",
                            example: "BEGIN:VCARD\nFN:John Doe\nEND:VCARD"
                        }
                    }
                },
                Product: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the product",
                            example: "Product A"
                        },
                        productNumber: {
                            type: "string",
                            description: "The unique product number or SKU",
                            example: "ASFFFVAC"
                        },
                        minQuantity: {
                            type: "number",
                            description: "The minimum quantity available for the product",
                            example: 1
                        },
                        maxQuantity: {
                            type: "number",
                            description: "The maximum quantity available for the product",
                            example: 100
                        }
                    }
                },
                Position: {
                    type: "object",
                    properties: {
                        positionID: {
                            type: "string",
                            description: "The unique identifier for the position",
                            example: "POS12345"
                        },
                        positionNumber: {
                            type: "string",
                            description: "The number of the position in the order",
                            example: "1"
                        },
                        productID: {
                            type: "string",
                            description: "The unique identifier for the product associated with the position",
                            example: "PROD12345"
                        },
                        products: {
                            type: "array",
                            description: "The list of products associated with the position",
                            items: {
                                $ref: "#/components/schemas/Product"
                            }
                        },
                        productDescription: {
                            type: "string",
                            description: "A detailed description of the product",
                            example: "This is a high-quality product."
                        },
                        quantity: {
                            type: "number",
                            description: "The quantity of the product ordered",
                            example: 10
                        },
                        pricePerUnit: {
                            type: "number",
                            description: "The price per unit of the product",
                            example: 25.99
                        },
                        baseAmount: {
                            type: "number",
                            description: "The base amount for the position before tax",
                            example: 259.90
                        },
                        taxAmount: {
                            type: "number",
                            description: "The amount of tax applied to the position",
                            example: 20.79
                        },
                        amount: {
                            type: "number",
                            description: "The total amount for the position, including tax",
                            example: 280.69
                        }
                    }
                }
            }
        },
        responses: {
            400: {
                description: 'Something went wrong.'
            }
        }
    },
    apis: [path.join(__dirname, '../routes/api-routes.js')] // Use path.join for clarity
};

module.exports = optionsSwagger;
