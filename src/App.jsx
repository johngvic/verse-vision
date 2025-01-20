import { useEffect, useState, useMemo } from 'react'
import { BibleAPIClient } from './api/BibleAPIClient'
import BookPicker from './components/BookPicker'
import './App.css'

function App() {
  const client = useMemo(() => new BibleAPIClient(), []);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const books = await client.getBooks();
      setBooks(books);
    }

    fetchData();

    return () => {
      setIsLoading(false);
    }
  }, [client]);

  return (
    <>
      {isLoading ? <p>Loading...</p> : <BookPicker books={books} />}
    </>
  )
}

export default App
