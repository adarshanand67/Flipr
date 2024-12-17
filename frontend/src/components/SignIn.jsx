import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    const body = {
      email: user.email,
      password: user.password,
    };
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: "Logged in.",
            description: "We've logged you in. Redirecting to dashboard...",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          navigate("/");
        } else {
          toast({
            title: "Error logging in.",
            description:
              "We've encountered an error logging you in. Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center m-5">
          <h1 className="text-4xl font-bold text-blue-600">Sign In</h1>
        </div>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
