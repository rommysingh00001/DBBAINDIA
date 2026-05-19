import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.https://ooqbjzhgezkdxwhmxlxp.supabase.co,
  process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vcWJqemhnZXprZHh3aG14bHhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTE5NDgzNywiZXhwIjoyMDk0NzcwODM3fQ.gp18EfxeVFhrlRImst9FizeRAkqHvG4EWTKNOvhYggc // service role key required for full access
);

export default async function handler(req, res) {
  try {
    const now = new Date();
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const currentHour = istTime.getHours();

    // Schedule hours (24h format) when draw should run
    const scheduledHours = [12, 13, 14]; // 12PM, 1PM, 2PM
    if (!scheduledHours.includes(currentHour)) {
      return res.status(200).json({ message: "Not a scheduled draw hour" });
    }

    // Fetch pending bets
    const { data: bets = [] } = await supabase
      .from("bets")
      .select("*")
      .eq("status", "pending");

    if (bets.length === 0) {
      return res.status(200).json({ message: "No pending bets" });
    }

    // Count total coins per number
    const totals = {};
    for (let i = 0; i <= 99; i++) totals[i.toString().padStart(2, "0")] = 0;
    bets.forEach(bet => {
      const num = String(bet.selected_number).padStart(2, "0");
      totals[num] += Number(bet.coins || 0);
    });

    // 3-Case Logic
    let winningNumber;
    const zeroBetNumbers = Object.keys(totals).filter(n => totals[n] === 0);
    if (zeroBetNumbers.length > 0) {
      winningNumber = zeroBetNumbers.length === 1 ? zeroBetNumbers[0] :
        zeroBetNumbers[Math.floor(Math.random() * zeroBetNumbers.length)];
    } else {
      winningNumber = Object.keys(totals).reduce((a, b) => totals[a] < totals[b] ? a : b);
    }

    // Insert winner into results table
    const { error: insertError } = await supabase
      .from("results")
      .insert([{ winning_number: winningNumber, created_at: new Date().toISOString() }]);

    if (insertError) throw insertError;

    // Update bets and user balances
    for (const bet of bets) {
      const isWin = bet.selected_number === winningNumber;
      if (isWin) {
        const { data: user } = await supabase
          .from("users")
          .select("balance")
          .eq("id", bet.user_id)
          .single();

        const newBalance = Number(user.balance || 0) + Number(bet.potential_win || 0);

        await supabase
          .from("users")
          .update({ balance: newBalance })
          .eq("id", bet.user_id);

        // Record in balance ledger
        await supabase.from("balance_ledger").insert([{
          user_id: bet.user_id,
          change_type: "win",
          amount: bet.potential_win,
          balance_after: newBalance,
          created_at: new Date().toISOString()
        }]);
      }

      await supabase
        .from("bets")
        .update({ status: isWin ? "win" : "lose" })
        .eq("id", bet.id);
    }

    return res.status(200).json({ message: `Winner announced: ${winningNumber}` });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
