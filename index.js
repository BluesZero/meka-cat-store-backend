import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import checkoutRoute from "./routes/checkout.js";
import paymentIntentRoute from "./routes/paymentIntent.js";


dotenv.config();

const app = express();

// 💡 SOLO permite origenes válidos en desarrollo
const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use("/api/checkout", checkoutRoute);

app.use("/api/create-payment-intent", paymentIntentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
