import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { UserAuth } from "../context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { message } = useSelector((state) => state.message);

  const [passwordType, setPasswordType] = useState("password");
  const [active, setActive] = useState("fa-solid fa-eye-slash");

  const [isOpen, setIsOpen] = useState(false);
  const { user, googleSignIn } = UserAuth();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   dispatch(login(email, password))
  //     .then(() => {
  //       if (location.state) {
  //         navigate(`${location.state.from.pathname}`);
  //       } else {
  //         navigate("/home");
  //       }
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       setIsOpen(true);
  //     });
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(register(username, email, password))
      .then(() => {
        setPassword(password);
        setEmail(email);
        dispatch(login(email, password))
          .then(() => {
              navigate("/makeprofile");
          })
          .catch(() => {
            setIsOpen(true);
          });
      })
      .catch(() => {
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

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      setUsername(user.displayName);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  return (
    <div id="register">
      {isOpen && <Alert setIsOpen={setIsOpen} message={message} />}
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              Silahkan isi form berikut untuk membuat akun
            </p>

            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={handleRegister}
            >
              <input
                className="p-2 mt-8 rounded-xl border  "
                type="text"
                id="username"
                placeholder="Username"
                value={username || ""}
                onChange={onChangeUsername}
              />
              <input
                className="p-2 rounded-xl border  "
                type="email"
                id="email"
                placeholder="Email"
                value={email || ""}
                onChange={onChangeEmail}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full "
                  type={passwordType}
                  id="password"
                  placeholder="Password"
                  value={password || ""}
                  onChange={onChangePassword}
                />
                <FontAwesomeIcon
                  icon={active}
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                />
              </div>
              <button
                type="submit"
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              >
                Register
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">ATAU</p>
              <hr className="border-gray-400" />
            </div>

            <button
              className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
              onClick={handleGoogleSignIn}
            >
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
              Register dengan Google
            </button>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Sudah punya akun?</p>
              <Link to="/login">
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Login
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
};

export default Register;
