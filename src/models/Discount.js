import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema(
  {
    discount_type: {
      type: String,
      required: [true, "Please provide discount type"],
      trim: true,
    },
    discount_value: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Discount", DiscountSchema);
