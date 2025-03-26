import React from "react";
import { AppProps } from "next/app";
import {
  // MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { initializeAPIClient } from "@/lib/api-client";
import { MainLayout } from "@/components/layout/MainLayout";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/styles/globals.css";
import Head from "next/head";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster, toast } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`${error.message}`),
  }),
  // mutationCache: new MutationCache({
  //   onError: (error) => toast.error(`${error.message}`),
  // }),
});

initializeAPIClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MainLayout>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              error: {
                icon: "❌",
                style: {
                  background: "#fee2e2",
                  color: "#dc2626",
                },
              },
            }}
          />{" "}
        </MainLayout>

        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
