import httpStatus from "http-status-codes";
import moment from 'moment'
import User from "../models/User.js";
import Invoice from "../models/Invoice.js";

export const getTotalnvoiceAmount = async (req, res) => {
  const body = {
    bill: 4500,
    user_id: "6233984f3ea1ef427ed40293",
    groceries: 250,
  };
    // req.body
  let amount = 0;

  try {
    const user = await User.findById({ _id: body.user_id });
    
    if (!user) {
      return res
        .status(httpStatus.NO_CONTENT)
        .json({ status: fail, data: "no user in the db yet" });
    }
    
    const timeDiffInMin = moment().diff(user.createdAt, "years");
    
    if (user.user_type === "affiliate") {
      amount += body.bill - body.bill * 0.1;
    }

    if (user.user_type === "employee") {
      amount += body.bill - body.bill * 0.3;
    }

    if (user.user_type === "customer" && timeDiffInMin >= 2) {
      amount += body.bill - body.bill * 0.05;
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
