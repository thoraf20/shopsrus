import httpStatus from 'http-status-codes'
import Joi from 'joi'
import User from '../models/User.js'


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res
        .status(httpStatus.NO_CONTENT)
        .json({msg: success, data: "no user in the db yet" });
    }

    return res.status(httpStatus.OK).json({ msg: "success", data: users});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'an error occur'})
  }
}

export const getAllUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });

    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "user does not exist" });
    } else {
      return res.status(httpStatus.OK).json({ msg: "success", data: user });
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};

export const getUserByName = async (req, res) => {
  const { name } = req.query;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "user does not exist" });
    } else {
      return res.status(httpStatus.OK).json({ msg: "success", data: user });
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};

export const createUser = async (req, res) => {
  const requestSchema = Joi.object({
    name: Joi.string().required(),
    user_type: Joi.string().required(),
  });

  const { value, error } = requestSchema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
  const userData = { ...value };

  await User.create(userData);

  if (User) {
    return res.status(httpStatus.CREATED).json({ msg: "success" });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "an error occur" });
  }
};