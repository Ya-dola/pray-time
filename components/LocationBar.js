import { useEffect, useRef, useState } from "react";
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
  const [initialLocationLoaded, setInitialLocationLoaded] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input element

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Attempt to get the user's current position
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await geonames.findNearbyPlaceName({
              lat: latitude,
              lng: longitude,
              featureClass: "P",
            });
            if (response && response.geonames && response.geonames.length > 0) {
              const userLocation = `${response.geonames[0].name}, ${response.geonames[0].countryName}`;
              setInputValue(userLocation);
              setInitialLocationLoaded(true);
              // Do not fetch suggestions on initial load
            }
          } catch (error) {
            console.error("Error fetching user location:", error);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    }
  }, []); // Empty dependency array ensures this effect runs only once on initial load

  const fetchLocations = async (inputValue) => {
    try {
      if (!initialLocationLoaded) {
        // If initial location is loaded, clear suggestions on typing
        setOptions([]);
      }
      const response = await geonames.search({
        q: inputValue,
        featureClass: "P",
        maxRows: 10, // Limit the results to the top 10
      });
      const locations = response.geonames.slice(0, 10).map((location) => ({
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
        onFocus={() => {
          setIsFocused(true);
          if (inputRef.current) inputRef.current.select(); // Select all text when focused
        }}
        onBlur={() => {
          setIsFocused(false);
          setOptions([]);
        }}
        ref={inputRef} // Attach the ref to the input element
      />
      {isFocused && (
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
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
