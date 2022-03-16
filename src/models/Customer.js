import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 20,
    minlength: 3,
    trim: true,
  },
  user_type: {
    type: String,
    enum: ["affiliate", "employee", "over2years"],
    trim: true,
  },

  dateRegistered: {
    type: Date
  }
});

export default mongoose.model("Customer", CustomerSchema);
