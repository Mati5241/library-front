import {useState} from "react";
import "./MainPage.css"
import {BooksList} from "../BookList/BooksList";
import {AddBook} from "../AddBook/AddBook";



export const MainPage = ({userStatus}) => {




    // const [selectedPage, setSelectedPage] = useState('availableStudents');
    // const [classButton, setClassButton] = useState('hr-red-left')
    // const [classTextMenuFirst, setClassTextMenuFirst] = useState('choose-page-button-selected')
    // const [classTextMenuSecond, setClassTextMenuSecond] = useState('choose-page-button')
    //
    //
    //
    // const selectMenuFirst = () => {
    //     setClassButton(classButton => 'hr-red-left')
    //     setSelectedPage(selectedPage => 'availableStudents')
    //     setClassTextMenuFirst(classTextMenuFirst => 'choose-page-button-selected')
    //     setClassTextMenuSecond(classTextMenuSecond => 'choose-page-button')
    // };
    //
    // const selectMenuSecond = () => {
    //     setClassButton(classButton => 'hr-red-right')
    //     setSelectedPage(selectedPage => 'toTalk')
    //     setClassTextMenuFirst(classTextMenuFirst => 'choose-page-button')
    //     setClassTextMenuSecond(classTextMenuSecond => 'choose-page-button-selected')
    // };


    return <>
        {/*<div id="page">*/}

        {/*    /!*<div className="menu-div">*!/*/}
        {/*    /!*    <span onClick={selectMenuFirst} className={classTextMenuFirst}>Dostępni kursanci</span>*!/*/}
        {/*    /!*    <span onClick={selectMenuSecond} className={classTextMenuSecond}>Do rozmowy</span>*!/*/}

        {/*    /!*    <br/>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    <hr className={classButton}/>*/}
        {/*    <hr className="hr-long"/>*/}

        {/*    <div className="menu-div">*/}
        {/*        <input type="search" id="input-search" disabled value="🔎 Szukaj..."/>*/}
        {/*        <br/>*/}

        {/*    </div>*/}
        {/*    <hr className="hr-short"/>*/}

        {/*</div>*/}
        <BooksList userStatus={userStatus}/>




    </>
}
