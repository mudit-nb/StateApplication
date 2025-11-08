import React, { useEffect, useState } from "react";

const API_ENDPOINT = "https://location-selector.labs.crio.do/countries";

export default function LocationSelector() {
  const [selectCountry, setselectCountry] = useState("");
  const [countryOption, setcountryOption] = useState([]);
  const [selectState, setSelectState] = useState("");
  const [stateOption, setStateOption] = useState([]);
  const [isSelectState, setisSelectState] = useState(false);
  const [selectCity, setSelectCity] = useState("");
  const [cityOption, setCityOption] = useState([]);
  const [isSelectCity, setisSelectCity] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        const jsonRes = await res.json();
        setcountryOption(jsonRes);
      } catch (e) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectCountry) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://location-selector.labs.crio.do/country=${selectCountry}/states`
          );
          const jsonRes = await res.json();
          console.log(jsonRes);
          setStateOption(jsonRes);
        } catch (e) {}
      };
      fetchData();
    }
  }, [selectCountry]);

  useEffect(() => {
    if (selectState) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://location-selector.labs.crio.do/country=${selectCountry}/state=${selectState}/cities`
          );
          const jsonRes = await res.json();
          console.log(jsonRes);
          setCityOption(jsonRes);
        } catch (e) {}
      };
      fetchData();
    }
  }, [selectState]);

  const handleCountryChange = (selectCountry) => {
    setselectCountry(selectCountry);

    setSelectState("");

    setisSelectState(true);
  };
  const handleStateChange = (selectState) => {
    setSelectState(selectState);

    setSelectCity("");

    setisSelectCity(true);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <select
        onChange={(e) => handleCountryChange(e.target.value)}
        value={selectCountry}
      >
        <option value="" disabled>
          select a Country
        </option>
        {countryOption.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleStateChange(e.target.value)}
        value={selectState}
        disabled={!isSelectState}
      >
        <option value="" disabled>
          select a State
        </option>
        {isSelectState &&
          stateOption.map((statename) => (
            <option key={statename} value={statename}>
              {statename}
            </option>
          ))}
      </select>
      <select
        onChange={(e) => setSelectCity(e.target.value)}
        value={selectCity}
        disabled={!isSelectCity}
      >
        <option value="" disabled>
          select a City
        </option>
        {isSelectCity &&
          cityOption.map((cityname) => (
            <option key={cityname} value={cityname}>
              {cityname}
            </option>
          ))}
      </select>
    </div>
  );
}
