export default function WalletCard({
  title,
  value
}) {

  return (

    <div className="walletCard">

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
}
