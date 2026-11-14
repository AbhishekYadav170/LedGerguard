import mongoose from "mongoose";

const auditLogSchema =
new mongoose.Schema({

  action: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model(
  "AuditLog",
  auditLogSchema
);