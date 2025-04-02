import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
      window.location.reload();
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!userData?.name) return "U";

    const nameParts = userData.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="User menu"
        title={userData?.name || "User Profile"}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            userData?.name || "User"
          )}&background=random&color=fff&size=100&bold=true`}
          alt={userData?.name || "User"}
          className="w-10 h-10 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Hello, {userData?.name || "User"}
                </p>
              </div>
            </div>
          </div>
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
