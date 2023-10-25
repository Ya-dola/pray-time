import { useEffect, useState } from "react";
import Geonames from "geonames.js";
import SearchBar from "@/components/SearchBar/SearchBar";

const geonames = Geonames({
  username: process.env.NEXT_PUBLIC_GEONAMES_USERNAME,
  lan: "en",
  encoding: "JSON",
});

const unwantedCountries = process.env.NEXT_PUBLIC_UNWANTED_COUNTRIES
  ? JSON.parse(process.env.NEXT_PUBLIC_UNWANTED_COUNTRIES)
  : [];

const LocationBar = () => {
  const [queryValue, setQueryValue] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    getDeviceLocation().then(() => console.log("Got Device Location"));
  }, []); // Empty dependency array ensures this effect runs only once on initial load

  const getDeviceLocation = async () => {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      // Attempt to get the user's current position from the device
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // noinspection JSCheckFunctionSignatures
            const response = await geonames.findNearbyPlaceName({
              lat: latitude,
              lng: longitude,
              featureClass: "P",
            });
            if (response && response.geonames && response.geonames.length > 0) {
              const userLocation = `${response.geonames[0].name}, ${response.geonames[0].countryName}`;
              setQueryValue(userLocation);
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
  };

  const fetchLocations = async (inputValue) => {
    try {
      // noinspection JSCheckFunctionSignatures
      const response = await geonames.search({
        q: inputValue,
        featureClass: "P",
        maxRows: 10, // Limit the results to the top 10
      });

      const queryLocations = response.geonames
        .filter((location) => !unwantedCountries.includes(location.countryCode))
        .slice(0, 10)
        .map((location) => ({
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

  const handleQueryChange = (value) => {
    setQueryValue(value);
    fetchLocations(value);
    // .then(() => console.log("Fetch Locations:", value));
  };

  const handleLocationSelect = (selectedLocation) => {
    setQueryValue(selectedLocation.label);
    setLocationOptions([]);
    // console.log("Selected Option:", selectedLocation);
  };

  return (
    <SearchBar
      placeholder={"Set your location..."}
      searchValue={queryValue}
      onSearchChange={handleQueryChange}
      options={locationOptions}
      onOptionSelect={handleLocationSelect}
    />
  );
};

export default LocationBar;
