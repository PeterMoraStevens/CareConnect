import { useState } from "react";
import { auth, db } from "../api/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

async function signUp(
  email: string,
  password: string,
  setError: (msg: string) => void
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
      resources: [],
    });

    console.log("User signed up and stored in Firestore:", user);
    return user;
  } catch (error: any) {
    setError(error.message || "An error occurred.");
  }
}

const OrgSignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const user = await signUp(username, password, setError);
    if (user) navigate("/");
  };

  return (
    <div className="hero bg-orange-200 min-h-screen text-black">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-6">
            Thank you for joining us to support your community!
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
              <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
                Sign Up
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
  );
};

export default OrgSignUp;
