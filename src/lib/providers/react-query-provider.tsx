"use client"
import { ReactNode } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  }
});

interface Props {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;