"use client";

import SignupForm from "./signupForm";
import LoginForm from "./loginForm";
import { useState } from "react";

export default function Auth() {
  const [signup, setSignup] = useState(true);

  function renderAuth() {
    if (signup) {
      return <SignupForm />;
    } else {
      return <LoginForm />;
    }
  }

  function handleClick(e: boolean) {
    setTimeout(() => {
      setSignup(e);
    }, 500);
  }
  return (
    <section className="w-full max-w-md mx-auto mt-10">
      <fieldset className="relative w-full border border-gray-300 rounded-full h-12 overflow-hidden">
        <legend className="sr-only">Auth toggle</legend>

        {/* Hidden radio buttons */}
        <input
          type="radio"
          name="auth"
          id="signup"
          defaultChecked
          className="hidden peer/login"
          onClick={() => handleClick(true)}
        />
        <input
          type="radio"
          name="auth"
          id="login"
          className="hidden peer/signup"
          onClick={() => handleClick(false)}
        />

        {/* Animated pill */}
        <span className="absolute top-0 left-0 w-1/2 h-full rounded-full bg-gradient-to-r from-[#003366] via-[#0059b3] to-[#0073e6] transition-all duration-[600ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] peer-checked/signup:left-1/2 z-0" />

        {/* Labels */}
        <label
          htmlFor="signup"
          className="w-1/2 inline-block text-center relative z-10 leading-[48px] font-medium cursor-pointer text-white peer-checked/signup:text-black transition-colors duration-300"
        >
          Signup
        </label>
        <label
          htmlFor="login"
          className="w-1/2 inline-block text-center relative z-10 leading-[48px] font-medium cursor-pointer text-black peer-checked/signup:text-white transition-colors duration-300"
        >
          Login
        </label>
      </fieldset>
      {renderAuth()}
    </section>
  );
}
