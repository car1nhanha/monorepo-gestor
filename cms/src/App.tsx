import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/auth-context";
import { EditVolunteer } from "./pages/edit-volunteer/edit-volunteer";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Logout } from "./pages/logout/logout";
import { MapPage } from "./pages/MapPage";
import { Members } from "./pages/Members";
import { Organizations } from "./pages/Organizations";
import { Projects } from "./pages/Projects";
import { ThankYou } from "./pages/register/await";
import { Registration } from "./pages/self-register";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/logout" element={<Logout />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/self-register" element={<Registration />} />
            <Route path="/obrigado" element={<ThankYou />} />
          </Route>

          {/* Rotas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Home />} path="/" />
            <Route element={<Members />} path="/members" />
            <Route element={<EditVolunteer />} path="/edit-volunteer/:id" />
            <Route element={<Organizations />} path="/organizations" />
            <Route element={<Projects />} path="/projects" />
            <Route element={<MapPage />} path="/map" />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
