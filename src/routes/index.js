import { Router } from 'express'
import { createCustomer, getallCustomerbyId, getallCustomers } from '../controllers/customers.js';

const router = Router()

router.route("/user").post(createCustomer).get(getallCustomers);
router.route("/user/:id").get(getallCustomerbyId);


export default router