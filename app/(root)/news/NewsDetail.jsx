import { useParams, Link } from "react-router-dom";
import { NEWS } from "../data.js";

export default function NewsDetail() {
  const { id } = useParams();
  const article = NEWS.find((n) => n.id === Number(id));

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-red-500">Article not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Back to All News
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-indigo-600 hover:underline">
        ← Back to All News
      </Link>
      <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
      <div className="mt-2 text-sm text-slate-500">
        {article.source} • {article.date} • {article.views} reads
      </div>
      <div className="mt-6 prose max-w-none">
        <p>
          {/* Here you can fetch and render the full content of the news item */}
          This is the detailed content for <strong>{article.title}</strong>.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus
          ante sed ligula facilisis, et aliquam risus egestas. 
        </p>
      </div>
    </div>
  );
}
