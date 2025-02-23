import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout();
  }, [navigate]);

  return null;
};
