import { useState } from "react";
import styles from "../styles/SearchableDropdown.module.css";

const SearchableDropdown = ({ options, value, onChange, name, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState(value); // Initialize with current value
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (selectedValue) => {
    setSearchTerm(selectedValue); // ✅ Update input field
    onChange({ target: { name, value: selectedValue } }); // ✅ Correctly update parent state
    setShowDropdown(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <input
        type="text"
        name={name}
        className={styles.input}
        value={searchTerm} // ✅ Controlled input value
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to allow selection
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className={styles.dropdownList}>
          {filteredOptions.map((option) => (
            <li
              key={option._id}
              onMouseDown={() => handleSelect(option.name)} // ✅ Fix selection issue
              className={styles.dropdownItem}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
