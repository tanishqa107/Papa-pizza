// server.ts (or index.ts)
import express from "express"
import cors from "cors";
import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // change to your frontend origin
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string; // service role key
const supabase = createClient(supabaseUrl, supabaseKey);

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


const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
