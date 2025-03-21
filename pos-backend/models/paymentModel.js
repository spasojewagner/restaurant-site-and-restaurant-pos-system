const mongoose= require("mongoose")

const paymentSchema= new mongoose.Schema({
    paymentId: String, // Jedinstveni identifikator za plaćanje
    orderId: String, // Jedinstveni identifikator za porudžbinu
    amount: Number, // Iznos plaćanja
    currency: String, // Valuta plaćanja
    status: String, // Status plaćanja
    method: String, // Način plaćanja
    email: String, // Email korisnika
    contact: String, // Kontakt informacije
    createdAt: Date // Datum i vreme plaćanja
})
const Payment = mongoose.model("Payment", paymentSchema);
module.exports=Payment;