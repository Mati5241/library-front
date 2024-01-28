import './App.css'
import {Header} from "./components/Header/Header";
import {MainPage} from "./components/MainPage/MainPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {useState} from "react";
import {AddBook} from "./components/AddBook/AddBook";

export const App = () => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [login, setLogin] = useState(localStorage.getItem('login'));


    const userStatus = localStorage.getItem('status')


    const checkLoginStatus = (status) => {
        setLoginStatus(status)
    }

    const checkLoginName = (login) => {
        setLogin(login)
    }


    return (
        <>
            {/*<Header/>*/}
            {/*<MainPage/>*/}
            {/*<Test/>*/}

            {/*<AddBook/>*/}

            {loginStatus ?
                <>
                    <Header userStatus={userStatus} checkLoginStatus={checkLoginStatus} login={login}/>
                    <MainPage userStatus={userStatus}/>

                </>
                :
                <LoginPage checkLoginName={checkLoginName} checkLoginStatus={checkLoginStatus}
                           loginStaus={loginStatus}/>}




        </>
    )
}

