"use client";

import React, { createContext, useContext } from "react";

export type PostTab = "NewsFeed" | "All" | "Q&A" | "Lesson" | "Announcement";

export type HomepageFilters = {
  search: string;
  setSearch: (v: string) => void;
  activeTab: PostTab;
  setActiveTab: (t: PostTab) => void;
};

export const HomepageFiltersContext = createContext<HomepageFilters | null>(null);

export function useHomepageFilters() {
  const ctx = useContext(HomepageFiltersContext);
  if (!ctx) throw new Error("useHomepageFilters must be used within HomepageFiltersContext.Provider");
  return ctx;
}
