import Dialog from '@mui/material/Dialog';
import './login.css';

function Login(props) {
    const { onClose, open } = props;

    return(
        <div>
            <Dialog onClose={onClose} open={open}>

                <fieldset className="fields">
                <h2>Login</h2>
                    <input name="email" placeholder="Email"/>

                    <input type="password" name="password" placeholder="Password"/>



                </fieldset>
                <div className="buttonsDiv">
                    <p><a href="">Forgot password?</a></p>
                    <button type="submit" className="loginButtons">Login</button>
                    <p>Don't have an account? <a href="">Sign up!</a></p>
                </div>
                <div>

                </div>

            </Dialog>
        </div>
    )

}

export default Login;
