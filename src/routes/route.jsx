import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import DoctorDetails from '../components/Doctor/DoctorDetails';
import Checkout from '../components/Doctor/CheckOut';

const RoutesComponents = () => {

  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/checkout" element={<Checkout />}/>
      </Routes>
  );
};

export default RoutesComponents;
