import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
const Main = () => {
  const [region, setRegion] = useState("africa");
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/region/africa")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFirstRender(false);
      });
  }, []);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, [region]);

  useEffect(() => {
    if (search) {
      fetch(`https://restcountries.eu/rest/v2/name/${search}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCountries(data);
          } else {
            setCountries([]);
          }
        })
        .catch((err) => {
          setCountries([]);
        })
        .finally(() => {
          console.clear();
        });
    }
  }, [search]);

  const renderCountries = (countries) => {
    if (countries.length) {
      return countries.map((country, i) => {
        return (
          <article className="coutnry-card" key={i}>
            <Link to={`${country.alpha3Code}`}>
              <img
                src={country.flag}
                alt={country.name}
                />
              <div className="details">
                <h2>{country.name}</h2>
                <p> <b> Population: </b>{country.population}</p>
                <p> <b> Region: </b>{country.region}</p>
                <p> <b> Capital: </b>{country.capital}</p>
              </div>
            </Link>
          </article>
        );
      });
    } else {
      return <h3>No Countries Found !</h3>;
    }
  };

  return (
    <>
      <main>
        <section>
          <div className="controls container">
            <div id="search">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              />
            </div>
            <div id="filter">
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
              }}
              >
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
                <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </section>
        <article className="countries container">
          {firstRender ? <p>loading</p> : renderCountries(countries)}
        </article>
      </main>
    </>
  );
};

export default Main;
