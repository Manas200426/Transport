import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/CreateLedger.module.css"; // Import the CSS module

const CreateLedger = () => {
  const [ledgerTypes, setLedgerTypes] = useState([]);
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

  const handleChange = (e) => {
    setLedger({ ...ledger, [e.target.name]: e.target.value });
  };

  // Fetch ledger types from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/ledger-types") // Update with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setLedgerTypes(data))
      .catch((error) => console.error("Error fetching ledger types:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/ledger/create", {
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
      <div className={styles.navbar}>Ledger creation</div>

      <form onSubmit={handleSubmit} className={styles.ledgerForm}>
        {/* First Row: Left & Right Sections */}
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
              <select
                name="ledgerType"
                value={ledger.ledgerType}
                onChange={handleChange}
                required
              >
                <option value="">Select Ledger Type</option>
                {ledgerTypes.map((type, index) => (
                  <option
                    key={index}
                    value={typeof type === "string" ? type : type.type}
                  >
                    {typeof type === "string" ? type : type.type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Section: Company Info Header + Mailing Name to GST */}
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
            </div>
          </div>
        </div>

        {/* Second Row: Contact Person + Mobile & Email */}
        <div className={styles.contactSection}>
          <div className={styles.formGroup}>
            <label>Contact Person:</label>
            <input type="text" name="contactPerson" onChange={handleChange} />
          </div>
          <div className={styles.rightContact}>
            <div className={styles.formGroup}>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobile"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email ID:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
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
