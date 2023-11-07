import { useState } from 'react'
import classes from './auth-form.module.css'

// call signIn function to validate credentials (setup for this provider is found in [...nextauth].js file)
import { signIn } from 'next-auth/react'

// used to re-direct is successfully logging in
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'

import { TextField } from '@mui/material'

// helper function used in the submitHandler() function for registering a user
async function createUser(email, password, firstName, lastName) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, firstName, lastName }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(
            data.message || 'Something went wrong attempting to register user!'
        )
    }

    return data
}

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const router = useRouter()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({})

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState)
    }

    const login = async () => {
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })
        if (!res.error) {
            // IF WE HAVE SUCCESSFULLY LOGGED IN, redirect to the home page
            router.replace('/')
        }
        toast.success('Login successful!')
        console.log('RESULT FROM LOGIN', res)
    }

    async function submitHandler(e) {
        e.preventDefault()

        // optional ---> Add Frontend Validations before making the fetch call

        if (isLogin) {
            // if we are looking at the LOGIN form

            const errorObj = {}
            if (!email) errorObj.email = 'No email provided'
            if (password.trim().length > 30)
                errorObj.password =
                    'Password Must not exceed 30 characters in length'
            if (!password) errorObj.password = 'Please provide a password'

            if (Object.keys(errorObj).length > 0) {
                setErrors(errorObj)
                return
            }

            try {
                login()
            } catch (e) {
                toast(`Error - ${e}`, { position: 'top-center', type: 'error' })
            }

            // if login was successful, should get an object back like this ------>  {error: null, status: 200, ok: true, url: 'http://localhost:3000/auth'}
        } else {
            // if we are looking at the SIGNUP form
            const errorsObj = {}
            if (!firstName)
                errorsObj.firstName = 'WHATS YOUR FIRST NAME DIPSHIT'
            if (!password) errorsObj.password = 'Please provide a password'
            if (password.trim().length > 30)
                errorsObj.password =
                    'Password Must not exceed 30 characters in length'
            if (!email) errorsObj.email = 'No email provided'

            if (Object.keys(errorsObj).length > 0) {
                setErrors(errorsObj)
                return
            }

            try {
                const res = await createUser(
                    email,
                    password,
                    firstName,
                    lastName
                )
                console.log(res)
                // once user created, can re-direct or do whatever you need to do...
                login()
            } catch (e) {
                toast(`Error - ${e}`, { position: 'top-center', type: 'error' })
                console.log(e)
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        console.log('ERRORS ---->', errors)
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                {!isLogin && (
                    <>
                        <div className={classes.control}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                label="First Name"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                label="Last Name"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <TextField
                        type="email"
                        id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <TextField
                        type="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={classes.actions}>
                    <button type="submit">
                        {isLogin ? 'Login' : 'Create Account'}
                    </button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? 'Create new account'
                            : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm
