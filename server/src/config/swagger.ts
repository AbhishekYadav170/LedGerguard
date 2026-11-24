import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "LedgerGuard API",
      version: "1.0.0",
      description:
        "Multi-Tenant Billing Platform with JWT Authentication, RBAC, Audit Logs, API Keys and Tenant Isolation",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Customer",
        description: "Customer Management APIs",
      },
      {
        name: "Team",
        description: "Team Management APIs",
      },
      {
        name: "Audit",
        description: "Audit Log APIs",
      },
      {
        name: "API Keys",
        description: "API Key Management APIs",
      },
      {
        name: "Super Admin",
        description: "Platform Administration APIs",
      },
    ],
  },

  apis: [
    "./src/routes/*.ts",
  ],
};

export const swaggerSpec =
  swaggerJsdoc(options);