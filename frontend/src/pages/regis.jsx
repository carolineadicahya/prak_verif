import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Pastikan axios diimpor

const Register = () => {
  const [name, setName] = useState(""); // Definisikan state untuk name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if email and password are not null
      if (!name || !email || !password || !confirmPassword) {
        setErrorMessage(
          "Nama, email, password, dan konfirmasi password harus diisi!"
        );
        return;
      }

      // Check if password and confirm password match
      if (password !== confirmPassword) {
        setErrorMessage("Password tidak cocok!");
        return;
      }

      // Panggil API register
      const response = await axios.post("http://localhost:8000/user/register", {
        name: name,
        email: email,
        password: password,
      });

      // Cek status respons
      if (response.status === 200) {
        // Registrasi berhasil, alihkan ke halaman login
        window.alert("Daftar Berhasil! Silahkan verifikasi email anda!😄");
        navigate("/login");
      } else {
        if (
          response.status === 400 &&
          response.data.message === "Email telah terdaftar"
        ) {
          setErrorMessage("Email telah terdaftar. Silakan gunakan email lain.");
        } else {
          setErrorMessage(response.data.message || "Registrasi gagal");
        }
      }
    } catch (error) {
      setErrorMessage("Terdapat kesalahan saat registrasi: " + error.message);
    }
  };

  return (
    <section className="mt-10">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Phone image"
            />
          </div>

          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
            <form onSubmit={handleSubmit}>
              {/* Name input */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-left text-m font-medium text-neutral-700 dark:text-white">
                  Masukkan Nama Anda
                </label>
                <input
                  type="text"
                  id="name" // Ubah id dari "text" ke "name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Perbaiki onChange untuk setName
                  className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:ring-2"
                />
              </div>

              {/* Email input */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mt-3 text-left text-m font-medium dark:text-white text-neutral-700">
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

              {/* Confirm Password input */}
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-left text-m font-medium text-neutral-700 dark:text-white">
                  Konfirmasi Password Anda
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:ring-2"
                />
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="mb-6 text-red-600">{errorMessage}</div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="inline-block w-full bg-[#a6d16a] hover:bg-[#74914a] rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-[#3c4043] hover:text-white shadow-[0_4px_9px_-4px_#74914a] transition duration-150 ease-in-out">
                Verifikasi Akun
              </button>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  ATAU
                </p>
              </div>
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Sudah punya akun?{" "}
                <a
                  href="/login"
                  className="text-danger text-[#0b4d8c] transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 underline dark:text-[#a6d16a]">
                  Masuk
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
