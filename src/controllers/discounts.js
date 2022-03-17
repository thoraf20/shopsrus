import httpStatus from "http-status-codes";
import Joi from "joi";
import Discount from "../models/Discount.js";

export const getallDiscounts = async (req, res) => {
  try {
    const discount = await Discount.find();

    if (!discount) {
      return res
        .status(httpStatus.NO_CONTENT)
        .json({ status: httpStatus.NO_CONTENT, data: "no discount in the db yet" });
    }

    return res.status(httpStatus.OK).json({ msg: "success", data: discount });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};

export const getDiscountByType = async (req, res) => {
  const { type } = req.params;

  try {
    const discount = await Discount.findOne({ discount_type: type });

    if (!discount) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "discount does not exist" });
    } else {
      return res.status(httpStatus.OK).json({ msg: "success", data: discount });
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};

export const createDiscount = async (req, res) => {
  const requestSchema = Joi.object({
    discount_type: Joi.string().required(),
    discount_value: Joi.number().required(),
  });

  const { value, error } = requestSchema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
  const discountData = { ...value };

  await Discount.create(discountData);

  if (Discount) {
    return res.status(httpStatus.CREATED).json({ msg: "success" });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};
