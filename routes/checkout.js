import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config(); // 👈 NECESARIO aquí

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // 👈 ahora sí se va a leer

router.post("/", async (req, res) => {
  try {
    const { orderId, items, email } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items,
      success_url: `${process.env.CLIENT_URL}/success?orderId=${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/${orderId}`,
      metadata: { orderId },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

export default router;
