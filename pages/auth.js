import AuthForm from '../components/auth/auth-form';
import { getSession } from "next-auth/react"

function AuthPage() {
return <AuthForm />;
}

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})
    // if active session, redirect to home page
    if(session) {
        return {
        redirect: {
            destination: '/',
            permanent: false
        }
        }
    }

    // if no active session, you are allowed to see the sign in page
    return {
        props: { session }
    }

}

export default AuthPage;
