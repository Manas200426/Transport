import React, { useState, useEffect } from "react";
import styles from "../styles/VehicleMaster.module.css";

const VehicleMaster = () => {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        vehicleName: "",
        vehicleNumber: "",
        vehicleOwnership: "Owned",
        vehicleType: ""
    });

    // Fetch Vehicles
    useEffect(() => {
        fetch("http://localhost:5000/api/vehicles")
            .then((res) => res.json())
            .then((data) => setVehicles(data))
            .catch((err) => console.error("Error fetching vehicles:", err));
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((newVehicle) => {
            setVehicles([...vehicles, newVehicle]); // Update the list
            setFormData({ vehicleName: "", vehicleNumber: "", vehicleOwnership: "Owned", vehicleType: "" });
        })
        .catch((err) => console.error("Error adding vehicle:", err));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Vehicle Master</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label>Vehicle Name:</label>
                    <input type="text" name="vehicleName" value={formData.vehicleName} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                    <label>Vehicle Number:</label>
                    <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                    <label>Ownership:</label>
                    <select name="vehicleOwnership" value={formData.vehicleOwnership} onChange={handleChange}>
                        <option value="Owned">Owned</option>
                        <option value="Hired">Hired</option>
                    </select>
                </div>
                <div className={styles.row}>
                    <label>Vehicle Type:</label>
                    <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
                </div>
                <button type="submit" className={styles.addButton}>Add Vehicle</button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Vehicle Name</th>
                        <th>Vehicle Number</th>
                        <th>Ownership</th>
                        <th>Vehicle Type</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle._id}>
                            <td>{vehicle.vehicleName}</td>
                            <td>{vehicle.vehicleNumber}</td>
                            <td>{vehicle.vehicleOwnership}</td>
                            <td>{vehicle.vehicleType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleMaster;
