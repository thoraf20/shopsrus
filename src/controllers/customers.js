import httpStatus from 'http-status-codes'
import Joi from 'joi'
import Customer from '../models/Customer.js'


export const getallCustomers = async (rq, res) => {
  try {
    const customers = await Customer.find()

    if (!customers) {
      return res.status(httpStatus.NO_CONTENT)
        .json({ status: httpStatus.NO_CONTENT, data: 'no user in the db yet' })
    }

    return res.status(httpStatus.OK).json({msg: 'success', data: customers})
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ msg: 'an error occur'})
  }
}

export const getallCustomerbyId = async (req, res) => {

  const { id } = req.params
  try {
    const customer = await Customer.findById({ _id: id })
    
    if (!customer) {
      return res.status(httpStatus.BAD_REQUEST).json({msg: 'user does not exist'})
    } else {
      return res.status(httpStatus.OK).json({msg: 'success', data: customer})
    }

  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg: 'an error occur'})
  }
}

export const getCustomerByName = async (req, res) => {
  console.log(req)
  const { name } = req.query


  try {
    const customer = await Customer.findOne({ name })
    
    if (!customer) {
      return res.status(httpStatus.BAD_REQUEST).json({msg: 'user does not exist'})
    } else {
      return res.status(httpStatus.OK).json({msg: 'success', data: customer})
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg: 'an error occur'})
  }
}

export const createCustomer = async (req, res) => {
  const requestSchema = Joi.object({
    name: Joi.string().required(),
    user_type: Joi.string().required(),
    dateRegistered: Joi.date().required()
  });

  const { value, error } = requestSchema.validate(req.body);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
  const userData = { ...value }
    
    await Customer.create(userData)

  if (Customer) {
    return res.status(httpStatus.CREATED).json({ msg: 'success' })
  } else {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({msg: 'an error occur'})
  }
  
}