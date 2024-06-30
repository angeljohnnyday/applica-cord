import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider, ReactQueryProvider } from "@/lib/providers";
import theme from "@/utils/material-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Applica Corp",
  description: "Search movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              my='2rem'
              px={{
                xs: '1.6rem',
                md: '2.4rem',
              }}
            >
              <AppProvider>
                {children}
              </AppProvider>
            </Box>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
