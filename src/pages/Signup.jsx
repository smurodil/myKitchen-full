import { useSignup } from "../hooks/useSignup";
import { useRef } from "react";
import videoBg2 from "../video/vid2.mp4";

function Signup() {
  const displayName = useRef();
  const email = useRef();
  const password = useRef();
  const photoUrl = useRef();
  const { signUpWithGoogleProvider, signup } = useSignup();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signUpWithGoogleProvider();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(
      displayName.current.value,
      email.current.value,
      password.current.value,
      photoUrl.current.value
    );
  };

  return (
    <div className="h-screen grid place-items-center">
      <video
        className="w-full h-screen object-cover"
        src={videoBg2}
        autoPlay
        loop
        muted
      />
      <div className=" bg-slate-500/35 py-5 px-10 rounded-lg absolute">
        <h1 className="text-3xl font-bold mb-5 text-white">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="items-center mb-10">
            <label className="mr-5 text-white" htmlFor="username">
              Name:{" "}
            </label>
            <input
              ref={displayName}
              type="text"
              placeholder="Type your username"
              id="username"
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5 text-white" htmlFor="photoUrl">
              Photo Url:
            </label>
            <input
              ref={photoUrl}
              type="url"
              id="photoUrl"
              placeholder="Type your url"
              className="input input-bordered input-error w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5 text-white" htmlFor="email">
              Email:{" "}
            </label>
            <input
              ref={email}
              type="email"
              placeholder="Type your email"
              id="email"
              className="input input-bordered input-primary w-full max-w-xs"
              required
            />
          </div>
          <div className="items-center mb-10">
            <label className="mr-5 text-white" htmlFor="password">
              Password
            </label>
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Type your password"
              className="input input-bordered input-error w-full max-w-xs"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn btn-primary btn-sm md:btn-md">
              Sign Up
            </button>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-sm md:btn-md btn-error text-white"
            >
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
