import * as React from "react";
import './LoginPage.css'
import Axios from 'axios'
import {useState} from "react";
import {RegisterPage} from "../../components/RegisterPage/RegisterPage";


export const LoginPage: React.FC = ({loginStatus, checkLoginStatus, checkLoginName}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [registerWindow, setRegisterWindow] = useState(false);

    const localToken = localStorage.getItem('token')
    const localLogin = localStorage.getItem('login')


    const closeRegisterPage = () => {
        setRegisterWindow(false)
    }


    if (localToken) {
        checkLoginStatus(true)
    }


    Axios.defaults.withCredentials = true


    const register = () => {
        setRegisterWindow(true)
    }

    const loginFunction = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:3001/login', {
                login: login,
                password: password,
            });

            if (!response.data.auth) {
                alert(response.data.message);
                checkLoginStatus(false);
            } else {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('login', response.data.login);
                localStorage.setItem('status', response.data.status);
                localStorage.setItem('id', response.data.id);
                checkLoginStatus(true);
                checkLoginName(response.data.login);
            }
        } catch (error) {
            console.error('Błąd logowania:', error.response ? error.response.data : 'Nieznany błąd');

            if (error.response && error.response.status === 401) {
                alert('Nieprawidłowy login lub hasło.');
            } else {
                alert('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
            }
        }
    };







    return <>
        <div className="login-container">
            <img className="logo" src="logo.png" alt="Online Library"/>

            <div className="form-login-div">
                <form onSubmit={loginFunction}>

                    Login
                    <br/>
                    <input
                        className="input-field"
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <br/>
                    Hasło
                    <br/>
                    <input
                        className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <br/><br/>

                    <input
                        className="login-button"
                        value="Zaloguj się"
                        type='submit'
                    />


                </form>
            </div>
            <br/><br/>

            <span className="register-text">Nie masz konta? </span><span className='register-button'
                                                                         onClick={register}>zarejestruj się</span>

            {registerWindow && <RegisterPage closeRegisterPage={closeRegisterPage}/>}

        </div>

    </>
}


