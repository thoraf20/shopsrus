import { Router } from 'express'
import {
  createUser,
  getAllUserById,
  getAllUsers,
  getUserByName,
} from "../controllers/user.js";
import {
  createDiscount,
  getallDiscounts,
  getDiscountByType
} from '../controllers/discounts.js';
import { getTotalnvoiceAmount } from '../controllers/invoice.js';

const router = Router()

router.route("/user").post(createUser).get(getAllUsers);
  
router.route("/user/name").get(getUserByName);
  
router.route("/user/:id").get(getAllUserById);

router.route("/discount").post(createDiscount).get(getallDiscounts);
router.route("/discount/type").get(getDiscountByType)

router.route("/total_invoice_amount").get(getTotalnvoiceAmount);

export default router