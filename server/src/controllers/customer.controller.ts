import { Response } from "express";

import { AuthRequest }
from "../middleware/auth.middleware";

import {
 createCustomerService,
 getCustomersService,
}
from "../services/customer.service";

export const createCustomer =
async (
 req: AuthRequest,
 res: Response
) => {

 try {

  const { name, email }
   = req.body;

  const customer =
   await createCustomerService(
    name,
    email,
    req.user.tenantId
   );

  res.status(201).json({
   success:true,
   data:customer,
  });

 } catch(error:any){

  res.status(400).json({
   success:false,
   message:error.message,
  });

 }

};

export const getCustomers =
async (
 req: AuthRequest,
 res: Response
) => {

 try {

  const customers =
   await getCustomersService(
    req.user.tenantId
   );

  res.status(200).json({
   success:true,
   data:customers,
  });

 } catch(error:any){

  res.status(400).json({
   success:false,
   message:error.message,
  });

 }

};