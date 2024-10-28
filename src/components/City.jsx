import { useParams, useSearchParams } from 'react-router-dom';
import styles from './City.module.css';
import { useEffect, useState } from 'react';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date(date));

function City() {
  const [currentCity, setCurrentCity] = useState({});
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  useEffect(() => {
    async function fetchCity() {
      try {
        const response = await fetch(`http://localhost:4000/cities/${id}`);
        const data = await response.json();
        setCurrentCity(data);
      } catch (error) {
        alert(error);
      }
    }
    fetchCity();
  }, [id]);

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.row}>
        <h6>Map</h6>
        <div>
          <h1>
            position {lat}, {lng}
          </h1>
        </div>
      </div>

      {/* <div>
        <ButtonBack />
      </div> */}
    </div>
  );
}

export default City;
