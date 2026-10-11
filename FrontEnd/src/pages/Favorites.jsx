import { useEffect, useState } from "react";
import api from "../services/api";



const fontStyle = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

const mats = ["bg-[#FFD84D]", "bg-[#FF8FB1]", "bg-[#2438D9]"];

 function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorite");
        setFavorites(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  
const handleRemoveFavorite = async (templateId) => {
  

  try {
    await api.delete(`/favorite/remove/${templateId}`);

  
    setFavorites((previous) =>
      previous.filter(
        (item) =>
          String(item._id || item.id || item.template?._id) !==
          String(templateId)
      )
    );
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Unable to remove template from favorites"
    );
  }
};


  if (loading) {
    return (
      <p
        className="min-h-screen bg-[#F5F6FB] p-10 text-center text-lg text-slate-600"
        style={fontStyle}
      >
        Loading favorites...
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F6FB]" style={fontStyle}>
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            My favorites
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Your saved templates, all in one place.
          </p>
        </header>

        {error && (
          <p
            role="alert"
            className="mb-8 border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {!error && favorites.length === 0 ? (
          <div className="border-2 border-dashed border-slate-300 px-6 py-16 text-center">
            <div className="text-5xl text-[#FF8FB1]">♡</div>
            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              No favorites yet
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Visit Templates and save the designs you like.
            </p>
            <a
              href="/templates"
              className="mt-6 inline-block rounded-full bg-[#2438D9] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1B2BB0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2438D9]"
            >
              Explore templates
            </a>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((template, index) => {
              const id = String(template._id || template.id);

              return (
                <article key={id} className="flex flex-col">
                
                  <div className={`${mats[index % mats.length]} rounded-md p-5`}>
                    <img
                      src={template.thumbnail_url}
                      alt={template.name}
                      className="h-52 w-full rounded-sm bg-white object-cover shadow-lg"
                      onError={(e) => {
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

                  <p className="mt-5 inline-flex w-fit items-center rounded-full bg-[#FF8FB1] px-4 py-2 text-sm font-semibold text-slate-900">
                    ♥ Saved to favorites
                  </p>
                  <button
  onClick={() => handleRemoveFavorite(template._id || template.id)}
  className="mt-4 w-full rounded-full border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
>
  Remove from favorites
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
export default Favorites;
