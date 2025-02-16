import React, { useState, useEffect } from "react";
import styles from "../styles/UnitMaster.module.css"; // CSS Module for styling

const UnitMaster = () => {
    const [formData, setFormData] = useState({
        type: "",
        symbol: "",
        formalName: "",
        unitQualityCode: "",
        decimalPlaces: ""
    });
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fetch units from backend
    const fetchUnits = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/units");
            const data = await response.json();
            setUnits(data);
        } catch (error) {
            console.error("Error fetching units:", error);
        }
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/units", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create unit");
            }

            setFormData({
                type: "",
                symbol: "",
                formalName: "",
                unitQualityCode: "",
                decimalPlaces: ""
            });

            fetchUnits();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Unit Master</h2>

            {/* Compact Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label className={styles.label}>Type:</label>
                    <input className={styles.input} type="text" name="type" value={formData.type} onChange={handleChange} required />
                </div>

                <div className={styles.row}>
                    <label className={styles.label}>Symbol:</label>
                    <input className={styles.input} type="text" name="symbol" value={formData.symbol} onChange={handleChange} required />
                </div>

                <div className={styles.row}>
                    <label className={styles.label}>Formal Name:</label>
                    <input className={styles.input} type="text" name="formalName" value={formData.formalName} onChange={handleChange} required />
                </div>

                <div className={styles.row}>
                    <label className={styles.label}>UQC:</label>
                    <input className={styles.input} type="text" name="unitQualityCode" value={formData.unitQualityCode} onChange={handleChange} required />
                </div>

                <div className={styles.row}>
                    <label className={styles.label}>Decimals:</label>
                    <input className={styles.input} type="number" name="decimalPlaces" value={formData.decimalPlaces} onChange={handleChange} required min="0" />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Unit"}
                </button>
            </form>

            {error && <p className={styles.error}>{error}</p>}

            {/* Compact Table Below Form */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Symbol</th>
                        <th>Formal Name</th>
                        <th>UQC</th>
                        <th>Decimals</th>
                    </tr>
                </thead>
                <tbody>
                    {units.length > 0 ? (
                        units.map((unit) => (
                            <tr key={unit._id}>
                                <td>{unit.type}</td>
                                <td>{unit.symbol}</td>
                                <td>{unit.formalName}</td>
                                <td>{unit.unitQualityCode}</td>
                                <td>{unit.decimalPlaces}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No units available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UnitMaster;
