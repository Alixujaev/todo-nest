import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      fetch(`http://localhost:3000/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }

    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-4 py-6 rounded-xl border border-[#3E1671] w-96">
        <h2 className="text-white text-2xl font-semibold text-center mb-8">
          Login
        </h2>

        <form
          className="mb-1"
          action=""
          ref={formRef}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-transparent rounded-xl outline-none border border-[#3E1671] flex-1 text-white mb-3"
          />

          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-transparent rounded-xl outline-none border border-[#3E1671] flex-1 text-white mb-8"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#3E1671] rounded-xl outline-none border border-[#3E1671] flex-1 text-white "
          >
            Submit
          </button>
        </form>
        <Link to="/register" className="text-white flex justify-center">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
