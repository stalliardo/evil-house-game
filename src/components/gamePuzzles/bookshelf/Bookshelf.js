import { FOYER_TEXT } from '../../../../gameUtils/consts';
import styles from './Bookshelf.module.css';
import BookItem from './BookItem';
import { useEffect, useState } from 'react';

const Bookshelf = () => {

  const [selectedBook, setSelctedBook] = useState("");
  const [showBookSelection, setShowBookSelection] = useState(true);
  const [title, setTitle] = useState("Pick a book");
  const [selectedPage, setSelectedPage] = useState(0);

  const onBookSelected = (book) => {
    setShowBookSelection(false);
    setSelctedBook(book);
  }

  useEffect(() => {
    if (selectedBook) {
      setTitle("Select a page");
    } else {
      setTitle("Pick a book");
    }

    return () => {
      setSelectedPage("")
    }
  }, [selectedBook]);


  const handleBackPressed = () => {
    if (selectedBook) {
      setSelctedBook(false);
      setShowBookSelection(true);
    }
  }

  const handlePageEntered = (e) => {
    // now check if the book and the number is eartch enchantment and the number 
    e.preventDefault();
  }

  const handleChange = (e) => {
    setSelectedPage(e.target.value)
  }

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      {
        selectedBook && <button onClick={handleBackPressed}>Back</button>
      }

      <div className={styles.bookSelectContainer}>

        {
          showBookSelection ?
            FOYER_TEXT.BOOKSHELF_BOOK_TITLES.map((book) => (
              <BookItem key={book} title={book} onBookSelected={onBookSelected} />
            ))

            : selectedBook ?
              <div>
                <h2>Book: {selectedBook}</h2>
                <form className={styles.inputContainer} onSubmit={handlePageEntered}>
                  <label>Enter a page number</label>
                  <input type='number' min="0" max="1000" value={selectedPage} autoFocus onChange={handleChange} />
                  <button type='submit'>Enter</button>
                </form>
              </div> :
              null
        }
      </div>
    </div>
  )
}

export default Bookshelf;