"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const CategoriesContexts = createContext<{
  categories: string[];
  setCategories?: Dispatch<SetStateAction<{ categories: string[] }>>;
}>({
  categories: ["All"],
});

export default function CategoriesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, setCategories] = useState<{
    categories: string[];
  }>({
    categories: ["All"],
  });
  return (
    <CategoriesContexts.Provider value={{ ...categories, setCategories }}>
      {children}
    </CategoriesContexts.Provider>
  );
}
