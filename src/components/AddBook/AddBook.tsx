import './AddBook.css'
import {useState} from "react";

export const AddBook = ({closeForm}) => {


    const [form, setForm] = useState({
        title: '',
        isbn: '',
        autor: '',
    })


    const sendForm = async (e) => {
        e.preventDefault()


        await fetch(`http://localhost:3001/addbook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        closeForm()
    }


    const updateForm = (key: string, value) => {

        setForm(form => ({
            ...form,
            [key]: value,
        }));
    }


    return <>

        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">


                <h1>Dodaj książkę</h1>
                <br/>
                <form onSubmit={sendForm}>
                    Tytuł
                    <input
                        className="input-text"
                        type='text'
                        onChange={e => updateForm('title', e.target.value)}
                    />
                    <br/><br/>

                    ISBN
                    <input
                        className="input-text"
                        type='text'
                        onChange={e => updateForm('isbn', e.target.value)}
                    />
                    <br/><br/>

                    Autor
                    <input
                        className="input-text"
                        type='text'
                        onChange={e => updateForm('autor', e.target.value)}
                    />
                    <br/><br/>

                    <input className="add-button" type="submit" value="Dodaj"/>

                </form>

                <button onClick={closeForm} className="close-filter-button">Zamknij</button>

            </div>

        </div>

    </>

}
