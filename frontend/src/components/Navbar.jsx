// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHome,
  FaBook,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import api from "../api.js";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      const me = await api.getMe();
      if (me && me.user) setUserName(me.user.name || "");
      else setUserName("");
    } catch {
      setUserName("");
    }
  };

  useEffect(() => {
    loadUser();
    const onAuth = () => loadUser();
    window.addEventListener("auth-changed", onAuth);
    window.addEventListener("storage", onAuth);
    return () => {
      window.removeEventListener("auth-changed", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const onLogout = async () => {
    try {
      await api.logout();
      setUserName("");
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/");
    } catch {}
  };
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="StudyStore Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-xl text-gray-900">Study Resource Dumper</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              <FaHome size={16} />
              Home
            </NavLink>
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              <FaBook size={16} />
              My Resources
            </NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <FaUserCircle
                size={24}
                className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200"
              />
              <span className="hidden sm:block text-sm text-gray-600">
                {userName || "Guest User"}
              </span>
            </div>
            {userName ? (
              <button onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600">
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <FaHome size={16} />
                Home
              </NavLink>
              <NavLink
                to="/resources"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                <FaBook size={16} />
                My Resources
              </NavLink>
              {userName ? (
                <button onClick={() => { closeMobileMenu(); onLogout(); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-left text-gray-700 hover:text-red-600">
                  <FaSignOutAlt /> Logout
                </button>
              ) : (
                <NavLink to="/login" onClick={closeMobileMenu} className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <FaSignInAlt /> Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
