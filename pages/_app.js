import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/layout/layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        // `session` comes from `getServerSideProps` or `getInitialProps`.
        // Avoids flickering/session loading on first load.
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <Layout>
                <ToastContainer position="bottom-left" />
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}

export default MyApp
