import React, { useEffect, useState } from "react";
import styles from "../styles/DisplayLr.module.css";

const DisplayLr = () => {
  const [lrData, setLrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Function to handle PDF download
  const handleDownload = (id) => {
    const pdfUrl = `http://localhost:5000/api/lr/${id}/pdf`;
    window.open(pdfUrl, "_blank"); // Open in a new tab
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>LR Records</h2>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>LR Number</th>
              <th>LR Date</th>
              <th>Consignor Name</th>
              <th>Total Amount</th>
              <th>Download</th> {/* New column for the Download button */}
            </tr>
          </thead>
          <tbody>
            {lrData.length > 0 ? (
              lrData.map((lr) => (
                <tr key={lr._id}>
                  <td>{lr.lrNumber}</td>
                  <td>{lr.lrDate}</td>
                  <td>{lr.consignorName}</td>
                  <td>{lr.total}</td>
                  <td>
                    <button className={styles.downloadBtn} onClick={() => handleDownload(lr._id)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  No LR records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayLr;
