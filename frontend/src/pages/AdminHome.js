import { useState } from "react";
import CreateLedger from "./CreateLedger";
import AlterLedger from "./AlterLedger";
import CityMaster from "../components/CityMaster";
import CompanySetting from "../components/CompanySetting";
import LrBooking from "../components/LrBooking";
import DisplayLr from "../components/DisplayLr";
import styles from "../styles/AdminHome.module.css";
import TypeLedger from "../components/TypeLedger";
import UnitMater from "../components/UnitMater";
import VehicleMaster from "../components/VehicleMaster";

const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState("welcome");
  const [showMasterOptions, setShowMasterOptions] = useState(false);
  const [showBookingOptions, setShowBookingOptions] = useState(false);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.navbar}>Admin Dashboard</div>

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
              <button onClick={() => setActiveComponent("UnitMaster")}>
                Unit Creation
              </button>
              <button onClick={() => setActiveComponent("VehicleMaster")}>
                Vehicle Creation
              </button>
              <button onClick={() => setActiveComponent("TypeLedger")}>
                Type of Ledger
              </button>
            </div>
          )}

          {/* Booking Entry Section */}
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

          {/* Settings Section - Moved to the bottom */}
          <div className={styles.settingsContainer}> {/* Added a container */}
            <button onClick={() => setActiveComponent("companySetting")}>
              Company Setting
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {activeComponent === "welcome" && <h2>Welcome Admin</h2>}
          {activeComponent === "createLedger" && <CreateLedger />}
          {activeComponent === "alterLedger" && <AlterLedger />}
          {activeComponent === "CityMaster" && <CityMaster />}
          {activeComponent === "companySetting" && <CompanySetting />}
          {activeComponent === "lrBooking" && <LrBooking />}
          {activeComponent === "DisplayLr" && <DisplayLr />}
          {activeComponent === "TypeLedger" && <TypeLedger />}
          {activeComponent === "UnitMaster" && <UnitMater />}
          {activeComponent === "VehicleMaster" && <VehicleMaster />}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;