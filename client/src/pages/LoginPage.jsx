import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Modal from "../Modal";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      await setUser(data);
      await setModal(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  }

  return (
    <>
      {modal && (
        <Modal
          onOpen={modal}
          title="Welcome !!"
          button="Proceed"
          navigation="login"
        />
      )}
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="primary">Login</button>
            <div className="text-center py-2 mt-4 text-gray-500 font-poppins font-bold">
              Don't have an account ?{" "}
              <Link className="underline text-teal-400 " to={"/register"}>
                Register Now !!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
