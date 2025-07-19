import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [orderNo, setOrderNo] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    if (!orderNo) return alert("Enter Order Number");

    try {
      // const res = await axios.get( `http://localhost:5000/api/routing?orderNo=${orderNo}`);
      const res = await axios.get(
        `http://localhost:5000/api/routing?orderNo=${orderNo}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }
  };

  const exportToExcel = () => {
    if (data.length === 0) return alert("No data to export!");

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RoutingData");

    XLSX.writeFile(workbook, `RoutingData_${orderNo}.xlsx`);
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <h2 className="app-title">Workorder Data Count</h2>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Order Number"
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
          />
          <button onClick={fetchData}>Search</button>
          <button onClick={exportToExcel}>Export Excel</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {data[0] &&
                  Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
