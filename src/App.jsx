import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/product';
import Pricing from './pages/Pricing';
import PageNotFount from './pages/PageNotFount';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';

const URL = 'http://localhost:4000';
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCities() {
      try {
        const response = await fetch(`${URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />

        <Route
          path="Product"
          element={<Product />}
        />
        <Route
          path="Pricing"
          element={<Pricing />}
        />
        <Route
          path="Login"
          element={<Login />}
        />
        <Route
          path="App"
          element={<AppLayout />}
        >
          <Route
            index
            element={
              <CityList
                cities={cities}
                loading={isLoading}
              />
            }
          />
          <Route
            path="cities"
            element={
              <CityList
                cities={cities}
                loading={isLoading}
              />
            }
          />
          <Route
            path="countries"
            element={
              <CountryList
                loading={isLoading}
                cities={cities}
              />
            }
          />
          <Route
            path="form"
            element={<p>Form</p>}
          />
        </Route>

        <Route
          path="*"
          element={<PageNotFount />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
