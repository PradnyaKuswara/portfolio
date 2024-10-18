"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuthMiddleware from "@/app/(protected)/middleware/useAuthMiddleware";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface User {
  uuid: string;
  email: string;
  name: string;
}

const LoginPage = () => {
  const user = useAuthMiddleware() as User | null;

  const router = useRouter();

  if (user) {
    router.push("/admin/dashboard");
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState<string[]>([]);
  const [errorPassword, setErrorPassword] = React.useState<string[]>([]);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_FETCH}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 400) {
      const { errors } = await response.json();

      const emailError = errors
        .filter((error: any) => error.path === "email")
        .map((error: any) => error.msg);

      const passwordError = errors
        .filter((error: any) => error.path === "password")
        .map((error: any) => error.msg);

      setErrorEmail(emailError);
      setErrorPassword(passwordError);
    }

    if (response.status === 200) {
      const { token } = await response.json();

      Cookies.set("token", token, { expires: 1, path: "/" }); // Set cookie dengan masa berlaku 7 hari

      toast.success("Login successfully");

      router.push("/admin/dashboard");
    }

    if (response.status === 401 || response.status === 404) {
      setErrorPassword(["Invalid credentials"]);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-4 space-y-4  rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              <div>
                {errorEmail.length > 0 && (
                  <p className="text-red-500 text-xs mt-2">{errorEmail[0]}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
              <div>
                {errorPassword.length > 0 && (
                  <p className="text-red-500 text-xs mt-2">
                    {errorPassword[0]}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
