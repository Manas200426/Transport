import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/CompanySetting.module.css";

const CompanySetting = ({ updateCompanyLogo }) => {
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logo: null,
    CIN: "",
    PAN: "",
    GSTIN: "",
    consignerSupport: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/company/get")
      .then((res) => setCompany(res.data))
      .catch(() => setCompany(null));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({ ...formData, logo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    await axios.post("http://localhost:5000/api/company/add", data)
      .then((res) => {
        const updatedCompany = res.data;
        localStorage.setItem("companyDetails", JSON.stringify(updatedCompany));
        updateCompanyLogo(`http://localhost:5000/uploads/${updatedCompany.logo}`); // Update Navbar Instantly
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className={styles.container}>
      <h2>Company Settings</h2>
      {company ? (
        <div className={styles.details}>
          <img src={`http://localhost:5000/uploads/${company.logo}`} alt="Company Logo" className={styles.logo} />
          <p><strong>Name:</strong> {company.name}</p>
          <p><strong>Address:</strong> {company.address}</p>
          <p><strong>CIN:</strong> {company.CIN}</p>
          <p><strong>PAN:</strong> {company.PAN}</p>
          <p><strong>GSTIN:</strong> {company.GSTIN}</p>
          <p><strong>Consigner Support:</strong> {company.consignerSupport}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="name" placeholder="Company Name" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Company Address" onChange={handleChange} required />
          <input type="file" name="logo" onChange={handleChange} required />
          <input type="text" name="CIN" placeholder="CIN" onChange={handleChange} required />
          <input type="text" name="PAN" placeholder="PAN" onChange={handleChange} required />
          <input type="text" name="GSTIN" placeholder="GSTIN" onChange={handleChange} required />
          <input type="text" name="consignerSupport" placeholder="Consigner Support" onChange={handleChange} required />
          <button type="submit">Save Company</button>
        </form>
      )}
    </div>
  );
};

export default CompanySetting;
