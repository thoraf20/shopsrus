import { Router } from 'express'
import {
  createCustomer,
  getallCustomerbyId,
  getallCustomers,
  getCustomerByName
} from '../controllers/customers.js';
import {
  createDiscount,
  getallDiscounts,
  getDiscountByType
} from '../controllers/discounts.js';
import { getTotalnvoiceAmount } from '../controllers/invoice.js';

const router = Router()

router
  .route("/user")
  .post(createCustomer)
  .get(getallCustomers)
  
  
router.route("/user/name").get(getCustomerByName);
  
router.route("/user/:id").get(getallCustomerbyId);


router.route("/discount").post(createDiscount).get(getallDiscounts);
router.route("/discount/type").get(getDiscountByType)

router.route("/total_invoice_amount").get(getTotalnvoiceAmount);

export default router