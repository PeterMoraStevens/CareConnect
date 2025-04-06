import React, { useState } from "react";
import { auth } from "../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"

async function signIn(
  email: string,
  password: string,
  setError: (msg: string) => void
) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    setError(error.message || "Invalid email or password.");
  }
}

const OrgSignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const user = await signIn(username, password, setError);
    if (user) navigate("/");
  };

  return (
    <>
      <div className="navbar bg-orange-100 shadow-sm">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            <img src={logo} height={40} width={40} />
            CareConnect
          </a>
        </div>
      </div>
      <div className="hero bg-orange-200 min-h-screen text-black">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Welcome back, thank you for supporting your community!
            </p>
          </div>
          <div className="card bg-orange-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label text-black">Email</label>
                <input
                  type="email"
                  onChange={(e) => setUsername(e.target.value)}
                  className="input bg-orange-50"
                  placeholder="Email"
                />
                <label className="fieldset-label text-black">Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="input bg-orange-50"
                  placeholder="Password"
                />
                <a href="SignUpOrg" className="underline">
                  Sign Up?
                </a>
                <button className="btn btn-neutral mt-4" onClick={handleSignIn}>
                  Login
                </button>
              </fieldset>
              {error && (
                <div className="toast toast-end">
                  <div className="alert alert-error">
                    <span>{error}</span>
                    <button
                      className="btn btn-circle btn-ghost"
                      onClick={() => setError("")}
                    >
                      x
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgSignIn;
