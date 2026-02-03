import React from "react";

const Auth = ({
  heading = "Login",
  buttonText = "Submit",
  fields = [],
  isopen = false,
  onClose,
  openSignup,
  openLogin,
  onChange,
  onSubmit,
}) => {
  if (!isopen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 sm:px-6 overflow-y-auto"
      onClick={onClose} // click outside closes modal
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-10"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">
          {heading}
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit();
          }}
        >
          {fields.map((item, index) => (
            <div key={index} className="mb-4">
              <input
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                required={item.required}
                onChange={onChange}
                className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Switch between Login / Signup */}
          {heading.toLowerCase() === "login" && openSignup && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?
              <button
                type="button"
                className="text-blue-600 font-semibold ml-1 hover:underline"
                onClick={openSignup}
              >
                Sign Up
              </button>
            </p>
          )}

          {heading.toLowerCase().includes("sign") && openLogin && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?
              <button
                type="button"
                className="text-blue-600 font-semibold ml-1 hover:underline"
                onClick={openLogin}
              >
                Login
              </button>
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
