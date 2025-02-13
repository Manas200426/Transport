import { useState } from "react";
import CreateLedger from "./CreateLedger";
import AlterLedger from "./AlterLedger";
import CityMaster from "../components/CityMaster";
import CompanySetting from "../components/CompanySetting";
import LrBooking from "../components/LrBooking";  // ✅ Import LrBooking Component
import DisplayLr from "../components/DisplayLr";
import styles from "../styles/AdminHome.module.css";


const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState("welcome");
  const [showMasterOptions, setShowMasterOptions] = useState(false);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const [showBookingOptions, setShowBookingOptions] = useState(false); // ✅ New State

  return (
    <div className={styles.adminContainer}>
      {/* Navbar */}
      <div className={styles.navbar}>Admin Dashboard</div>

      {/* Sidebar & Content Section */}
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          {/* Master Section */}
          <button onClick={() => setShowMasterOptions(!showMasterOptions)}>
            Master
          </button>
          {showMasterOptions && (
            <div className={styles.subMenu}>
              <button onClick={() => setActiveComponent("createLedger")}>
                Create Ledger
              </button>
              <button onClick={() => setActiveComponent("alterLedger")}>
                Alter Ledger
              </button>
              <button onClick={() => setActiveComponent("CityMaster")}>
                City Master
              </button>
            </div>
          )}

          {/* Settings Section */}
          <button onClick={() => setShowSettingsOptions(!showSettingsOptions)}>
            Settings
          </button>
          {showSettingsOptions && (
            <div className={styles.subMenu}>
              <button onClick={() => setActiveComponent("companySetting")}>
                Company Setting
              </button>
            </div>
          )}

          {/* ✅ Booking Entry Section */}
          <button onClick={() => setShowBookingOptions(!showBookingOptions)}>
            Booking Entry
          </button>
          {showBookingOptions && (
            <div className={styles.subMenu}>
              <button onClick={() => setActiveComponent("lrBooking")}>
                LR Booking
              </button>
              <button onClick={() => setActiveComponent("DisplayLr")}>
                Display LR
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Content Rendering */}
        <div className={styles.content}>
          {activeComponent === "welcome" && <h2>Welcome Admin</h2>}
          {activeComponent === "createLedger" && <CreateLedger />}
          {activeComponent === "alterLedger" && <AlterLedger />}
          {activeComponent === "CityMaster" && <CityMaster />}
          {activeComponent === "companySetting" && <CompanySetting />}
          {activeComponent === "lrBooking" && <LrBooking />} 
          {activeComponent === "DisplayLr" && <DisplayLr />} 
           {/* ✅ New Component */}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
