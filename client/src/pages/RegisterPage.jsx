import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.post("/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      alert(
        "Registration unsuccessful due to some error !! Kindly try again later."
      );
    }
  }

  return (
    <>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="primary">Register</button>
            <div className="text-center py-2 mt-4 text-gray-500 font-poppins font-bold">
              Already a member ?{" "}
              <Link className="underline text-teal-400 " to={"/login"}>
                Login !!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
