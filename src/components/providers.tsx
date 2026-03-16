"use client";

import { PropsWithChildren } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "@/theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider
      theme={theme}
    >
      {children}
    </ChakraProvider>
  );
}
