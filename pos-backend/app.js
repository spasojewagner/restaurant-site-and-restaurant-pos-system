require("dotenv").config();
const express = require("express");
const connectDB = require('./config/dataBase');
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express();

const PORT = config.port;
connectDB();

//MIDLEWARES
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173', 'http://localhost:5174']

}))
//app.use(express.json());

app.use(cookieParser());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString("utf8");
  }
}));

//root
app.get("/", (req, res) => {

  // const err= createHttpError(404, "Something went wrong");
  //throw err;
  res.json({ message: "Hi from backened" });

})

//other
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/OrderRoutes"));
app.use("/api/table", require("./routes/tablesRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));
app.use("/api/reservations", require("./routes/reservationRoute"));
app.use("/api/reviews", require("./routes/ReviewsRouter"));

console.log(app._router.stack.map(layer => layer.route?.path).filter(Boolean));





//global error
app.use(globalErrorHandler);
//server
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT} `);
  // console.log('PORT:', process.env.PORT);
  //  console.log('MONGODB_URI:', process.env.MONGODB_URI);

})