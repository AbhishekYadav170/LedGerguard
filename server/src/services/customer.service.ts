import Customer from "../models/Customer";

export const createCustomerService =
async (
  name: string,
  email: string,
  tenantId: string
) => {

  return await Customer.create({
    name,
    email,
    tenantId,
  });

};

export const getCustomersService =
async (
  tenantId: string
) => {

  return await Customer.find({
    tenantId,
  });

};