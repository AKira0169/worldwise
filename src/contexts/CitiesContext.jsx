import { createContext, useEffect, useContext, useReducer, useCallback } from 'react';

const CitiesContext = createContext();

const URL = 'http://localhost:4000';

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };
    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };
    case 'city/created':
      return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
    case 'city/deleted':
      return { ...state, isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload) };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'loading' });
    async function fetchCities() {
      try {
        const response = await fetch(`${URL}/cities`);
        const data = await response.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      try {
        if (currentCity.id == id) {
          return;
        }
        dispatch({ type: 'loading' });
        const response = await fetch(`http://localhost:4000/cities/${id}`);
        const data = await response.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const response = await fetch(`http://localhost:4000/cities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({ type: 'city/created', payload: data });
      console.log(data);
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      await fetch(`http://localhost:4000/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
