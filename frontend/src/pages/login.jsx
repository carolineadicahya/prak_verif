import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if email and password are not null
      if (!email || !password) {
        throw new Error("Email dan password harus diisi!");
      }

      // Panggil API login
      const response = await axios.post("http://localhost:8000/user/login", {
        email: email,
        password: password,
      });

      // Cek status respons
      if (response.status === 200) {
        // Simpan status login ke local storage
        localStorage.setItem("islogin", "true");
        localStorage.setItem("email", email);
        localStorage.setItem("token", response.data.jwt);
        navigate("/home");
      } else {
        throw new Error("Login gagal");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        window.alert(
          "Terdapat kesalahan saat login: " + error.response.data.message
        );
      } else {
        window.alert("Terdapat kesalahan saat login: " + error.message);
      }
    }
  };

  return (
    <section className="mt-10">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <h2 className="text-2xl font-bold mb-6 text-center">Masuk</h2>
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mt-3 text-left text-m font-medium text-neutral-700 dark:text-white">
                  Masukkan Email Anda
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:ring-2"
                />
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-left text-m font-medium text-neutral-700 dark:text-white">
                  Masukkan Password Anda
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:ring-2"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="inline-block w-full bg-[#a6d16a] hover:bg-[#74914a] rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-[3c4043] hover:text-white shadow-[0_4px_9px_-4px_#74914a] transition duration-150 ease-in-out hbg-[#0b4d8c] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-0766AD-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-0766AD-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:text-[#1f221b] dark:hover:text-[#1f221b]">
                Masuk
              </button>

              {/* Divider */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Belum punya akun?{" "}
                <a
                  href="/register"
                  className="text-danger text-[#0b4d8c] transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 underline dark:text-[#a6d16a]">
                  Daftar Akun
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
