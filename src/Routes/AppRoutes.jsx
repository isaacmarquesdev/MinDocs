import { Routes, Route } from 'react-router-dom';
import { Login } from '../Pages/Login/Login';
import { AccountRegistration } from '../Pages/AccountRegistration/AccountRegistration'
import { Home } from '../Pages/Home/Home';
import { DocumentCreation } from '../Pages/DocumentCreation/DocumentCreation'
import { Folders } from '../Pages/Folders/Folders';
import { Scheduled } from '../Pages/Scheduled/Scheduled';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<AccountRegistration />} />

      <Route path="/home" element={<Home />} />
      <Route path="/criar-documento" element={<DocumentCreation />} />
      <Route path="/compartilhados" element={<Folders />} />
      <Route path="/agendados" element={<Scheduled />} />

    </Routes>
  );
}