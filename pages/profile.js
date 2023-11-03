import { getSession } from "next-auth/react"
import UserProfile from "@/components/profile/user-profile";

function ProfilePage() {
    return <UserProfile />;
}

// use getServerSideProps() to always ensure we ALWAYS have session data
export async function getServerSideProps(context) {
    const session = await getSession({req: context.req})
    // if no session, redirect
    if(!session) {
        return {
            redirect: {
            destination: '/auth',
            permanent: false
            }
        }
    }

    return {
        props: { session }
    }

}

export default ProfilePage;
