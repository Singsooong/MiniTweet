import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import { authAPI } from "../services/authServices";

// 🧠 Mock FullPageLoader (avoid actual rendering)
vi.mock("../components/FullPageLoader", () => {
  return { default: () => null };
});

// 🧠 Mock API service
vi.mock("../services/authServices", async () => {
  const actual = await vi.importActual("../services/authServices");
  return {
    ...actual,
    authAPI: {
      ...actual.authAPI,
      loginUser: vi.fn(),
    },
  };
});

// 🧠 Mock react-router-dom navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  // ✅ 1. Successful login
  it("submits login and navigates to /tweetfeed on success", async () => {
    authAPI.loginUser.mockResolvedValue({
      data: { user: { id: 1, name: "Test" }, token: "token-xyz" },
    });

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/tweetfeed");
    });

    expect(localStorage.getItem("token")).toBe("token-xyz");
    expect(JSON.parse(localStorage.getItem("user"))).toEqual({
      id: 1,
      name: "Test",
    });
  });

  // ✅ 2. Validation errors
  it("shows validation errors when inputs are empty", async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  // ✅ 3. Login failure
  it("shows error message when login fails", async () => {
    authAPI.loginUser.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it("disables button while loading", async () => {
    authAPI.loginUser.mockImplementation(() => new Promise(() => {})); // never resolves

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Log In/i }));

    const button = screen.getByRole("button", { name: /Log In/i });

    await waitFor(() => expect(button).toBeDisabled(), { timeout: 500 });
  });

  it("navigates to /register when Create Account is clicked", () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const createButton = screen.getByRole("button", {
      name: /create account/i,
    });
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("redirects to /tweetfeed if token already exists", async () => {
    localStorage.setItem("token", "existing-token");

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/tweetfeed");
    });
  });
});
