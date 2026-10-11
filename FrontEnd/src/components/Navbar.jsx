
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

const fontStyle = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMenuOpen(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `border-b-2 px-1 py-2 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2438D9] ${
      isActive
        ? "border-[#2438D9] text-[#2438D9]"
        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
      isActive
        ? "bg-[#2438D9]/10 text-[#2438D9]"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <nav
      className="relative z-50 bg-[#F5F6FB]"
      style={fontStyle}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-10">

        {/* Logo */}
        <Link
          to="/templates"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-md bg-[#2438D9]">
            <span className="absolute left-1 top-2 h-5 w-4 -rotate-12 rounded-sm bg-[#FFD84D]" />
            <span className="absolute left-3.5 top-1.5 h-5 w-4 rotate-6 rounded-sm bg-[#FF8FB1]" />
          </span>

          <span className="truncate text-base font-extrabold tracking-tight text-slate-900 sm:text-xl">
            TemplateStore
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 sm:flex sm:gap-7">
          {token ? (
            <>
              <NavLink to="/templates" className={linkClass}>
                Templates
              </NavLink>

              <NavLink to="/favorites" className={linkClass}>
                Favorites
              </NavLink>

              <button
                onClick={logout}
                className="rounded-full border-2 border-slate-900 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `rounded-full px-5 py-2 text-sm font-semibold text-white transition ${
                    isActive
                      ? "bg-[#1B2BB0]"
                      : "bg-[#2438D9] hover:bg-[#1B2BB0]"
                  }`
                }
              >
                Create account
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-[#2438D9] hover:text-[#2438D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2438D9] sm:hidden"
        >
          {menuOpen ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white px-4 py-4 shadow-lg sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {token ? (
              <>
                <NavLink
                  to="/templates"
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Templates
                </NavLink>

                <NavLink
                  to="/favorites"
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Favorites
                </NavLink>

                <button
                  onClick={logout}
                  className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </NavLink>

                <NavLink
                  to="/register"
                  className={mobileLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Create account
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;