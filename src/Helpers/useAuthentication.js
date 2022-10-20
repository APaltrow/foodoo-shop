import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/Slices/authSlice";

const useAuthentication = (type) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const URL = "https://633577edea0de5318a142d98.mockapi.io/users";

  const [formError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const generateCredentials = (validInputs) => {
    const credentials = {};
    validInputs.map((input) => (credentials[input.name] = input.value));
    return credentials;
  };
  const check = async (credentials) => {
    try {
      const { data } = await axios.get(`${URL}?email=${credentials.email}`);
      return data;
    } catch (error) {
      setError(error.message);
      return "failed";
    } finally {
      setLoading(false);
    }
  };
  const register = async (data, credentials) => {
    if (data.length) {
      setError("Such email already exists");
    } else {
      try {
        const responded = await axios.post(
          "https://633577edea0de5318a142d98.mockapi.io/users",
          credentials
        );
        navigate("/login");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const login = (data, credentials) => {
    if (
      data.length &&
      data[0].password === credentials.password &&
      data[0].email === credentials.email
    ) {
      dispatch(setUser(data[0]));
      navigate("/");
    } else {
      setError("Incorrect credentials");
    }
  };

  const authenticate = async (validInputs) => {
    setLoading(true);
    const credentials = await generateCredentials(validInputs);
    const data = await check(credentials);

    if (data === "failed") {
      setLoading(false);
    } else {
      switch (type) {
        case "registration":
          register(data, credentials);
          break;
        case "login":
          login(data, credentials);
          break;
        case "delivery_address":
          break;
        default:
          setLoading(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 8000);
  }, [formError]);

  return {
    formError,
    isLoading,
    authenticate,
  };
};

export default useAuthentication;
