import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  validateEmail,
  validateName,
  validateNewPassword,
} from "../utils/validation";



const fontStyle = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const validators = {
    name: validateName,
    email: validateEmail,
    password: validateNewPassword,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  
    if (fieldErrors[name]) setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors((previous) => ({ ...previous, [name]: validators[name](value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validateNewPassword(form.password),
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setLoading(true);

    try {
      const response=await api.post("/user/register", {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      });

      const token=response.data.data?.token;
      if(!token){
        throw new Error ("Registration unsucessful")
      }  
      localStorage.setItem("token",token)

      navigate("/templates");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border-0 border-b-2 bg-transparent px-0 py-3 text-lg text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-[#2438D9] ${
      fieldErrors[field] ? "border-red-600" : "border-slate-300"
    }`;

  const errorText = (field) =>
    fieldErrors[field] && (
      <p id={`${field}-error`} className="mt-2 text-sm text-red-700">
        {fieldErrors[field]}
      </p>
    );

  return (
    <div
      className="grid min-h-screen grid-cols-1 bg-[#F5F6FB] lg:grid-cols-2"
      style={fontStyle}
    >
   
      <aside className="relative hidden overflow-hidden bg-[#2438D9] lg:block">
        <div className="absolute left-12 top-12 max-w-xs">
          <p className="text-4xl font-extrabold leading-tight text-white">
            Find a template.
            <br />
            Keep it for later.
          </p>
        </div>

     
        <div className="absolute left-[12%] top-[38%] h-64 w-48 -rotate-6 rounded-md bg-[#FFD84D] p-4 shadow-xl">
          <div className="h-3 w-2/3 rounded-sm bg-[#2438D9]" />
          <div className="mt-3 h-24 rounded-sm bg-[#2438D9]/15" />
          <div className="mt-3 h-2 w-full rounded-sm bg-[#2438D9]/40" />
          <div className="mt-2 h-2 w-4/5 rounded-sm bg-[#2438D9]/40" />
        </div>

        <div className="absolute left-[38%] top-[48%] h-72 w-52 rotate-3 rounded-md bg-[#FF8FB1] p-4 shadow-xl">
          <div className="h-28 rounded-sm bg-white/60" />
          <div className="mt-4 h-3 w-1/2 rounded-sm bg-[#2438D9]" />
          <div className="mt-2 h-2 w-full rounded-sm bg-[#2438D9]/40" />
          <div className="mt-2 h-2 w-3/4 rounded-sm bg-[#2438D9]/40" />
        </div>

        <div className="absolute left-[22%] top-[66%] h-56 w-56 -rotate-2 rounded-md bg-[#F4F4F0] p-4 shadow-xl">
          <div className="flex gap-2">
            <div className="h-16 w-1/2 rounded-sm bg-[#2438D9]" />
            <div className="h-16 w-1/2 rounded-sm bg-[#FFD84D]" />
          </div>
          <div className="mt-3 h-2 w-full rounded-sm bg-[#2438D9]/40" />
          <div className="mt-2 h-2 w-2/3 rounded-sm bg-[#2438D9]/40" />
        </div>
      </aside>

    
      <main className="flex items-center justify-center px-6 py-12 sm:px-12">
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Sign up to browse templates and save the ones you like.
          </p>

          {error && (
            <p
              role="alert"
              className="mt-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="mt-8 space-y-7">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={50}
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className={inputClass("name")}
                placeholder="Your name"
              />
              {errorText("name")}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={inputClass("email")}
                placeholder="you@example.com"
              />
              {errorText("email")}
            </div>

            
<div>
  <label
    htmlFor="password"
    className="block text-sm font-semibold text-slate-700"
  >
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      value={form.password}
      onChange={handleChange}
      onBlur={handleBlur}
      required
      maxLength={72}
      autoComplete="current-password"
      aria-invalid={Boolean(fieldErrors.password)}
      aria-describedby={
        fieldErrors.password ? "password-error" : undefined
      }
      className={`${inputClass("password")} pr-12`}
      placeholder="Your password"
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
       
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 5.2A11 11 0 0 1 12 5c5 0 9 7 9 7a15 15 0 0 1-3 3.8" />
          <path d="M6.6 6.6C4.1 8.2 3 12 3 12s3 7 9 7a9 9 0 0 0 3-.5" />
        </svg>
      ) : (
     
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  </div>

  {errorText("password")}
</div>

          </div>

          <button
            disabled={loading}
            className="mt-10 w-full rounded-full bg-[#2438D9] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1B2BB0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2438D9] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="mt-6 text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#2438D9] underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Register;
