// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import checkoutRoute from "./routes/checkout.js";

dotenv.config();

const app = express();

// ✅ Middleware CORS para permitir tanto local como producción
app.use(cors({
  origin: [
    "http://localhost:3000",           // para desarrollo local
    "https://mekacatstore.com"         // cambia por tu dominio real si es diferente
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ✅ Ruta de checkout
app.use("/api/checkout", checkoutRoute);

// ✅ Logs útiles
console.log("[Stripe key]", process.env.STRIPE_SECRET_KEY ? "✔️ Cargada" : "❌ No cargada");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
