import { Link } from "react-router-dom";
import { NEWS } from "../data.js"; // move the NEWS array here

export default function AllNews() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All News</h1>
      <div className="space-y-3">
        {NEWS.map((n) => (
          <Link
            key={n.id}
            to={`/news/${n.id}`}
            className="block bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex gap-3">
              <div className="w-11 h-11 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-700 font-extrabold grid place-items-center shrink-0 overflow-hidden">
                {n.badge ?? "RU"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold">{n.source}</span>
                  <span>•</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="mt-1 font-bold">{n.title}</h3>
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                  <span>{n.views.toLocaleString()} reads</span>
                </div>
              </div>
              <div className="self-center text-indigo-700 font-semibold">
                View →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
