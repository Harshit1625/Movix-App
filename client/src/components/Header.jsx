import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useContext(UserContext);

  const [search, setSearch] = useState("");

  return (
    <div>
      <header className="p-2 flex justify-between">
        <Link to={"/"} className="flex itemscenter gap-1 mt-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8 -rotate-90 text-hover"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl text-hover">FlyUp</span>
        </Link>
        <div className="flex gap-3 border border-gray-300 rounded-full ml-2 px-4  cursor-pointer w-[30vw] lg:w-[90vh] sm:w-[40vw]">
          <input
            className="h-[3vh] border-white focus:outline-none truncate"
            placeholder="Enter your desired location"
            type="text"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <Link to={"/search/" + search}>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mt-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </Link>
        </div>
        <Link
          to={user ? "/account" : "/login"}
          className="flex justify-center gap-4 border border-gray-300 rounded-full py-2 px-4 ml-3 lg:w-[15vw]"
        >
          {user && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          )}
          {!user && (
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <h1 className="text-sm ml-2 mt-0.5">Login/Signup</h1>
            </div>
          )}

          {user && <h1 className="font-bold text-[10px] lg:text-[12px]">{user.name}</h1>}
        </Link>
      </header>
    </div>
  );
};

export default Header;
