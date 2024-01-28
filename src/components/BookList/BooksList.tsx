import './BooksList.css';
import {useState} from "react";
import {BookInfo} from "../StudentInfo/BookInfo";


export const BooksList = ({userStatus}) => {


    const [showBookInfo, setShowBookInfo] = useState('');
    const [arrow, setArrow] = useState('')
    const [showFilter, setShowFilter] = useState(false);
    const [filter, setFilter] = useState('Pokaż tylko dostępne książki');
    const [booksAll, setBooksAll] = useState([]);


    const userId = localStorage.getItem('id');


    // const [currentPage, setCurrentPage] = useState(1);
    // const [booksPerPage, setBooksPerPage] = useState(10);
    //
    //
    // const changeQuantity = (e: any) => {
    //     setBooksPerPage(e.target.value)
    // }
    //
    // const studentsPreviousPage = (e: any) => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // }
    //
    // const studentsNextPage = (e: any) => {
    //     if (indexOfLastBook < booksAll.length) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // }
    //
    //
    // const indexOfLastBook = (currentPage * booksPerPage);
    // const indexOfFirstBook = indexOfLastBook - booksPerPage;



    const refresh = async () => {
        const res = await fetch(`http://localhost:3001/bookslist`)
        const {data} = await res.json();

        if (filter === 'Pokaż tylko dostępne książki') {
            const filteredArray = []
            data.map((i) => {
                if (i.borrow === 'Nie') {
                    filteredArray.push(i)
                }
            })
            setBooksAll(filteredArray)
        } else {
            setBooksAll(data)
        }
    };
    refresh();


    const closeFilter = () => {
        setShowFilter(false)
    }

    const filterButtonClick = () => {
        setShowFilter(true);
    }


    const submitFormFilter = (e) => {
        e.preventDefault();
        setShowFilter(false)

    }


    const borrowBook = async (bookId) => {
        // e.preventDefault()


        await fetch(`http://localhost:3001/borrow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
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
                    <input onClick={filterButtonClick}  type="button" id="filter-button" value="Filtrowanie"/>
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




        {showFilter &&
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">

                    <form onSubmit={submitFormFilter}>

                        <div id="header-filter">Filtrowanie</div>

                        <br/><br/><br/><br/>

                        <div className="one-line-filter">
                            Dostępne książki<br/>
                            <select className='input-select-status' onChange={(e) => setFilter(e.target.value)}>
                               <option>Pokaż tylko dostępne książki</option>
                               <option>Pokaż wszystkie książki</option>
                           </select>
                        </div>

                        <br/>


                        <div className="buttons-filter">
                            <button
                                onClick={closeFilter}
                                id="close-filter-button">Anuluj
                            </button>
                            <input onSubmit={submitFormFilter} id="show-results-button" type="submit" value="Pokaż wyniki"/>
                            {/*<button id="show-results-button">Pokaż wyniki</button>*/}


                        </div>
                    </form>
                </div>
            </div>
        }





        {/*<div id="foot">*/}

        {/*    <label>Ilość elementów</label>*/}
        {/*    <select defaultValue="10" onChange={changeQuantity} id='select-quantity'>*/}
        {/*        <option value="5">5</option>*/}
        {/*        <option value="10">10</option>*/}
        {/*        <option value="15">15</option>*/}
        {/*    </select>*/}

        {/*    {(booksAll.length > indexOfLastBook) ? indexOfLastBook : booksAll.length} z {booksAll.length}*/}
        {/*    <button onClick={studentsPreviousPage}*/}
        {/*            className={(currentPage === 1) ? 'previous-next-button-disabled' : 'previous-next-button'}>⮜*/}
        {/*    </button>*/}
        {/*    <button onClick={studentsNextPage}*/}
        {/*            className={(booksAll.length < indexOfLastBook) ? 'previous-next-button-disabled' : 'previous-next-button'}>⮞*/}
        {/*    </button>*/}
        {/*</div>*/}

    </>
}
