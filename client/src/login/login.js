import Dialog from '@mui/material/Dialog';
import './login.css';
import { useEffect, useState } from "react";

function Login(props) {
    const { onClose, open } = props;
    const [signUp, setSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        const regex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
        if (!regex.test(email)) {
            errors.push('Please provide a valid email.');
        }
        if (!password === password2) {
            errors.push('Please confirm passwords match.');
        }
        if (!name.length || !email.length || !password.length || !password2.length) {
            errors.push('Please fill out all fields.');
        }
        setValidationErrors(errors);
    }, [email, password, password2])

    const onSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return;
        const information = {
            email,
            name,
            password
        };
        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(information)
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.result === 'ok') {
                setEmail('');
                setName('');
                setPassword('');
                setPassword2('');
                setValidationErrors([]);
                setHasSubmitted(false);
                setSignUp(false);
                return alert(`Successfully signed up!`);
            } else if (json.result === 'email') {
                return alert(`This email is already in use.`);
            } else {
                return alert(`There was an error. Please try again later.`);
            }
        })
        .catch((e) => {return alert(`There was an error. Please try again later.`)});
    }

    return(
        <div>
            <Dialog onClose={onClose} open={open}>
            {!signUp &&
                <div>
                    <form onSubmit={onSubmit}>
                    <fieldset className="fields">
                    <h2>Login</h2>
                        <input name="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email"/>

                        <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password"/>



                    </fieldset>
                    <div className="buttonsDiv">
                        <button type="submit" className="loginButtons">Login</button>
                        <p>Don't have an account? <a href="#" onClick={() => setSignUp(true)}>Sign up!</a></p>
                    </div>
                    </form>
                </div>
            }
            {signUp &&
                <div>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <div className='list-div'>
                            The following errors were found:
                            <ul>
                                {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
                    <fieldset className="fields">
                    <h2>Sign Up</h2>
                        <input name="name" onChange={e => setName(e.target.value)} placeholder="Name"/>
                        <input name="email" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                        <input type="password" name="password2" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Confirm Password"/>
                    </fieldset>
                    <div className="buttonsDiv">
                        <button type="submit" className="loginButtons">Submit</button>
                        <p>Already have an account? <a href="#" onClick={() => setSignUp(false)}>Log in!</a></p>
                    </div>
                    </form>
                </div>
            }
            </Dialog>
        </div>
    )

}

export default Login;
