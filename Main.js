import React, { useState } from "react";
import "./Main.css";
import * as Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
  const [csvData, setCsvData] = useState([]);
  const [Query, setQuery] = useState("");
  const [data, setData] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: function (results) {
        setCsvData(results.data);
      },
    });
  };

  const downloadFile = () => {
    window.location.href = csvData;
  };

  const handlefilter = () => {
    setQuery(data);
  };

  const handleRowDelete = (index) => {
    setCsvData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      toast.success("Row deleted successfully!");
      return newData;
    });
  };
  console.log(csvData.length - 1);
  return (
    <>
      <ToastContainer />
      <div
        style={{
          paddingLeft: "100px",
          paddingRight: "100px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1>CSV Data Table</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <input type="file" onChange={handleFileSelect} accept=".csv" />
            <button>import</button>
          </div>
          {/* this button is used to download a file when link come on backend we have to made a backend api like this */}
          <div
            style={{
              backgroundColor: "#67016f",
              color: "white",
              textAlign: "center",
              fontSize: "14px",
              padding: "10px 30px",
              marginLeft: "10px",
            }}
            onClick={downloadFile}
          >
            Export CSV
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>User Input : </p>
            <div style={{ marginLeft: "5px" }}>
              <input onChange={(e) => setData(e.target.value)}></input>
            </div>
          </div>
          <div style={{ marginLeft: "5px" }}>
            <button onClick={handlefilter}>filter</button>
          </div>
          <div
            style={{
              backgroundColor: "#67016f",
              color: "white",
              textAlign: "center",
              fontSize: "14px",
              padding: "10px 30px",
              marginLeft: "15px",
            }}
            onClick={downloadFile}
          >
            Update Inventory
          </div>
        </div>
        <table>
          <thead>
            {csvData.map((row, index) => (
              <>
                {index == 0 && (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <>{value != "" && <th key={index}>{value}</th>}</>
                    ))}
                  </tr>
                )}
              </>
            ))}
          </thead>
          <tbody>
            {csvData
              .filter(
                (e) =>
                  (e[0] && e[0].toLowerCase().includes(Query.toLowerCase())) ||
                  (e[1] && e[1].toLowerCase().includes(Query.toLowerCase()))
              )
              .map((row, index) => (
                <>
                  {index != 0 && (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <>{index != 15 && <td key={index}>{value}</td>}</>
                      ))}
                      <td>
                        <button onClick={() => handleRowDelete(index)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Main;
