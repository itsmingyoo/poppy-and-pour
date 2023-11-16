// check db if token exists
export async function validateTokenWithDB(token) {
    console.log('VALIDATING TOKEN...', token)
    const existingToken = await prisma.token.findFirst({
        where: {
            id: 1,
        },
    })

    // create token if it doesnt exist with the token data received
    // the middleware function will then call this route again to grab newly generated token
    if (!existingToken) {
        const newToken = await prisma.token.create({
            data: {
                accessToken: token.access_token,
                refreshToken: token.refresh_token,
                expiresIn: token.expires_in,
            },
        })
        console.log('NEW TOKEN CREATED --->', newToken)
        return newToken
        // res.redirect(`http://localhost:3000/api/oauth/welcome`)
        // res.status(200).json(newToken)
    } else {
        // if token already in database, simply return token
        console.log('EXISTING DB TOKEN --->', existingToken)
        return existingToken
        // res.redirect(`http://localhost:3000/api/oauth/welcome`)
        // res.status(200).json(existingToken)
    }
    // Redirect to the welcome page or handle success as needed
    // res.redirect(`http://localhost:3000/api/oauth/welcome`)
}


