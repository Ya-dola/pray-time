import { Fragment, useRef, useState } from "react";
import { Card, Separator, TextField } from "@radix-ui/themes";
import { GlobeIcon } from "@radix-ui/react-icons";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  placeholder = "Search...",
  searchValue,
  onSearchChange,
  options,
  onOptionSelect,
  iconSize = 28,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleOnChange = (value) => {
    // Open the options list if typing
    if (!isFocused) setIsFocused(true);

    setSelectedIndex(-1);
    onSearchChange(value);
  };

  const handleOptionSelect = (option, index) => {
    setIsFocused(false); // Close the options list
    setSelectedIndex(index);
    onOptionSelect(option);
    // console.log("Selected Index:", index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      if (options.length > 0) {
        handleOptionSelect(
          options[selectedIndex === -1 ? 0 : selectedIndex],
          selectedIndex === -1 ? 0 : selectedIndex,
        );
      }
    } else if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    }
  };

  return (
    <div className={styles.container}>
      <TextField.Root variant={"soft"} size={"3"} radius={"full"}>
        <TextField.Slot>
          <GlobeIcon width={iconSize} height={iconSize} />
        </TextField.Slot>
        <TextField.Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!isFocused) setIsFocused(true);
            if (inputRef.current) inputRef.current.select(); // Select all text when focused
          }}
          onBlur={() => {
            setIsFocused(false);
            setSelectedIndex(-1);
          }}
          ref={inputRef}
        />
      </TextField.Root>

      {isFocused && options.length > 0 && (
        <Card className={styles.popover}>
          <ul>
            {options.map((option, index) => (
              <Fragment key={index}>
                <p
                  data-selected={index === selectedIndex}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input field from losing focus
                    handleOptionSelect(option, index);
                  }}
                  // Reset Selected Index when Hovering over Popup
                  onMouseEnter={() => setSelectedIndex(-1)}
                >
                  {option.label}
                </p>
                {index < options.length - 1 && (
                  <Separator orientation="horizontal" size="4" />
                )}
              </Fragment>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
