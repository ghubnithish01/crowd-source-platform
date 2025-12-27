import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AddPlace from "./components/AddPlace";
import Admin from "./components/Admin";

function App() {
  const admin = true; // set to false for normal user
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100 flex gap-4 shadow">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/add" className="hover:text-green-500">Add Place</Link>
        {admin && <Link to="/admin" className="hover:text-red-500">Admin</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Home admin={admin} />} />
        <Route path="/add" element={<AddPlace />} />
        {admin && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
