const numbersContainer = document.getElementById('numbers');
const latestResultBox = document.getElementById('latestResult');
const historyBox = document.getElementById('history');
const walletBox = document.getElementById('walletBalance');

const SUPABASE_URL = 'https://meqzyznfpiqitdrxsxax.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcXp5em5mcGlxaXRkcnhzeGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODQxNTgsImV4cCI6MjA5Mzc2MDE1OH0.IU0Q_EE3-6ozwhxJN5VVMWTDS00hYGbHm751yH2c47c';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let wallet = 1000;
let selectedNumber = '';

for (let i = 0; i < 100; i++) {

  const num = i.toString().padStart(2, '0');

  const btn = document.createElement('button');

  btn.className = 'number-btn';
  btn.innerText = num;

  btn.onclick = () => openBetPopup(num);

  numbersContainer.appendChild(btn);
}

function updateWallet() {
  walletBox.innerText = `₹${wallet}`;
}

updateWallet();

async function openBetPopup(number) {

  selectedNumber = number;

  const amount = prompt(`Enter amount for ${number}`);

  if (!amount) return;

  const betAmount = Number(amount);

  if (betAmount <= 0) {
    alert('Invalid Amount');
    return;
  }

  if (betAmount > wallet) {
    alert('Insufficient Balance');
    return;
  }

  const { data: existingBet } = await supabaseClient
    .from('bets')
    .select('*')
    .eq('selected_number', number)
    .eq('status', 'Pending');

  if (existingBet.length > 0) {
    alert('Bet already exists on this number');
    return;
  }

  wallet -= betAmount;

  updateWallet();

  await supabaseClient
    .from('bets')
    .insert([
      {
        selected_number: number,
        amount: betAmount,
        status: 'Pending'
      }
    ]);

  loadHistory();

  alert('Bet Placed Successfully');
}

async function loadResults() {

  const { data } = await supabaseClient
    .from('results')
    .select('*')
    .order('id', { ascending: false });

  if (data.length > 0) {
    latestResultBox.innerText =
      data[0].winning_number;
  }
}

async function loadHistory() {

  const { data } = await supabaseClient
    .from('bets')
    .select('*')
    .order('id', { ascending: false });

  historyBox.innerHTML = '';

  data.forEach((bet) => {

    const div = document.createElement('div');

    div.className = 'history-card';

    div.innerHTML = `
      <div>
        <h3>${bet.selected_number}</h3>
        <p>₹${bet.amount}</p>
      </div>

      <div>
        <span>${bet.status}</span>

        ${bet.status === 'Pending'
          ? `<button onclick="cutBet(${bet.id}, ${bet.amount})">Cut</button>`
          : ''}
      </div>
    `;

    historyBox.appendChild(div);

  });
}

async function cutBet(id, amount) {

  await supabaseClient
    .from('bets')
    .delete()
    .eq('id', id);

  wallet += amount;

  updateWallet();

  loadHistory();
}

loadResults();
loadHistory();
