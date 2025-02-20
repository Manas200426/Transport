import React, { useEffect, useState } from "react";
import styles from "../styles/DisplayLr.module.css";

const DisplayLr = () => {
  const [lrData, setLrData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Stores filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLr, setSelectedLr] = useState(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  // Filter States
  const [consignorName, setConsignorName] = useState("");
  const [lrNumber, setLrNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchLrData = async () => {
      try {
        const response = await fetch("https://transport-jxj1.onrender.com/api/lr");
        if (!response.ok) {
          throw new Error("Failed to fetch LR data");
        }
        const data = await response.json();
        setLrData(data);
        setFilteredData(data); // Initially, filteredData = all data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLrData();
  }, []);

  // Apply Filters
  const applyFilters = () => {
    let filtered = lrData;

    if (consignorName) {
      filtered = filtered.filter(lr =>
        lr.consignorName.toLowerCase().includes(consignorName.toLowerCase())
      );
    }

    if (lrNumber) {
      filtered = filtered.filter(lr => lr.lrNumber.includes(lrNumber));
    }

    if (fromDate && toDate) {
      filtered = filtered.filter(lr => {
        const lrDate = new Date(lr.lrDate);
        return lrDate >= new Date(fromDate) && lrDate <= new Date(toDate);
      });
    }

    setFilteredData(filtered);
    setIsFilterPopupOpen(false); // Close the popup after filtering
  };

  // Reset Filters
  const resetFilters = () => {
    setConsignorName("");
    setLrNumber("");
    setFromDate("");
    setToDate("");
    setFilteredData(lrData); // Reset table to show all data
    setIsFilterPopupOpen(false);
  };

  // Open popup with LR details
  const openPopup = (lr) => {
    setSelectedLr(lr);
  };

  // Close popup
  const closePopup = () => {
    setSelectedLr(null);
  };

  // Handle PDF download
  const handleDownload = () => {
    if (selectedLr) {
      const pdfUrl = `https://transport-jxj1.onrender.com/api/lr/${selectedLr._id}/pdf`;
      window.open(pdfUrl, "_blank");
    }
  };

  // Calculate Grand Total
  const grandTotal = filteredData.reduce((sum, lr) => sum + (parseFloat(lr.total) || 0), 0);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>LR Records</h2>
        </div>
  
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
  
        {!loading && !error && (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>LR Number</th>
                  <th>LR Date</th>
                  <th>Consignor Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((lr) => (
                    <tr key={lr._id} onClick={() => openPopup(lr)} className={styles.clickableRow}>
                      <td>{lr.lrNumber}</td>
                      <td>{lr.lrDate}</td>
                      <td>{lr.consignorName}</td>
                      <td>{lr.from}</td>
                      <td>{lr.to}</td>
                      <td>{lr.total}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noData}>
                      No LR records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
  
            {/* Grand Total Display */}
            <div className={styles.grandTotalContainer}>
              <strong>Grand Total: </strong> ₹{grandTotal.toFixed(2)}
            </div>
          </>
        )}
  
        {/* Popup for LR Details */}
        {selectedLr && (
          <div className={styles.popupOverlay} onClick={closePopup}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
              <h3>LR Details</h3>
              <p><strong>LR Number:</strong> {selectedLr.lrNumber}</p>
              <p><strong>LR Date:</strong> {selectedLr.lrDate}</p>
              <p><strong>Consignor Name:</strong> {selectedLr.consignorName}</p>
              <p><strong>From:</strong> {selectedLr.from}</p>
              <p><strong>To:</strong> {selectedLr.to}</p>
              <p><strong>Total Amount:</strong> {selectedLr.total}</p>
  
              <button className={styles.downloadBtn} onClick={handleDownload}>
                Download PDF
              </button>
              <button className={styles.closeBtn} onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        )}
  
        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className={styles.popupOverlay} onClick={() => setIsFilterPopupOpen(false)}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
              <h3>Filter Records</h3>
              <input type="text" placeholder="Consignor Name" value={consignorName} onChange={(e) => setConsignorName(e.target.value)} />
              <input type="text" placeholder="LR Number" value={lrNumber} onChange={(e) => setLrNumber(e.target.value)} />
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
  
              <button className={styles.filterBtn} onClick={applyFilters}>Filter</button>
              <button className={styles.cancelBtn} onClick={resetFilters}>Cancel</button>
            </div>
          </div>
        )}
      </div>
  
      {/* Sidebar with filter button */}
      <div className={styles.sidebar}>
        <button className={styles.filterButton} onClick={() => setIsFilterPopupOpen(true)}>
          Filter
        </button>
      </div>
    </div>
  );  
};

export default DisplayLr;
