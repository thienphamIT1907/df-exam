import { SigninResponse } from "@/app/types/common";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({
        email: event.target.elements.email.value,
        password: event.target?.elements.password.value,
      }),
    });
    const data: SigninResponse = await response.json();
    if (data?.message) {
      setErrorMsg(data?.message);
    } else {
      localStorage.setItem("login", JSON.stringify(data));
      setErrorMsg("");
      push("/home");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-white w-1/2 border shadow-lg rounded-xl">
      <h1 className="text-2xl font-semibold mt-4">Login</h1>
      <form
        className="flex flex-col justify-center items-center gap-4 p-6 w-full"
        onSubmit={handleSubmit}
      >
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          className="border p-2 rounded-lg w-3/4"
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          className="border p-2 rounded-lg w-3/4"
        />
        {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
        <button
          type="submit"
          className="mt-5 outline-none border-none px-4 py-2 bg-teal-950 text-white rounded-lg w-1/2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
