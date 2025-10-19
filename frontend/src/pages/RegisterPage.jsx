import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authServices";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      firstname: "",
      surname: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await registerUser(data);
      console.log("Registered successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isAuthenticated", "true");
    } catch (error) {
      setIsLoading(false);

      // Handle backend validation errors
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;

        // Map backend errors to form fields
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field],
          });
        });
      } else if (error.response?.data?.message) {
        // Handle general error message
        console.error("Registration failed:", error.response.data.message);
      } else {
        console.error("Registration failed:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-md p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Sign up with Email
          </h1>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-3">
            {/* First Name Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Firstname"
                {...register("firstname", {
                  required: "Firstname is required",
                  minLength: {
                    value: 2,
                    message: "Firstname must be at least 2 characters",
                  },
                })}
                className={`w-full h-[50px] rounded-2xl px-4 bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                  errors.first_name ? "ring-2 ring-red-500" : ""
                }`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1 ml-2">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Surname Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Surname"
                {...register("surname", {
                  required: "Surname is required",
                  minLength: {
                    value: 2,
                    message: "Surname must be at least 2 characters",
                  },
                })}
                className={`w-full h-[50px] rounded-2xl px-4 bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                  errors.surname ? "ring-2 ring-red-500" : ""
                }`}
              />
              {errors.surname && (
                <p className="text-red-500 text-xs mt-1 ml-2">
                  {errors.surname.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Address Input */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full h-[50px] rounded-2xl px-4 bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                errors.email ? "ring-2 ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full h-[50px] rounded-2xl px-4 bg-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                errors.password ? "ring-2 ring-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] rounded-2xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition duration-150 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Terms and Conditions Text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="text-gray-900 hover:text-gray-700">
            Terms & Conditions
          </a>
        </p>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Have an account already?{" "}
          <Link
            to="/login"
            className="text-gray-900 font-semibold hover:text-gray-700"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
