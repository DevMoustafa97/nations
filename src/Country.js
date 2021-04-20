import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './Country.css'
const Country = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState({});
  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data);
      });
  }, [countryCode]);

  return (
    <article className="country-page container">
      <section className="back" >
        <Link to="/">
          <button>
          <i className="fas fa-long-arrow-alt-left"></i>
            Back</button>
        </Link>
      </section>
      <article className="country-info">
        <img src={country.flag} alt={country.name} />
      <div className="data">
            <h2>{country.name}</h2>
        <div className="data-block">
        <article>
          <section>
            <dl>
              <dt>Native Name:</dt>
              <dd>{country.nativeName}</dd>
              <dt>Population:</dt>
              <dd>{country.population}</dd>
              <dt>Region:</dt>
              <dd>{country.region}</dd>
              <dt>Sub Region:</dt>
              <dd>{country.subregion}</dd>
              <dt>Capital:</dt>
              <dd>{country.capital}</dd>
            </dl>
          </section>
        </article>
        <section>
          <dl>
            <dt>Top Level Domain:</dt>
            {country.topLevelDomain
              ? country.topLevelDomain.map((tld, i) => <dd key={i}>{tld}</dd>)
              : "loading"}
            <dt>Currencies:</dt>
            {country.currencies
              ? country.currencies.map((cr, i) => (
                  <dd key={i}>
                    {cr.name}-({cr.code}) {cr.symbol}
                  </dd>
                ))
              : "loading"}
            <dt>Languages:</dt>
            <dd>
              <ul>
                {country.languages
                  ? country.languages.map((lng, i) => (
                      <li key={i}>
                        {lng.name}-{lng.nativeName}
                      </li>
                    ))
                  : "loading"}
              </ul>
            </dd>
          </dl>
        </section>
        </div>
        <section className="borders">
       
          <dl>
            <dt>Border Countries:</dt>
            <dd>
              <ul>
                {country.borders
                  ? country.borders.map((brd, i) => (
                      <li key={i}>
                        {" "}
                        <Link to={brd}>
                          <button>{brd}</button>
                        </Link>
                      </li>
                    ))
                  : "loading"}
              </ul>
            </dd>
          </dl>
        </section>
      </div>
      </article>
    </article>
  );
};

export default Country;
