import { useNavigate } from 'react-router-dom'

function BookPicker({ books }) {
  const navigate = useNavigate();

  return (
    <div>
      {books.map(book => <p key={book.abbrev.pt} onClick={() => navigate(`${book.abbrev.pt}/1`)}>{book.name}</p>)}
    </div>
  );
}

export default BookPicker;
