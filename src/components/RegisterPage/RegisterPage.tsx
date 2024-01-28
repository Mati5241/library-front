import * as React from "react";
import './RegisterPage.css'
import Axios from 'axios'
import {useState} from "react";


export const RegisterPage: React.FC = ({closeRegisterPage}) => {

        const [login, setLogin] = useState('');
        const [name, setName] = useState('');
        const [password, setPassword] = useState('');
        const [status, setStatus] = useState('uzytkownik')



        Axios.defaults.withCredentials = true


    const registerFunction = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post('http://localhost:3001/register', {
                login: login,
                name: name,
                password: password,
                status: status,
            });

            if (response.data.success) {
                alert('Zarejestrowano pomyślnie, możesz się zalogować')
                closeRegisterPage();
            } else {
                if (response.status === 400 && response.data.message === 'Błąd rejestracji: Taki login jest zajęty.') {
                    alert('Błąd rejestracji: Taki login jest zajęty.');
                } else {
                    alert(`Błąd rejestracji: ${response.data.message}`);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Błąd rejestracji: Taki login jest zajęty.');
            } else {
                alert('Błąd komunikacji z serwerem. Spróbuj ponownie później.');
            }
        }
    };






    return (
            <div className="modal-register">
                <div className="overlay"></div>
                <div className="modal-content-register">


                    <h1>Rejestracja</h1>
                    <br/>

                    <form onSubmit={registerFunction}>
                        Login
                        <br/>
                        <input
                            required
                            maxLength='20'
                            className='input-field-register'
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            type="text"/>
                        <br/><br/>

                        Imię
                        <br/>
                        <input
                            required
                            maxLength='20'
                            className='input-field-register'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"/>
                        <br/><br/>

                        Hasło
                        <br/>
                        <input
                            required
                            maxLength='70'
                            className='input-field-register'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"/>
                        <br/><br/>

                        Status
                        <select className='input-select-status' onChange={(e) => setStatus(e.target.value)}>
                            <option>uzytkownik</option>
                            <option>administrator</option>
                        </select>
                        <br/><br/>
                        <input className='register-submit-button' type="submit" value="Zarejestruj"/>
                    </form>

                    <button onClick={closeRegisterPage} className="close-filter-button-register">Zamknij</button>

                </div>

            </div>
        );
    };

