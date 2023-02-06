import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_AUTH } from "../utils/baseURL";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [active, setActive] = useState("fa-solid fa-eye-slash");

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const Alert = ({ setIsOpen }) => {
    return (
      <div className="darkBG" onClick={() => setIsOpen(false)}>
        <div className="flex mt-10 justify-center items-center mx-auto">
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">{errorMessage.data}</p>
                <p className="text-sm">Make sure you fill out the form correctly</p>
              </div>
              <div onClick={() => setIsOpen(false)} className="mx-2">
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const login = async (e) => {
    e.preventDefault();
    const req = {
      email: email,
      password: password,
    };

    await axios
      .post(`${API_AUTH}/login`, req, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.data.token);
        sessionStorage.setItem("id", res.data.data.userId);
        if (location.state) {
          navigate(`${location.state.from.pathname}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        setIsOpen(true);
      });
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setActive("fa-solid fa-eye");
      return;
    }
    setPasswordType("password");
    setActive("fa-solid fa-eye-slash");
  };

  return (
    <div id="login">
      {isOpen && <Alert setIsOpen={setIsOpen} />}
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              If you are already a member, easily log in
            </p>

            <form action="" className="flex flex-col gap-4" onSubmit={login}>
              <input
                className="p-2 mt-8 rounded-xl border  "
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full "
                  type={passwordType}
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={active}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                />
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Login with Google
            </button>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
              <a href="#">Forgot your password?</a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <Link to="/register">
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="https://static.vecteezy.com/system/resources/previews/008/545/339/original/indonesian-famous-food-bakso-illustration-vector.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
