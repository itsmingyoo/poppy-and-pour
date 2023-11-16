import Link from 'next/link'

function redirect() {
    async function EtsyAuth() {}
    return (
        <div style={{ textAlign: 'center' }}>
            <button>
                <a
                    href={`https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3000/api/oauth/redirect&scope=email_r&client_id=${process.env.ETSY_API_KEY}&state=77pwaj&code_challenge=8OFFvT8zjL0zoUxZg3M7crd0h-7WScXNd8mFakma7Fw&code_challenge_method=S256`}
                >
                    Authenticate with Etsy
                </a>
            </button>
            <button>
                <Link href="/api/oauth/redirect">TEST AUTH NO LINK</Link>
            </button>
            <button>
                <Link
                    href={`https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:3000/api/oauth/redirect&scope=email_r&client_id=${process.env.ETSY_API_KEY}&state=77pwaj&code_challenge=8OFFvT8zjL0zoUxZg3M7crd0h-7WScXNd8mFakma7Fw&code_challenge_method=S256`}
                >
                    TEST AUTH WITH LINK
                </Link>
            </button>
        </div>
    )
}

export default redirect
