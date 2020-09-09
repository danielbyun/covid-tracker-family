import React, { useEffect, useState } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

import coronaImage from "./images/image.png";

const App = () => {
  const [covidData, setCovidData] = useState({});
  const [country, setCountry] = useState("global");

  const fetchCovidData = async () => await fetchData();
  useEffect(() => {
    const data = fetchCovidData();
    data.then((res) => setCovidData(res));
  }, []);

  const handleChange = async (e) => {
    const { value } = e.target;

    let fetchedData;
    if (value === "global") {
      fetchedData = await fetchData();
    } else {
      // fetch the data
      fetchedData = await fetchData(value);
    }

    // set the date
    setCovidData(fetchedData);
    setCountry(value);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt="corona" />
      <Cards data={covidData} />
      <CountryPicker handleChange={handleChange} country={country} />
      <Chart data={covidData} country={country} />
    </div>
  );
};

export default App;
