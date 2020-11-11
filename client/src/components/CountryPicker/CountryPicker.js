import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, TextField } from "@material-ui/core";

import { fetchCountries } from "../../api/index";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ country, handleChange }) => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(country);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, [countries]);

  useEffect(() => {
    setCurrentCountry(country);
  }, [country]);

  return (
    <FormControl className={styles.formControl}>
      <TextField
        select
        name="country"
        defaultValue="global"
        value={currentCountry || "global"}
        variant="outlined"
        onChange={handleChange}
      >
        <MenuItem value="global">Global</MenuItem>
        {countries !== undefined &&
          countries.map((country, index) => (
            <MenuItem key={index} value={country}>
              {country}
            </MenuItem>
          ))}
      </TextField>
    </FormControl>
  );
};

export default CountryPicker;
