// Use this form to change the user's password, sends a request to /api/user/change-password
import { useState } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {

    const { backendFormErrors, successMessage } = props

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [formErrors, setFormErrors] = useState({});

    function submitHandler(e) {
        e.preventDefault()

        const enteredOldPassword = oldPassword
        const enteredNewPassword = newPassword

        // frontend validations
        const errorObj = {}
            if(newPassword.trim().length > 30 ) errorObj.password = "New password must not exceed 30 characters in length"

            if(Object.keys(errorObj).length > 0) {
                setFormErrors(errorObj)
                return
            } else {
                setFormErrors({})
            }

        // this triggers the onChangePasswordHandlerFunction() in the parent component thats rendering this form ---> see user-profile.js to see how this looks
        props.onChangePassword({
            oldPassword: enteredOldPassword,
            newPassword: enteredNewPassword
        })

    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='old-password'>Old Password</label>
                <input type='password' id='old-password' onChange={(e) => setOldPassword(e.target.value)}/>
            </div>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
            {/* backend errors */}
            {Object.keys(backendFormErrors).length > 0 && (
                <p className={classes.error}>{backendFormErrors}</p>
            )}
            {/* frontend errors */}
            {Object.keys(formErrors).length > 0 && (
                <div className={classes.error}>
                    {Object.values(formErrors).map((error, index) => (
                    <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            {/* success message */}
            {successMessage && (
                <p className={classes.success}>{successMessage}</p>
            )}
        </form>
    );
}

export default ProfileForm;
