import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import RegisterPage from "../pages/RegisterPage";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();
const mockRegisterUser = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    loading: false,
    registerUser: mockRegisterUser,
  }),
}));

vi.mock("../components/FullPageLoader", () => ({
  default: () => null,
}));

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("submits registration and navigates to /tweetfeed on success", async () => {
    mockRegisterUser.mockResolvedValue({});

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Firstname/i), {
      target: { value: "Carlo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Surname/i), {
      target: { value: "D." },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "carlo@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/tweetfeed");
    });
  });

  it("shows validation errors when inputs are empty", async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Firstname is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Surname is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it("shows backend error messages from server", async () => {
    mockRegisterUser.mockRejectedValue({
      response: {
        data: {
          errors: {
            email: ["This email is already taken"],
          },
        },
      },
    });

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Firstname/i), {
      target: { value: "Carlo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Surname/i), {
      target: { value: "D." },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "carlo@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/This email is already taken/i)
      ).toBeInTheDocument();
    });
  });

  it("disables button while loading", async () => {
    vi.resetModules();

    vi.doMock("../context/AuthContext", () => ({
      useAuth: () => ({
        loading: true,
        registerUser: vi.fn(),
      }),
    }));

    const { default: RegisterPageReloaded } = await import(
      "../pages/RegisterPage"
    );

    vi.doMock("../components/FullPageLoader", () => ({
      default: () => null,
    }));

    render(
      <MemoryRouter>
        <RegisterPageReloaded />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Creating Account/i });

    expect(button).toBeDisabled();
  });

  it("renders a Log In link pointing to /login", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Log In/i });
    expect(link).toHaveAttribute("href", "/login");
  });
});
