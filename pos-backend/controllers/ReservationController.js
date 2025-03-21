const createHttpError = require("http-errors");
const Reservation = require("../models/ReservationModel");
const { default: mongoose } = require("mongoose");

// POST: Dodavanje nove rezervacije
const addReservation = async (req, res, next) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res
      .status(201)
      .json({ success: true, message: "Reservation created!", data: reservation });
  } catch (error) {
    next(error);
  }
};

// GET: Dobavljanje svih rezervacija
const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

// PUT: Ažuriranje rezervacije
const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Provera da li je ID ispravan
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid id!"));
    }

    // Pronalazi i ažurira
    const reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });
    if (!reservation) {
      return next(createHttpError(404, "Reservation not found!"));
    }

    res.status(200).json({ success: true, message: "Reservation updated", data: reservation });
  } catch (error) {
    next(error);
  }
};

// DELETE: Brisanje rezervacije
const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Provera da li je ID ispravan
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(404, "Invalid id!"));
    }

    // Pronalazi i briše
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return next(createHttpError(404, "Reservation not found"));
    }

    // Vraćamo 204 (No Content) ako je uspešno obrisano
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReservation,
  getReservations,
  updateReservation,
  deleteReservation,
};
