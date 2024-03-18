import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const AccountPage = () => {
  const navigate = useNavigate();

  const { ready, user, setUser } = useContext(UserContext);

  async function handleLogout() {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  }

  return (
    <div>
      <AccountNav />
        <div className="text-center max-w-lg mx-auto">
          <div className="flex bg-gray-200 rounded-tr-2xl rounded-bl-2xl p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-32 h-32"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <div className="text-start leading-8 mt-3">
              <h1 className="font-bold text-[14px]"> Logged in as :-</h1>
              <h1 className="font-bold"> {user?.name}</h1>
              <h1 className="font-bold"> {user?.email} </h1>
            </div>
          </div>
          <button onClick={handleLogout} className="logout max-w-sm mt-2 ">
            Logout
          </button>
        </div>
    </div>
  );
};

export default AccountPage;
