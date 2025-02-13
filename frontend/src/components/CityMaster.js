import { useState, useEffect } from "react";
import styles from "../styles/CityMaster.module.css"; // Ensure this CSS file exists

const CityMaster = () => {
  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cities/all");
      const data = await response.json();
      if (data.success) {
        setCities(data.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleAddCity = async (e) => {
    e.preventDefault();
    if (!cityName || !stateName || !country) {
      alert("Please fill all fields!");
      return;
    }

    const newCity = { name: cityName, state: stateName, country };

    try {
      const response = await fetch("http://localhost:5000/api/cities/add-city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      const data = await response.json();
      if (data.success) {
        alert("City added successfully!");
        setCityName("");
        setStateName("");
        setCountry("");
        fetchCities();
      } else {
        alert("Failed to add city!");
      }
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>City Master</h2>

      {/* Add City Form */}
      <form onSubmit={handleAddCity} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>City Name:</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>State:</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.addButton}>Add City</button>
      </form>

      {/* City List */}
      <h3 className={styles.subtitle}>Stored Cities</h3>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {cities.length > 0 ? (
              cities.map((city) => (
                <tr key={city._id}>
                  <td>{city.name}</td>
                  <td>{city.state}</td>
                  <td>{city.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No cities found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityMaster;
