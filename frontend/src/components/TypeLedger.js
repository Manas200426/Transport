import React, { useState, useEffect } from "react";
import styles from "../styles/TypeLedger.module.css"; // Import module.css

const TypeLedger = () => {
  const [type, setType] = useState("");
  const [ledgerTypes, setLedgerTypes] = useState([]);

  // Fetch ledger types from backend
  useEffect(() => {
    fetchLedgerTypes();
  }, []);

  const fetchLedgerTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ledger-types");
      const data = await response.json();
      setLedgerTypes(data);
    } catch (error) {
      console.error("Error fetching ledger types:", error);
    }
  };

  const handleAddType = async () => {
    if (!type.trim()) return alert("Please enter a valid ledger type");

    try {
      const response = await fetch("http://localhost:5000/api/ledger-types", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Error adding ledger type");
        return;
      }

      const newType = await response.json();
      setLedgerTypes([...ledgerTypes, newType]); // Update state
      setType(""); // Clear input field
    } catch (error) {
      console.error("Error adding ledger type:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Type of Ledger</h2>

      <div className={styles.ledgerList}>
        {ledgerTypes.length > 0 ? (
          ledgerTypes.map((ledger, index) => (
            <div key={index} className={styles.ledgerItem}>
              {ledger.type}
            </div>
          ))
        ) : (
          <p>No ledger types added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TypeLedger;
