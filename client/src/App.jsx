import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import BookingsPage from "./pages/BookingsPage";
import SearchPage from "./pages/SearchPage";

axios.defaults.baseURL = "http://127.0.0.1:4000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/account/" element={<AccountPage />}></Route>
          <Route path="/account/:subpage" element={<AccountPage />}></Route>
          <Route path="/account/places/" element={<PlacesPage />}></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormPage />}
          ></Route>
          <Route
            path="/account/places/:id"
            element={<PlacesFormPage />}
          ></Route>
          <Route path="/place/:id" element={<PlaceDetailsPage />}></Route>
          <Route path="/account/bookings/" element={<BookingsPage />}></Route>
          <Route path="/search/:name" element={<SearchPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
