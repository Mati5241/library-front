import "./MainPage.css"
import {BooksList} from "../BookList/BooksList";




export const MainPage = ({userStatus}) => {



    return <>

        <BooksList userStatus={userStatus}/>




    </>
}
