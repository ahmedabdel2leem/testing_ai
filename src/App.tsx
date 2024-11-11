import React, { useEffect } from "react";
import "./App.css";
import MainLayout from "./layouts/AppLayout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import UserInfo from "./components/masarat/userSideBar/userInfo/UserInfo";
import Home from "./components/masarat/hompage/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import { useAppDispatch } from "./store/hooks";
import OnBording from "./components/masarat/onBording/OnBording";
import VideoCapture from "./components/common/camerCopmponent/CameraComponent";
import axios from "axios";

function App() {
  const data = {
    username: "newuser",
    password: "password123",
  };

  async function login() {
    const response = await axios.post<any>(
      "http://127.0.0.1:8000/users/login/",
      data
    );
    console.log(response);
    localStorage.setItem("token", response.data.access);
  }

  useEffect(() => {
    login();
  }, []);
  const mainRouter = createBrowserRouter([
    // { path: "/", element: <VideoCapture /> },
    { path: "/", element: <OnBording /> },
    {
      path: "/msarat",
      element: <MainLayout />,
      children: [
        {
          path: "/msarat/",
          element: <Home />,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={mainRouter} />
      </Provider>
    </>
  );
}

export default App;
