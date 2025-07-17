import { Route, Routes } from 'react-router-dom';
import { LiveMapPage } from '~/pages/LiveMapPage';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LiveMapPage />} />
    </Routes>
  );
};

export default AppRoutes;
