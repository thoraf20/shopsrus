import httpStatus from "http-status-codes";
import moment from 'moment'
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

export const getTotalnvoiceAmount = async (req, res) => {
  const body = { bill: 4500, user_id: "6232ce7d704aabdfa418bbb1", groceries: 250 };
    // req.body
  let amount = 0;

  try {
    const customer = await Customer.findById({ _id: body.user_id });
    
    if (!customer) {
      return res
      .status(httpStatus.NO_CONTENT)
      .json({ status: fail, data: "no user in the db yet" });
    }
    
    const timeDiffInMin = moment().diff(customer.createdAt, "years");
    
    if (customer.user_type === "affiliate") {
      amount += (body.bill - (body.bill * 0.1));
    }

    if (customer.user_type === 'employee') {
      amount += body.bill - (body.bill * 0.3)
    }

    if (customer.user_type === 'customer' && timeDiffInMin >= 2) {
      amount += body.bill - (body.bill * 0.05)
    }

    let totalAmount = amount

    if (totalAmount >= 100) {
      const ratio = Math.floor(totalAmount / 100)

      totalAmount -= (5 * ratio);
    }

    if (body.groceries) {
      totalAmount += body.groceries
    }

    return res
      .status(httpStatus.OK)
      .json({ msg: "success", data: {totalInvoiceAmount : totalAmount} });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};
