
import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const fontStyle = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

const mats = ["bg-[#FFD84D]", "bg-[#FF8FB1]", "bg-[#2438D9]"];

 function Templates() {
  const [templates, setTemplates] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);


  useEffect(() => {
    let cancelled = false;

    const loadTemplates = async () => {
      try {
        setLoading(true);
        setError("");

        const [templateResponse, favoriteResponse] = await Promise.all([
          api.get("/templetes", {
            params: {
              search: debouncedSearch,
              category,
            },
          }),

          localStorage.getItem("token")
            ? api.get("/favorite")
            : Promise.resolve({ data: { data: [] } }),
        ]);

        if (cancelled) return;

        
        const templateData =
          templateResponse.data.templetes ??
          templateResponse.data.data ??
          [];

        setTemplates(templateData);

        const favoriteData =
          favoriteResponse.data.favorites ??
          favoriteResponse.data.data ??
          [];

        setFavorites(
          favoriteData.map((item) =>
            String(
              item._id ??
                item.id ??
                item.template?._id ??
                item.template?.id ??
                item.template
            )
          )
        );
      } catch (err) {
        if (cancelled) return;

        setError(
          err.response?.data?.message || "Unable to load templates"
        );
        setTemplates([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTemplates();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, category]);

 
  const categories = useMemo(
    () => [
      "All",
      ...new Set(templates.map((t) => t.category).filter(Boolean)),
    ],
    [templates]
  );

  const addFavorite = async (templateId) => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    setSavingId(templateId);
    setError("");

    try {
      await api.post(`/favorite/add/${templateId}`);

      setFavorites((previous) =>
        previous.includes(String(templateId))
          ? previous
          : [...previous, String(templateId)]
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to add favorite"
      );
    } finally {
      setSavingId("");
    }
  };

  const fieldClass =
    "w-full border-0 border-b-2 border-slate-300 bg-transparent px-0 py-3 text-lg text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-[#2438D9]";

  return (
    <main className="min-h-screen bg-[#F5F6FB]" style={fontStyle}>
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Explore templates
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Find a template and save your favorites.
          </p>
        </header>

  
       <div className="mb-10 grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_240px]">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-semibold text-slate-700"
            >
              Search
            </label>

            <input
              id="search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or description"
              className={fieldClass}
            />
          </div>

        
<div className="w-full min-w-0">
  <label
    htmlFor="category-button"
    className="mb-2 block text-sm font-semibold text-slate-700"
  >
    Category
  </label>

  <div className="relative w-full min-w-0">
    <button
      id="category-button"
      type="button"
      aria-haspopup="listbox"
      aria-expanded={categoryOpen}
      onClick={() => setCategoryOpen((open) => !open)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-[#2438D9] focus:ring-4 focus:ring-[#2438D9]/10"
    >
      <span className="truncate">
        {category === "All" ? "All categories" : category}
      </span>

      <svg
        className={`h-5 w-5 shrink-0 text-[#2438D9] transition-transform ${
          categoryOpen ? "rotate-180" : ""
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    {categoryOpen && (
      <>
       
        <button
          type="button"
          aria-label="Close category dropdown"
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setCategoryOpen(false)}
        />

        <div
          role="listbox"
          aria-label="Categories"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-56 w-full overflow-x-hidden overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={category === item}
              onClick={() => {
                setCategory(item);
                setCategoryOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-left text-sm transition ${
                category === item
                  ? "bg-[#2438D9]/10 font-semibold text-[#2438D9]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="break-words">
                {item === "All" ? "All categories" : item}
              </span>

              {category === item && (
                <span className="shrink-0">✓</span>
              )}
            </button>
          ))}
        </div>
      </>
    )}
  </div>
</div>

        </div>

        {error && (
          <p
            role="alert"
            className="mb-8 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-12 text-center text-lg text-slate-600">
            Loading templates...
          </p>
        ) : templates.length === 0 ? (
          <div className="border-2 border-dashed border-slate-300 p-12 text-center">
            <p className="text-lg text-slate-600">
              No templates match your search. Try a different word or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 rounded-full bg-[#2438D9] px-6 py-2 font-semibold text-white hover:bg-[#1B2BB0]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => {
              const id = String(template._id || template.id);
              const isFavorite = favorites.includes(id);

              return (
                <article key={id} className="flex flex-col">
                
                  <div className={`${mats[index % mats.length]} rounded-md p-5`}>
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="h-52 w-full rounded-sm bg-white object-cover shadow-lg"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://placehold.co/600x400?text=Template";
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {template.name}
                    </h2>

                    {template.category && (
                      <span className="shrink-0 rounded-full bg-[#2438D9]/10 px-3 py-1 text-sm font-semibold text-[#2438D9]">
                        {template.category}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 line-clamp-3 text-base leading-7 text-slate-600">
                    {template.description}
                  </p>

                  <button
                    onClick={() => addFavorite(id)}
                    disabled={isFavorite || savingId === id}
                    className={`mt-5 w-full rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2438D9] ${
                      isFavorite
                        ? "cursor-default bg-[#FF8FB1] text-slate-900"
                        : "bg-[#2438D9] text-white hover:bg-[#1B2BB0] disabled:opacity-60"
                    }`}
                  >
                    {isFavorite
                      ? "♥ Saved to favorites"
                      : savingId === id
                      ? "Saving..."
                      : "♡ Save to favorites"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
export default Templates;
