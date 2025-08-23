"use client";

import { createContext, useContext } from "react";

export type PostTab = "NewsFeed" | "All" | "Q&A" | "Lesson" | "Announcement";

export type HomepageFilters = {
  search: string;
  setSearch: (_v: string) => void;
  activeTab: PostTab;
  setActiveTab: (_t: PostTab) => void;
};

export const HomepageFiltersContext = createContext<HomepageFilters | null>(null);

export function useHomepageFilters() {
  const ctx = useContext(HomepageFiltersContext);
  if (!ctx) throw new Error("useHomepageFilters must be used within HomepageFiltersContext.Provider");
  return ctx;
}
