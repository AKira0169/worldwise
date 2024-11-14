// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import styles from './Form.module.css';
import Button from './Button';
import { useUrlPositions } from '../hooks/useUrlPositions.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../contexts/CitiesContext.jsx';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPositions();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState('');
  /* eslint-disable no-unused-vars */
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) {
      return;
    }
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {
        lat,
        lng,
      },
    };

    createCity(newCity).then(() => {
      navigate('/app/cities');
    });
  }

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoadingGeoCoding(true);
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        alert(error);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCity();
  }, [lat, lng]);

  if (isLoadingGeoCoding) {
    return <Spinner />;
  }
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        {/* <input id='date' onChange={(e) => setDate(e.target.value)} value={date} /> */}
        <DatePicker id='date' selected={date} onChange={(date) => setDate(date)} dateFormat={'dd/MM/yyyy'} />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button
          onclick={(e) => {
            e.preventDefault();
            navigate('/app');
          }}
          type='back'>
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
