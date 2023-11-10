import React, { useState } from 'react'
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
    console.log("we're in /auth")
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

    const handleGoogleSignIn = () => {
        signIn('google') // Use the correct provider, e.g., 'google', 'github', etc.
    }

    return (
        <section className={classes.auth}>
            <form onSubmit={submitHandler}>
                {!isLogin && (
                    <>
                        <TextField
                            type="text"
                            label="First Name"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            type="text"
                            label="Last Name"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </>
                )}
                <TextField
                    type="email"
                    id="email"
                    label="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type="password"
                    id="password"
                    label="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
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

                <button
                    type="submit"
                    className="button"
                    style={{
                        '--provider-bg': '#fff',
                        '--provider-dark-bg': '#fff',
                        '--provider-color': '#000',
                        '--provider-dark-color': '#000',
                        '--provider-bg-hover': 'rgba(255, 255, 255, 0.8)',
                        '--provider-dark-bg-hover': 'rgba(255, 255, 255, 0.8)',
                        '--darkreader-bg--provider-bg': '#181a1b',
                        '--darkreader-bg--provider-dark-bg': '#181a1b',
                        '--darkreader-text--provider-color': '#e8e6e3',
                        '--darkreader-text--provider-dark-color': '#e8e6e3',
                        '--darkreader-bg--provider-bg-hover':
                            'rgba(24, 26, 27, 0.8)',
                        '--darkreader-bg--provider-dark-bg-hover':
                            'rgba(24, 26, 27, 0.8)',
                    }}
                    onClick={handleGoogleSignIn}
                >
                    <div style={{ display: 'flex' }}>
                        <img
                            loading="lazy"
                            height="24"
                            width="24"
                            id="provider-logo-dark"
                            src="https://authjs.dev/img/providers/google.svg"
                            alt="Dark Google Logo"
                        />
                        <span>Sign in with Google</span>
                    </div>
                </button>
            </form>
        </section>
    )
}

export default AuthForm
