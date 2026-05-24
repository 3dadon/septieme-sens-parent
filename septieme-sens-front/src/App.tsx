import { useEffect, useState } from "react";
import { senses } from "./content/senses";
import { AdminPage } from "./pages/AdminPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SensePage } from "./pages/SensePage";

function AppContent() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handleRouteChange);

    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  const segments = path.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (segments.length === 0) {
    return <HomePage />;
  }

  if (segments.length === 1 && segments[0] === "admin") {
    return <AdminPage />;
  }

  const currentSense = senses.find((sense) => sense.slug === segments[0]);

  if (!currentSense) {
    return <NotFoundPage />;
  }

  if (segments.length === 1) {
    return <SensePage sense={currentSense} />;
  }

  const currentArticle = currentSense.articles.find(
    (article) => article.slug === segments[1],
  );

  return (
    <ArticleDetailPage
      sense={currentSense}
      article={currentArticle}
      articleSlug={segments[1]}
    />
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <AppContent />
    </main>
  );
}
