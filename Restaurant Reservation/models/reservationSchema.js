import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your First name"],
    trim: true,
    maxlength: [100, "First name cannot be more than 100 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide your Last name"],
    trim: true,
    maxlength: [100, "Last name cannot be more than 100 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    minlength: [10, "Phone number must be 10 digits"],
    maxlength: [10, "Phone number must be 10 digits"],
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'en-IN'), // ✅ localized for India
      message: "Please provide a valid Indian phone number"
    }
  },
  date: {
    type: Date,
    required: [true, "Please provide a reservation date"]
  },
  time: {
    type: String,
    required: [true, "Please provide a reservation time"]
  },
  guests: {
    type: Number,
    required: [true, "Please provide the number of guests"],
    min: [1, "Number of guests must be at least 1"]
  }
}, {
  timestamps: true
});

export const Reservation = mongoose.model("Reservation", reservationSchema);

