import React from "react";

const Auth = ({
  heading,
  buttonText,
  fields,
  isopen,
  onClose,
  openSignup,
  openLogin,
  onChange,
  onSubmit,
}) => {
  if (!isopen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-2xl font-bold text-center mb-4">{heading}</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {fields.map((f, i) => (
            <input
              key={i}
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required={f.required}
              onChange={onChange}
              className="w-full mb-3 p-2 border rounded"
            />
          ))}

          {heading === "Login" && (
            <p className="text-center text-sm">
              No account?
              <button type="button" onClick={openSignup}> Sign Up</button>
            </p>
          )}

          {heading === "Sign Up" && (
            <p className="text-center text-sm">
              Already have an account?
              <button type="button" onClick={openLogin}> Login</button>
            </p>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
