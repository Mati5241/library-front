import './UserMenu.css';


export const UserMenu = ({checkLoginStatus}) => {

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('login')
        localStorage.removeItem('status')
        localStorage.removeItem('id')

        checkLoginStatus(false)
    }


    return <div id="user-menu-div">

        <span className="text-menu">Konto</span>
        <br/>
        <span onClick={logout} className="text-menu">Wyloguj</span>


    </div>
}
