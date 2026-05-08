.adminWrapper {
  display: flex;
  min-height: 100vh;
  background: #000;
  color: white;
}

.adminSidebar {
  width: 270px;
  background: #0d0d0d;
  border-right: 1px solid #222;
  padding: 35px 20px;
}

.adminSidebar h1 {
  color: gold;
  font-size: 34px;
  margin-bottom: 50px;
}

.adminSidebar ul {
  list-style: none;
}

.adminSidebar li {
  padding: 16px 18px;
  margin-bottom: 12px;
  border-radius: 16px;
  background: #111;
  border: 1px solid #222;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;
}

.adminSidebar li:hover {
  background: gold;
  color: black;
}

.adminContent {
  flex: 1;
  padding: 40px;
}

.adminTopbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
  gap: 20px;
  flex-wrap: wrap;
}

.adminTopbar h2 {
  font-size: 48px;
}

.adminTopbar p {
  color: #999;
  margin-top: 5px;
}

.adminTopbar button {
  background: gold;
  color: black;
  border: none;
  padding: 14px 28px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.adminCards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
}

.adminCard {
  background: #111;
  border: 1px solid #222;
  border-radius: 26px;
  padding: 35px;
}

.adminCard span {
  color: #999;
  display: block;
  margin-bottom: 15px;
}

.adminCard h3 {
  color: gold;
  font-size: 42px;
}

.publishSection {
  margin-top: 50px;
  background: #111;
  border: 1px solid #222;
  border-radius: 30px;
  padding: 35px;
}

.publishSection h3 {
  font-size: 32px;
  margin-bottom: 25px;
}

.publishControls {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.publishControls input {
  flex: 1;
  min-width: 250px;
  background: black;
  border: 1px solid #333;
  border-radius: 18px;
  padding: 18px;
  color: white;
  font-size: 18px;
}

.publishControls button {
  background: #00ff88;
  color: black;
  border: none;
  border-radius: 18px;
  padding: 18px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.betsSection {
  margin-top: 50px;
  background: #111;
  border: 1px solid #222;
  border-radius: 30px;
  padding: 35px;
  overflow-x: auto;
}

.sectionHeader {
  margin-bottom: 25px;
}

.sectionHeader h3 {
  font-size: 32px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  color: gold;
  text-align: left;
  padding-bottom: 20px;
  font-size: 18px;
}

td {
  padding: 18px 0;
  border-bottom: 1px solid #222;
  color: #ddd;
}

.win {
  color: #00ff88;
  font-weight: bold;
}

.lose {
  color: #ff4d4d;
  font-weight: bold;
}

.pending {
  color: gold;
  font-weight: bold;
}

@media (max-width: 900px) {
  .adminWrapper {
    flex-direction: column;
  }

  .adminSidebar {
    width: 100%;
  }

  .adminContent {
    padding: 20px;
  }

  .adminTopbar h2 {
    font-size: 36px;
  }
}
