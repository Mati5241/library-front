import "./Header.css"
import {useState} from "react";
import {UserMenu} from "../UserMenu/UserMenu";
import {AddBook} from "../AddBook/AddBook";
import {MyBooks} from "../MyBooks/MyBooks";


export const Header = ({login, checkLoginStatus, userStatus}) => {


    const [arrow, setArrow] = useState('⮟')
    const [showUserMenu, setShowUserMenu] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [showMyBooks, setShowMyBooks] = useState(false)






    const addBookClick = () => {
        setShowForm(true)
    }

    const showMyBooksClick = () => {
        setShowMyBooks(true)

    }

    const closeForm = () => {
        setShowForm(false)
    }


    const closeMyBooks = () => {
        setShowMyBooks(false)
    }




    const showMore = () => {
        if (!showUserMenu) {
            setArrow(arrow => '⮝')
            setShowUserMenu(showUserMenu => true);
        } else {
            setArrow(arrow => '⮟')
            setShowUserMenu(showUserMenu => false);
        }
    }







    return <>
        <div id="header">
            <div id="header-inside">


                <span id="show-more-button-header" onClick={showMore}>{arrow}</span>


                <div id="user">{login}</div>

                {showUserMenu && <UserMenu checkLoginStatus={checkLoginStatus}/>}

                {(userStatus === 'administrator') ?
                    <button onClick={addBookClick} className="add-book-button">Dodaj książkę</button>
                    :
                    <button onClick={showMyBooksClick} className="add-book-button">Moje książki</button>
                }

                {showForm && <AddBook closeForm={closeForm}/>}
                {showMyBooks && <MyBooks closeMyBooks={closeMyBooks}/>}


            </div>
        </div>


    </>
}
