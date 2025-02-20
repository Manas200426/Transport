import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CreateLedger.module.css"; // Import the CSS module

const CreateLedger = () => {
  const [ledgerTypes, setLedgerTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [ledger, setLedger] = useState({
    name: "",
    alias: "",
    ledgerType: "",
    mailingName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin: "",
    gst: "",
    contactPerson: "",
    mobile: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://transport-jxj1.onrender.com/api/ledger-types") // Update with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setLedgerTypes(data))
      .catch((error) => console.error("Error fetching ledger types:", error));
  }, []);

  const handleChange = (e) => {
    setLedger({ ...ledger, [e.target.name]: e.target.value });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter ledger types dynamically
    const filtered = ledgerTypes.filter((type) =>
      (typeof type === "string" ? type : type.type)
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredTypes(filtered);
  };

  // Handle selection from dropdown
  const handleSelectType = (selectedType) => {
    setLedger({ ...ledger, ledgerType: selectedType });
    setSearchTerm(selectedType);
    setFilteredTypes([]); // Hide suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://transport-jxj1.onrender.com/api/ledger/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ledger),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        navigate("/admin-home"); // Redirect to home
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.ledgerContainer}>
      {/* Navbar */}
      <div className={styles.navbar}>Ledger Creation</div>

      <form onSubmit={handleSubmit} className={styles.ledgerForm}>
        <div className={styles.formRow}>
          {/* Left Section: Name, Alias, Type of Ledger */}
          <div className={styles.leftSection}>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input type="text" name="name" onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Alias:</label>
              <input type="text" name="alias" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Type of Ledger:</label>
              <input
                type="text"
                name="ledgerType"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Ledger Type..."
                required
                autoComplete="off"
              />
              {/* Show dropdown only when input has value and filtered results exist */}
              {searchTerm && filteredTypes.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {filteredTypes.map((type, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        handleSelectType(typeof type === "string" ? type : type.type)
                      }
                    >
                      {typeof type === "string" ? type : type.type}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Section: Company Info */}
          <div className={styles.rightSection}>
            <div className={styles.companyInfoHeader}>Company Info</div>
            <div className={styles.addressSection}>
              <div className={styles.formGroup}>
                <label>Mailing Name:</label>
                <input type="text" name="mailingName" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Address:</label>
                <input type="text" name="address" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Country:</label>
                <input type="text" name="country" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>State:</label>
                <input type="text" name="state" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>City:</label>
                <input type="text" name="city" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Pin:</label>
                <input type="text" name="pin" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>GST Number:</label>
                <input type="text" name="gst" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Contact Person:</label>
                <input type="text" name="contactPerson" onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Mobile Number:</label>
                <input type="text" name="mobile" onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Email ID:</label>
                <input type="email" name="email" onChange={handleChange} required />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className={styles.saveContainer}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLedger;
