import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "LedgerGuard API",
      version: "1.0.0",
      description:
        "Multi Tenant Billing System",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec =
  swaggerJsdoc(options);