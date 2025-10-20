import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setGeneralError("");

    try {
      await login(data);
      navigate("/tweetfeed");
    } catch (error) {
      setIsLoading(false);

      // Handle backend validation errors for specific fields
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;

        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field],
          });
        });
      } else if (error.response?.data?.message) {
        // Handle general error message (e.g., invalid credentials)
        setGeneralError(error.response.data.message);
      } else {
        setGeneralError("Login failed. Please try again.");
      }

      console.error("Login failed:", error);
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <>
      <FullPageLoader loading={loading} />
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <div className="w-full max-w-md">
          <div className="bg-white px-8 py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                Welcome to MiniTweet
              </h1>
              <p className="text-sm text-gray-600">
                Connect with friends in 20 characters or less
              </p>
            </div>

            {/* General Error Message */}
            {generalError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{generalError}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email or Username Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 2,
                      message: "Email  must be at least 2 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.email
                      ? "focus:ring-red-500 ring-2 ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-6">
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
                  className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.password
                      ? "focus:ring-red-500 ring-2 ring-red-500"
                      : "focus:ring-blue-500"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-6 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Create Account Link */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleCreateAccount}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors border-2 border-gray-300 w-full p-2 rounded-2xl h-[50px] cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default LoginPage;
