import { getSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import ProfileForm from './profile-form';

function UserProfile() {

    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("")

    async function changePasswordHandler(passwordObjData) {
        // attach session data to passwordObjData
        const session = await getSession()
        passwordObjData["session"] = session

        const response = await fetch('/api/user/change-password', {
            method: 'PATCH',
            body: JSON.stringify(passwordObjData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log("FRONTEND RESPONSE -----> ", data)

        if (response.ok) {
            // Password change was successful; you can clear any form-specific errors here
            setFormErrors({});

            setSuccessMessage("Successfully Changed Password!")
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return () => {
                clearTimeout(timer);
            };

            } else {
            // Password change had errors; update the form-specific errors state
            setFormErrors(data.errors || {});
        }


    }

    return (
        <section>
            <ProfileForm onChangePassword={changePasswordHandler} backendFormErrors={formErrors} successMessage={successMessage} />
        </section>
    );
}

export default UserProfile;
