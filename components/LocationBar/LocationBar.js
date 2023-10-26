import { useEffect, useState } from "react";
import { Button, Flex, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Geonames from "geonames.js";
import SearchBar from "@/components/SearchBar/SearchBar";
import { updateLocation } from "@/utils/adhanApi";
import { getCity, getCountryCode } from "@/utils/cookieUtils";

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
  const iconSize = 22;

  useEffect(() => {
    const getLocationFromCookies = () => {
      const cookieCountryCode = getCountryCode();
      if (cookieCountryCode === null) {
        console.log("No Country Code in Cookies");
        return;
      }

      getCountryName(cookieCountryCode).then((countryName) => {
        setQueryValue(stringifyLocation(getCity(), countryName));
      });
    };

    getLocationFromCookies();
  }, []); // Empty dependency array ensures this effect runs only once on initial load

  const stringifyLocation = (city, countryName) => `${city}, ${countryName}`;

  const getCountryName = async (countryCode) => {
    try {
      const response = await geonames.countryInfo({
        country: countryCode,
      });
      if (response && response.geonames && response.geonames.length > 0) {
        return response.geonames[0].countryName;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching country name:", error);
      return null;
    }
  };

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
              const userLocation = stringifyLocation(
                response.geonames[0].name,
                response.geonames[0].countryName,
              );
              setQueryValue(userLocation);

              updateLocation(
                response.geonames[0].name,
                response.geonames[0].countryCode,
              ).then(() => {
                console.log(
                  "Updated Location From Device Location Button for Adhan Data",
                );
              });
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
    console.log("Selected Location:", selectedLocation);

    updateLocation(
      selectedLocation.value.city,
      selectedLocation.value.countryCode,
    ).then(() => {
      console.log("Updated Location From Location Bar for Adhan Data");
    });
  };

  return (
    <Flex gap={"4"} direction={"column"} wrap={"nowrap"}>
      <Flex gap={"8"} wrap={"nowrap"} align={"start"} justify={"between"}>
        <Text as={"label"} size={"3"}>
          Location
        </Text>
        <Button size={"2"} variant={"soft"} onClick={getDeviceLocation}>
          Device Location <PaperPlaneIcon width={iconSize} height={iconSize} />
        </Button>
      </Flex>
      <SearchBar
        placeholder={"Set your Location to view Prayer Times..."}
        searchValue={queryValue}
        onSearchChange={handleQueryChange}
        options={locationOptions}
        onOptionSelect={handleLocationSelect}
      />
    </Flex>
  );
};

export default LocationBar;
