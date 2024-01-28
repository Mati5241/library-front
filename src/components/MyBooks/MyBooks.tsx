import './MyBooks.css'
import {useState} from "react";

export const MyBooks = ({closeMyBooks}) => {


    const [myBooks, setMyBooks] = useState([]);


    const userId = localStorage.getItem('id');


    const refresh = async () => {

        const res = await fetch(`http://localhost:3001/mybooks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });

        const {data} = await res.json();


        setMyBooks(data);

    };

    refresh()


    // const [form, setForm] = useState({
    //     title: '',
    //     isbn: '',
    //     autor: '',
    // })


    // const sendForm = async (e) => {
    //     e.preventDefault()
    //
    //
    //     await fetch(`http://localhost:3001/addbook`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(form),
    //     });
    //
    //     closeForm()
    // }


    // const updateForm = (key: string, value) => {
    //
    //     setForm(form => ({
    //         ...form,
    //         [key]: value,
    //     }));
    // }


    return <>

        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">


                <h1>Moje książki</h1>
                <br/>

                <ul>


                    {myBooks.map((book) => (
                        <>
                            <li key={book.id}>

                                {book.name}
                                <button
                                    className="give-back-button"
                                    onClick={async (e) => {
                                        e.preventDefault()

                                        if (!window.confirm(`Potwierdź usunięnie książki ${book.name}`)) {
                                            return;
                                        }
                                        const res = await fetch(`http://localhost:3001/giveback/${book.id}`, {
                                            method: 'DELETE',
                                        });
                                        if ([400, 500].includes(res.status)) {
                                            const error = await res.json();
                                            alert(`Error: ${error.message}`);
                                            return;
                                        }

                                    }}
                                >
                                    Oddaj
                                </button>
                            </li>

                        </>
                    ))
                    }

                </ul>

                <button onClick={closeMyBooks} className="close-filter-button">Zamknij</button>

            </div>

        </div>

    </>

}
