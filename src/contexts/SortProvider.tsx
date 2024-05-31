"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { MOST_UPVOTES, option } from "../components/SortBy";

export const SortOrderContexts = createContext<{
  order: option;
  setSortOrder?: Dispatch<SetStateAction<{ order: option }>>;
}>({
  order: MOST_UPVOTES,
});

export default function SortOrderProvider({
    children,
}: {
  children: ReactNode;
}) {
  const [sortOrder, setSortOrder] = useState<{ order: option }>({
    order: MOST_UPVOTES,
  });
  return (
    <SortOrderContexts.Provider value={{ ...sortOrder, setSortOrder }}>
      {children}
    </SortOrderContexts.Provider>
  );
}
