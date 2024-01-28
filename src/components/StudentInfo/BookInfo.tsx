import './BookInfo.css'

export const BookInfo = ({book}) => {


    return <div className="book-info">

        <table>
            <tr>
                <td className="td-info-name">Autor</td>
                <td className="td-info-name">ISBN</td>

            </tr>
            <tr>
                <td className="td-info">{book.autor}</td>
                <td className="td-info">{book.ISBN}</td>
            </tr>
        </table>

    </div>
}
