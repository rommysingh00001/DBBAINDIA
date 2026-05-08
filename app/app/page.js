export default function TestPage() {
  return (
    <div style={{ backgroundColor: 'black', color: 'yellow', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>DBBA INDIA TEST SUCCESS!</h1>
      <p>अगर आप यह देख रहे हैं, तो आपकी वेबसाइट लाइव है।</p>
      <button onClick={() => alert('Working!')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Click Me
      </button>
    </div>
  );
}
