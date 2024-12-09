import "./App.css";
import Table from "./Table";
import json from "./data.json";

function App() {
  const columnHeaders = ["CHAMBER", "126", "127", "437", "444", "447", "1100", "Testing Conducted", "Notes"];
  return (
    <>
      <Table json={json} columnHeaders={columnHeaders} />
    </>
  );
}

export default App;