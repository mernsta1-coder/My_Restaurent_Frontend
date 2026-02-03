import React from "react";

const Auth = ({
  heading,
  buttonText,
  fields,
  isopen,
  onClose, // ✅ must match Navbar
  openSignup,
  openLogin,
  onChange,
  onSubmit,
}) => {
  if (!isopen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-black text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {heading}
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            onSubmit();
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Switch Between Login/Signup */}
          {heading.toLowerCase() === "login" && openSignup && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?
              <button
                type="button"
                className="text-blue-600 font-semibold ml-1 hover:underline cursor-pointer"
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
                className="text-blue-600 font-semibold ml-1 hover:underline cursor-pointer"
                onClick={openLogin}
              >
                Login
              </button>
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white
                       py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
