import React, { useState } from "react";
import styles from "../styles/LrEntry.module.css";
import { useEffect } from "react";
import axios from "axios";

const LrBooking = () => {
  const [cities, setCities] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [units, setUnits] = useState([]);
  const [formData, setFormData] = useState({
    lrNumber: "",
    lrDate: "",
    consignorName: "",
    consigneeName: "",
    ewayBillNo: "",
    ewayBillDate: "",
    expiryDate: "",
    invoiceNo: "",
    invoiceDate: "",
    invoiceAmount: "",
    toPay: "",
    transportType: "",
    vehicleNo: "",
    from: "",
    to: "",
    table: [],
    total: "",
  });

  const [tableData, setTableData] = useState([
    { hsnCode: "", productDescription: "", unit: "", taxableAmount: "" },
  ]);

  const handleChange = (e) => {
    console.log(`Updating ${e.target.name} to:`, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTableChange = (index, e) => {
    const newTable = [...tableData];
    newTable[index][e.target.name] = e.target.value;
    setTableData(newTable);
  };

  const addTableRow = () => {
    setTableData([
      ...tableData,
      { hsnCode: "", productDescription: "", unit: "", taxableAmount: "" },
    ]);
  };
  // Fetch units from UnitMaster
  useEffect(() => {
    fetch("http://localhost:5000/api/units") 
      .then((response) => response.json())
      .then((data) => setUnits(data))
      .catch((error) => console.error("Error fetching units:", error));
  }, []);
  //  city to from
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cities/all") // ✅ Correct API endpoint for CityMaster
      .then((response) => {
        if (response.data.success) {
          setCities(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ledger/all")
      .then((response) => setLedgers(response.data))
      .catch((error) => console.error("Error fetching ledgers:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, table: tableData };

    console.log("Submitting Data:", finalData); // ✅ Debugging

    try {
      const response = await fetch("http://localhost:5000/api/lr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json(); // ✅ Read server response

      if (response.ok) {
        alert("Data saved successfully!");
        setFormData({
          lrNumber: "",
          lrDate: "",
          consignorName: "",
          consigneeName: "",
          ewayBillNo: "",
          ewayBillDate: "",
          expiryDate: "",
          invoiceNo: "",
          invoiceDate: "",
          invoiceAmount: "",
          toPay: "",
          transportType: "",
          vehicleNo: "",
          from: "",
          to: "",
          table: [],
          total: "",
        });
        setTableData([
          { hsnCode: "", productDescription: "", unit: "", taxableAmount: "" },
        ]);
      } else {
        console.error("Server Response Error:", responseData);
        alert("Failed to save data: " + responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>LR Booking</nav>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* LR Number & Date */}
        <div className={styles.row}>
          <label>LR Number</label>
          <input
            type="text"
            name="lrNumber"
            className={styles.input}
            value={formData.lrNumber}
            onChange={handleChange}
            required
          />
          <label>LR Date</label>
          <input
            type="date"
            name="lrDate"
            className={styles.input}
            value={formData.lrDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Consignor, Consignee & To Pay */}
        <div className={styles.row}>
          <label>Consignor Name</label>
          <select
            name="consignorName"
            className={styles.select}
            value={formData.consignorName}
            onChange={handleChange}
          >
            <option value="">Select Consignor</option>
            {ledgers.map((ledger) => (
              <option key={ledger._id} value={ledger.name}>
                {ledger.name}
              </option>
            ))}
          </select>
          <label>Consignee Name</label>
          <select
            name="consigneeName"
            className={styles.select}
            value={formData.consigneeName}
            onChange={handleChange}
          >
            <option value="">Select Consignee</option>
            {ledgers.map((ledger) => (
              <option key={ledger._id} value={ledger.name}>
                {ledger.name}
              </option>
            ))}
          </select>
          <label>To Pay</label>
          <input
            type="number"
            name="toPay"
            className={styles.input}
            value={formData.toPay}
            onChange={handleChange}
            required
          />
        </div>

        {/* Transport Type, Vehicle No, From & To */}
        <div className={styles.row}>
          <label>Transport Type</label>
          <input
            type="text"
            name="transportType"
            className={styles.input}
            value={formData.transportType}
            onChange={handleChange}
            required
          />
          <label>Vehicle No</label>
          <input
            type="text"
            name="vehicleNo"
            className={styles.input}
            value={formData.vehicleNo}
            onChange={handleChange}
            required
          />
          <label>From</label>
          <select
            name="from"
            className={styles.select}
            value={formData.from}
            onChange={handleChange}
          >
            <option value="">Select From City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <label>To</label>
          <select
            name="to"
            className={styles.select}
            value={formData.to}
            onChange={handleChange}
          >
            <option value="">Select To City</option>
            {cities.map((city) => (
              <option key={city._id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* E-Way Bill Details */}
        <div className={styles.row}>
          <label>E-Way Bill No</label>
          <input
            type="text"
            name="ewayBillNo"
            className={styles.input}
            value={formData.ewayBillNo}
            onChange={handleChange}
            required
          />
          <label>E-Way Bill Date</label>
          <input
            type="date"
            name="ewayBillDate"
            className={styles.input}
            value={formData.ewayBillDate}
            onChange={handleChange}
            required
          />
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            className={styles.input}
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Invoice Details */}
        <div className={styles.row}>
          <label>Invoice No</label>
          <input
            type="text"
            name="invoiceNo"
            className={styles.input}
            value={formData.invoiceNo}
            onChange={handleChange}
            required
          />
          <label>Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            className={styles.input}
            value={formData.invoiceDate}
            onChange={handleChange}
            required
          />
          <label>Invoice Amount</label>
          <input
            type="number"
            name="invoiceAmount"
            className={styles.input}
            value={formData.invoiceAmount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Table */}
        {/* Table */}
        <table className={styles.table}>
  <thead>
    <tr>
      <th>Product Description</th>
      <th>HSN Code</th>
      <th>Rate</th>
      <th>Unit</th>
      <th>Taxable Amount</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map((row, index) => (
      <tr key={index}>
        <td>
          <select
            className="lrBookingSelect"
            name="productDescription"
            value={row.productDescription}
            onChange={(e) => handleTableChange(index, e)}
            required
          >
            <option value="">Select Product</option>
            {ledgers
              .filter((ledger) => ledger.ledgerType === "sales")
              .map((ledger) => (
                <option key={ledger._id} value={ledger.name}>
                  {ledger.name}
                </option>
              ))}
          </select>
        </td>
        <td>
          <input
            type="text"
            name="hsnCode"
            value={row.hsnCode}
            onChange={(e) => handleTableChange(index, e)}
            required
          />
        </td>
        <td>
          <input
            type="number"
            name="rate"
            value={row.rate}
            onChange={(e) => handleTableChange(index, e)}
            required
          />
        </td>
        <td>
          <input
            type="number"
            name="unit"
            value={row.unit }
            onChange={(e) => handleTableChange(index, e)}
            required
          />
          <span className={styles.unitText}>kg</span>
        </td>
        <td>
          <input
            type="number"
            name="taxableAmount"
            value={row.rate * row.unit || 0} // Auto-calculated
            readOnly
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

<button
  type="button"
  onClick={addTableRow}
  className={styles.addRowButton}
>
  Add Row
</button>

{/* Total Amount */}
<div
  className={`${styles.row} ${styles.totalAmount}`}
  style={{ justifyContent: "flex-end" }}
>
  <label className={styles.totalAmountLabel}>Total Amount</label>
  <input
    type="number"
    name="total"
    className={styles.totalAmountInput}
    value={tableData.reduce((sum, row) => sum + (row.rate * row.unit || 0), 0)} // Sum of taxable amounts
    readOnly
  />
</div>
        <button type="submit" className={styles.button}>
          Yes / No
        </button>
      </form>
    </div>
  );
};

export default LrBooking;
