import React, { useEffect, useState } from "react";
import styles from "../styles/DisplayLr.module.css";

const DisplayLr = () => {
  const [lrData, setLrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLr, setSelectedLr] = useState(null); // Store selected LR for popup

  useEffect(() => {
    const fetchLrData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/lr");
        if (!response.ok) {
          throw new Error("Failed to fetch LR data");
        }
        const data = await response.json();
        setLrData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLrData();
  }, []);

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
      const pdfUrl = `http://localhost:5000/api/lr/${selectedLr._id}/pdf`;
      window.open(pdfUrl, "_blank");
    }
  };

  // Calculate Grand Total
  const grandTotal = lrData.reduce((sum, lr) => sum + (parseFloat(lr.total) || 0), 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>LR Records</h2>

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
              {lrData.length > 0 ? (
                lrData.map((lr) => (
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
    </div>
  );
};

export default DisplayLr;
