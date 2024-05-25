import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("islogin");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container h-full px-6 py-24">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Selamat Datang di Home🏠
      </h1>
      <p className="mb-6 text-center">
        Anda telah berhasil masuk. anjayy rooowwwrrr🦖🦕🦖🦕
      </p>
      <button
        onClick={handleLogout}
        className="inline-block bg-[#a6d16a] hover:bg-[#74914a] rounded px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-[#3c4043] hover:text-white shadow-[0_4px_9px_-4px_#74914a] transition duration-150 ease-in-out">
        Logout
      </button>
    </div>
  );
};

export default Home;
