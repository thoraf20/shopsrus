import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    bill: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'Customer'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Discount", InvoiceSchema);
