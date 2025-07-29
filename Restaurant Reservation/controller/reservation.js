import ErrorHandler from "../database/error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time, guests } = req.body;

  // 👇 Updated logic to properly validate guests = 0
  if (
    !firstName || !lastName || !email || !phone ||
    !date || !time || guests == null
  ) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  try {
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      guests
    });

    res.status(200).json({
      success: true,
      message: "Reservation created successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(`Validation Error: ${validationErrors.join(', ')}`, 400));
    }

    return next(error);
  }
};