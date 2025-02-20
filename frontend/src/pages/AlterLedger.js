import { useEffect, useState } from "react";
import styles from "../styles/AlterLedger.module.css"; // Import CSS Module

const AlterLedger = () => {
  const [ledgers, setLedgers] = useState([]);
  const [filteredLedgers, setFilteredLedgers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  useEffect(() => {
    fetchLedgers();
  }, []);

  const fetchLedgers = async () => {
    try {
      const response = await fetch("https://transport-jxj1.onrender.com/api/ledger/all");
      const data = await response.json();
      setLedgers(data);
      setFilteredLedgers(data);
    } catch (error) {
      console.error("Error fetching ledgers:", error);
    }
  };

  const openEditPopup = (ledger) => {
    setSelectedLedger(ledger);
    setUpdatedFields({ ...ledger });
  };

  const handleChange = (e) => {
    setUpdatedFields({ ...updatedFields, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://transport-jxj1.onrender.com/api/ledger/update/${selectedLedger._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        }
      );

      const data = await response.json();
      alert(data.message);
      setSelectedLedger(null);
      fetchLedgers();
    } catch (error) {
      console.error("Error updating ledger:", error);
    }
  };

  // **Search Functionality**
  const handleSearch = (e) => {
    const query = e.target.value.trim(); // Remove leading/trailing spaces
    setSearchQuery(query);
  
    if (!query) {
      setFilteredLedgers(ledgers); // Reset when input is empty
      return;
    }
  
    const lowerCaseQuery = query.toLowerCase();
    setFilteredLedgers(
      ledgers.filter(({ name }) => name.toLowerCase().includes(lowerCaseQuery))
    );
  };
  

  return (
    <div className={styles.alterLedger}>
      <h2>Alter Ledger</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search ledgers..."
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchBox}
      />

      <table className={styles.ledgerTable}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredLedgers.map((ledger) => (
            <tr key={ledger._id}>
              <td
                className={styles.clickableName}
                onClick={() => openEditPopup(ledger)}
              >
                {ledger.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLedger && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Edit Ledger</h3>
            <div className={styles.ledgerForm}>
              <div className={styles.formRow}>
                <div className={styles.leftSection}>
                  <div className={styles.formGroup}>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={updatedFields.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Alias:</label>
                    <input
                      type="text"
                      name="alias"
                      value={updatedFields.alias || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Ledger Type:</label>
                    <input
                      type="text"
                      name="ledgerType"
                      value={updatedFields.ledgerType || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Contact Person:</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={updatedFields.contactPerson || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Mailing Name:</label>
                    <input
                      type="text"
                      name="mailingName"
                      value={updatedFields.mailingName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={updatedFields.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Country:</label>
                    <input
                      type="text"
                      name="country"
                      value={updatedFields.country || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.rightSection}>
                  <div className={styles.formGroup}>
                    <label>State:</label>
                    <input
                      type="text"
                      name="state"
                      value={updatedFields.state || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={updatedFields.city || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Pin Code:</label>
                    <input
                      type="text"
                      name="pin"
                      value={updatedFields.pin || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>GST Number:</label>
                    <input
                      type="text"
                      name="gst"
                      value={updatedFields.gst || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Mobile Number:</label>
                    <input
                      type="text"
                      name="mobile"
                      value={updatedFields.mobile || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={updatedFields.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.popupButtons}>
              <button className={styles.updateButton} onClick={handleUpdate}>
                Update
              </button>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedLedger(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlterLedger;
