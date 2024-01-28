import './BooksList.css';
import {useState} from "react";


export const BooksList = ({userStatus}) => {

    const userId = localStorage.getItem('id');


    const [booksAll, setBooksAll] = useState([]);
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


        setBooksAll(data)

    };

    refresh();

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


// const books: {}[] = booksAll.slice(indexOfFirstBook, indexOfLastBook);


    return <>
        <div className="page-div">
            <div id="students-list">

                <ul>
                    {booksAll.map((item) => (
                        <>
                            <li key={item.id}>
                                <span className="student">{item.name}</span>

                                {(userStatus === 'administrator')
                                    ?
                                    <button
                                        className="class-button"
                                        onClick={async (e) => {
                                            e.preventDefault()

                                            if (!window.confirm(`Potwierdź usunięnie książki ${item.name}`)) {
                                                return;
                                            }
                                            const res = await fetch(`http://localhost:3001/delete/${item.id}`, {
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
                                        onClick={() => borrowBook(item.id)}
                                    >
                                        Wypożycz
                                    </button>
                                }

                            </li>
                            <hr/>
                        </>
                    ))}
                </ul>


            </div>
        </div>

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
