import './BooksList.css';
import {useState} from "react";
import {BookInfo} from "../BookInfo/BookInfo";


export const BooksList = ({userStatus}) => {


    const [showBookInfo, setShowBookInfo] = useState('');
    const [arrow, setArrow] = useState('')
    // const [showFilter, setShowFilter] = useState(false); todo
    // const [filter, setFilter] = useState('Pokaż tylko dostępne książki'); todo
    const [booksAll, setBooksAll] = useState([]);


    const userId = localStorage.getItem('id');





    const refresh = async () => {
        const res = await fetch(`http://localhost:3001/bookslist`)
        const {data} = await res.json();
        setBooksAll(data)
    };
    refresh();


    // const closeFilter = () => {
    //     setShowFilter(false)
    // } //todo

    const filterButtonClick = () => {
        // setShowFilter(true); todo
    }


    // const submitFormFilter = (e) => {
    //     e.preventDefault();
    //     setShowFilter(false)
    //
    // } todo


    const borrowBook = async (bookId) => {
        // e.preventDefault()

        const token = localStorage.getItem('token');

        if (!window.confirm(`Czy chcesz wypożyczyć tę książkę?`)) {
            return;
        }


        await fetch(`http://localhost:3001/borrow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({
                bookId: bookId,
            }),
        });


    }


    const showMore = (id) => {

        if (showBookInfo === '') {
            setShowBookInfo(showBookInfo => id)
            setArrow(arrow => id)
        } else if (showBookInfo === id) {
            setShowBookInfo(showBookInfo => '')
            setArrow(arrow => '')
        } else {
            setShowBookInfo(showBookInfo => id)
            setArrow(arrow => id)
        }
    }


// const books: {}[] = booksAll.slice(indexOfFirstBook, indexOfLastBook);


    return <>
        <div className="page-div">
            <div className='books-list'>

                <div className="menu-div">
                    <input type="search" id="input-search" disabled value="🔎 Szukaj..."/>
                    <input onClick={filterButtonClick} type="button" id="filter-button" value="Filtrowanie"/>
                    <br/>

                </div>
                <hr className="hr-short"/>

                <ul>
                    {booksAll.map((book) => (
                        <>
                            <li key={book.id}>

                                <span className="book">{book.name}</span>


                                <span onClick={() => showMore(book.id)}
                                      className="show-more-button">{(arrow === book.id) ? '⮝' : '⮟'}</span>


                                {(userStatus === 'administrator')
                                    ?
                                    <button
                                        className="class-button"
                                        onClick={async (e) => {
                                            e.preventDefault()

                                            if (!window.confirm(`Potwierdź usunięnie książki ${book.name}`)) {
                                                return;
                                            }
                                            const res = await fetch(`http://localhost:3001/delete/${book.id}`, {
                                                method: 'DELETE',
                                            });
                                            if ([400, 500].includes(res.status)) {
                                                const error = await res.json();
                                                alert(`Error: ${error.message}`);
                                                return;
                                            }

                                        }}
                                    >
                                        Usuń
                                    </button>
                                    :
                                    <button
                                        className="class-button"
                                        onClick={() => borrowBook(book.id)}
                                    >
                                        Wypożycz
                                    </button>

                                }
                                {(showBookInfo === book.id) ? <BookInfo book={book}/> : false}
                            </li>
                            <hr/>
                        </>
                    ))}
                </ul>


            </div>
        </div>


        {/*{showFilter &&*/}
        {/*    <div className="modal">*/}
        {/*        <div className="overlay"></div>*/}
        {/*        <div className="modal-content">*/}

        {/*            <form onSubmit={submitFormFilter}>*/}
        {/*                <br/>*/}
        {/*                <div id="header-filter">Filtrowanie</div>*/}

        {/*                <br/><br/><br/><br/>*/}

        {/*                <div className="one-line-filter">*/}

        {/*                    <select className='input-select-status' onChange={(e) => setFilter(e.target.value)}>*/}
        {/*                        <option>Pokaż tylko dostępne książki</option>*/}
        {/*                        <option>Pokaż wszystkie książki</option>*/}
        {/*                    </select>*/}
        {/*                </div>*/}

        {/*                <br/>*/}


        {/*                <div className="buttons-filter">*/}
        {/*                    <button*/}
        {/*                        onClick={closeFilter}*/}
        {/*                        id="close-filter-button">Anuluj*/}
        {/*                    </button>*/}
        {/*                    <input onSubmit={submitFormFilter} id="show-results-button" type="submit"*/}
        {/*                           value="Pokaż wyniki"/>*/}


        {/*                </div>*/}
        {/*            </form>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*}*/}



    </>
}
