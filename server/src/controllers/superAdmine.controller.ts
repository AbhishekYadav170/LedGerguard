import { Request, Response } from "express";
import Tenant from "../models/Tenants";

export const getAllTenants = async (
  req: Request,
  res: Response
) => {

  const tenants =
    await Tenant.find();

  res.status(200).json({
    success: true,
    data: tenants,
  });

};

export const suspendTenant = async (
  req: Request,
  res: Response
) => {

  const tenant =
    await Tenant.findByIdAndUpdate(

      req.params.id,

      {
        status: "suspended",
      },

      {
        new: true,
      }

    );

  res.json({
    success: true,
    data: tenant,
  });

};

export const activateTenant = async (
  req: Request,
  res: Response
) => {

  const tenant =
    await Tenant.findByIdAndUpdate(

      req.params.id,

      {
        status: "active",
      },

      {
        new: true,
      }

    );

  res.json({
    success: true,
    data: tenant,
  });

};