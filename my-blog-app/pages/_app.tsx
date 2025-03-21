import React from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeAPIClient } from "@/lib/api-client";
import { MainLayout } from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import Head from "next/head";

const queryClient = new QueryClient();

initializeAPIClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
};

export default MyApp;
