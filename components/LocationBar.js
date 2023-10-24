import { useEffect, useRef, useState } from "react";
import Geonames from "geonames.js";
import { TextField } from "@radix-ui/themes";
import { GlobeIcon } from "@radix-ui/react-icons";

const geonames = Geonames({
  username: process.env.NEXT_PUBLIC_GEONAMES_USERNAME,
  lan: "en",
  encoding: "JSON",
});

const LocationBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const locationInputRef = useRef(null);

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Attempt to get the user's current position from device
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
      // noinspection JSCheckFunctionSignatures
      const response = await geonames.search({
        q: inputValue,
        featureClass: "P",
        maxRows: 10, // Limit the results to the top 10
      });
      const queryLocations = response.geonames.slice(0, 10).map((location) => ({
        label: `${location.name}, ${location.countryName}`,
        value: {
          city: location.name,
          countryCode: location.countryCode,
        },
      }));
      setLocationOptions(queryLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (inputValue) => {
    // Open the options list if typing
    if (!isFocused) setIsFocused(true);

    setInputValue(inputValue);
    fetchLocations(inputValue).then(() =>
      console.log("Fetch Locations:", inputValue),
    );
  };

  const handleLocationSelect = (selected) => {
    setInputValue(selected.label); // Update the input field value
    setSelectedLocation(selected);
    setIsFocused(false); // Close the options list
    console.log("Selected Option:", selected);
  };

  return (
    <div>
      <TextField.Root variant={"soft"} size={"3"} radius={"full"}>
        <TextField.Slot>
          <GlobeIcon width={28} height={28} />
        </TextField.Slot>
        <TextField.Input
          placeholder="Set your location..."
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Tab")
              if (locationOptions.length > 0)
                handleLocationSelect(locationOptions[0]);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (locationInputRef.current) locationInputRef.current.select(); // Select all text when focused
          }}
          onBlur={() => {
            setIsFocused(false);
            setLocationOptions([]);
          }}
          ref={locationInputRef}
        />
      </TextField.Root>

      {isFocused && (
        <ul>
          {locationOptions.map((option, index) => (
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
