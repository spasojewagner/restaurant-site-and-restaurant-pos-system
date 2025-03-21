const express = require("express");
const router = express.Router();
const { addReservation, getReservations, updateReservation, deleteReservation } = require("../controllers/ReservationController");

// Ruta za dodavanje rezervacije (POST)
router.route("/").post(addReservation)

// Ruta za dobijanje svih rezervacija (GET)
router.route("/").get(getReservations)

router.route("/:id").put( updateReservation);

router.route("/:id").delete(deleteReservation)

module.exports = router;


