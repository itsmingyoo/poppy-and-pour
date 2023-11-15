import { prisma } from '../../../server/db/client'

async function handler(req, res) {
    try {
        const token = await prisma.token.findFirst({
            where: {
                id: 1,
            },
        })

        if (!token) { // if no token, create the token and return null, the middleware function will then call this route again to grab newly generated token
            const clientId = process.env.ETSY_API_KEY;
            const redirectUri = 'http://localhost:3000/api/oauth/redirect';
            const scope = 'email_r';
            const state = '77pwaj';
            const codeChallenge = '8OFFvT8zjL0zoUxZg3M7crd0h-7WScXNd8mFakma7Fw';
            const codeChallengeMethod = 'S256';
            const url = `https://www.etsy.com/oauth/connect?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
            await fetch(url);

            res.status(200).json(null)
        } else { // if token already in database, simply return token
            res.status(200).json(token)
        }

    } catch (e) {
        console.log('we failed to upsert token', e)
        const clientId = process.env.ETSY_API_KEY;
        const redirectUri = 'http://localhost:3000/api/oauth/redirect';
        const scope = 'email_r';
        const state = '77pwaj';
        const codeChallenge = '8OFFvT8zjL0zoUxZg3M7crd0h-7WScXNd8mFakma7Fw';
        const codeChallengeMethod = 'S256';
        const url = `https://www.etsy.com/oauth/connect?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}`;
        await fetch(url);

        res.status(200).json(null)
    }
}

export default handler
