import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import checkoutRoute from "./routes/checkout.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/checkout", checkoutRoute);

console.log(process.env.STRIPE_SECRET_KEY)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
