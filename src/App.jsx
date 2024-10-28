import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/product';
import Pricing from './pages/Pricing';
import PageNotFount from './pages/PageNotFount';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />

          <Route path='Product' element={<Product />} />
          <Route path='Pricing' element={<Pricing />} />
          <Route path='Login' element={<Login />} />
          <Route path='App' element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='form' element={<Form />} />
          </Route>

          <Route path='*' element={<PageNotFount />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
