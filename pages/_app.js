
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/layout";
import { createTheme, ThemeProvider } from "@mui/material";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  //   dark = false

  const theme = createTheme({
    typography: {
      fontFamily: '"Inria Sans", sans-serif' , // Replace 'Your-Primary-Font' with the desired font
    },
    palette: {

      primary: {
        main: "#EBA392"
      }
    }
  })


  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.

    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );

}

export default MyApp
