import React, { useState, useEffect } from "react";
import Geonames from "geonames.js";

const geonames = Geonames({
  username: process.env.NEXT_PUBLIC_GEONAMES_USERNAME,
  lan: "en",
  encoding: "JSON",
});

const LocationBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const fetchLocations = async (inputValue) => {
    try {
      const response = await geonames.search({
        q: inputValue,
        featureClass: "P",
      });
      const locations = response.geonames.map((location) => ({
        label: `${location.name}, ${location.countryName}`,
        value: {
          city: location.name,
          countryCode: location.countryCode,
        },
      }));
      setOptions(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
    fetchLocations(inputValue).then(() =>
      console.log("Fetch Locations:", inputValue),
    );
  };

  const handleLocationSelect = (selected) => {
    setInputValue(selected.label); // Update the input field value
    setSelectedOption(selected);
    setIsFocused(false); // Close the options list
    console.log("Selected Option:", selected);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for your location..."
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsFocused(true)} // Set isFocused to true on focus
        onBlur={() => setIsFocused(false)} // Set isFocused to false on blur
      />
      {isFocused && (
        <ul>
          {options.map((option) => (
            <li
              key={option.label}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input field from losing focus
                handleLocationSelect(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationBar;
