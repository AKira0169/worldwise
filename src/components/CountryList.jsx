import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <Message message='No cities found' />;
  }
  const countries = cities.reduce((arr, city) => {
    // Check if the country is not already in the array
    if (!arr.some((el) => el.country === city.country)) {
      return [...arr, { ...city }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.cityList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CityList;
