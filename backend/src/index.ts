// server.ts (or index.ts)
import express from "express"
import cors from "cors";
import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";


dotenv.config();

const allowedOrigins = [
  "https://papa-pizza-dun.vercel.app",
  "http://localhost:5173",
  "https://www.thepapapizza.com"
];

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    
  })
)
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string; // service role key
const supabase = createClient(supabaseUrl, supabaseKey);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "your_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "your_key_secret",
});

app.post("/login", async (req, res) => {
  const { name, number } = req.body;

  try {
    const { error } = await supabase.from("profiles").insert({
      name,
      phone: number,
   
    });

    if (error) throw error;

    res.json({ success: true });
  } catch (err: any) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/orders", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});


app.post("/api/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});



app.post("/send-mail", async (req, res) => {
  try {
    const { pizzas, customerName, phone, address, amount } = req.body;

    if (!pizzas || !Array.isArray(pizzas) || pizzas.length === 0) {
      return res.status(400).json({ success: false, error: "No pizzas provided" });
    }

    // Configure transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    // Build pizza list
    const pizzaList = pizzas.map((p: any) => `🍕 ${p.name} x${p.quantity}`).join("\n");

    const mailOptions = {
      from: `"Papa Pizza" <${process.env.USER_EMAIL}>`,
      to: process.env.USER_EMAIL,
      subject: "New Order Received ✅",
      text: `
Order Received!

Customer: ${customerName}
Phone: ${phone}
Address: ${address}

Pizzas:
${pizzaList}

Total Paid: ₹${amount}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Mail sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Mail not sent" });
  }
});






const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
