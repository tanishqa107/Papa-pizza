// server.ts (or index.ts)
import express from "express"
import cors from "cors";
import { createClient } from '@supabase/supabase-js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors({ origin: ['https://papa-pizza-dun.vercel.app', 'https://www.thepapapizza.com', 'http://localhost:5174'] }));
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string; // service role key
const supabase = createClient(supabaseUrl, supabaseKey);

// Razorpay setup
const razorpay = new Razorpay({
  key_id: 'rzp_live_RLqVBqxrDj5NsB', // Provided by user
  key_secret: 'LAk9TkKwkTgy4rHKt0Spcj3N', // Provided by user
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
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

// Create Razorpay order
app.post("/create-order", async (req, res) => {
  const { user_id, items, total, name, phone, address } = req.body;

  try {
    const options = {
      amount: Math.round(total * 100), // Amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: 'rzp_live_RLqVBqxrDj5NsB', // Public key for frontend
    });
  } catch (error: any) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

// Verify Razorpay payment
app.post("/verify-payment", async (req, res) => {
  const { order_id, payment_id, signature, user_id, items, total, name, phone, address } = req.body;

  try {
    const key_secret = 'LAk9TkKwkTgy4rHKt0Spcj3N';
    const generated_signature = crypto.createHmac('sha256', key_secret).update(order_id + "|" + payment_id).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(generated_signature), Buffer.from(signature))) {
      // Payment verified, save order to Supabase
      const { error } = await supabase.from("orders").insert({
        user_id,
        items,
        total,
        status: 'paid',
        razorpay_order_id: order_id,
        razorpay_payment_id: payment_id,
        name,
        phone,
        address,
      });

      if (error) throw error;

      // Send email notification
      const itemsList = items.map((item: any) => `${item.name} x${item.quantity} - ₹${item.price}`).join('\n');
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER, // Send to owner
        subject: 'New Order Received - Papa Pizza',
        text: `New order details:\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItems:\n${itemsList}\n\nTotal: ₹${total}`,
      };

      transporter.sendMail(mailOptions, (err: Error | null, info: nodemailer.SentMessageInfo) => {
        if (err) {
          console.error('Error sending email:', err);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
