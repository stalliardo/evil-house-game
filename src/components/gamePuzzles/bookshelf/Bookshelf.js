import { FOYER_TEXT } from '../../../../gameUtils/consts';
import styles from './Bookshelf.module.css';
import BookItem from './BookItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { earthsEnchantmentBookshelfPuzzle } from '../../../../gameUtils/puzzles/bookshelf';

const Bookshelf = () => {

  const [selectedBook, setSelctedBook] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [showBookSelection, setShowBookSelection] = useState(true);
  const [title, setTitle] = useState("Pick a book");
  const [selectedPage, setSelectedPage] = useState(0);
  const [bookData, setBookData] = useState({});

  const level = useSelector((state) => state.gameState.levelData.level);

  const onBookSelected = (book) => {
    setShowBookSelection(false);
    setSelctedBook(book);
  }

  useEffect(() => {
    switch (level) {
      case "foyer": {
        setBookData(earthsEnchantmentBookshelfPuzzle);
      }
    }
  }, [level])

  useEffect(() => {
    if (selectedBook) {
      setTitle("");
    } else {
      setTitle("Pick a book");
    }

    return () => {
      setSelectedPage("")
      setDisplayText("");
    }
  }, [selectedBook]);


  const handleBackPressed = () => {
    if (selectedBook) {
      setSelctedBook(false);
      setShowBookSelection(true);
    }
  }

  const handlePageEntered = (e) => {

    e.preventDefault();


    if (selectedBook === bookData.book) {
      if (selectedPage === bookData.cluePage) {
        setDisplayText(bookData.clue)
      } else if (selectedPage === bookData.completionPage) {
        setDisplayText(bookData.completionText);
      } else {
        setDisplayText("Nothing useful here.")
      }
    } else {
      setDisplayText("Nothing useful here.")
    }

    setSelectedPage("");
  }

  const handleChange = (e) => {
    setDisplayText("");
    setSelectedPage(e.target.value);
  }

  return bookData ? (
    <div className={styles.container}>
      <h2>{title}</h2>
      {
        selectedBook && <button onClick={handleBackPressed}>Back</button>
      }

      <div className={styles.bookSelectContainer}>

        {
          showBookSelection ?
            bookData?.books?.map((book) => (
              <BookItem key={book} title={book} onBookSelected={onBookSelected} />
            ))

            : selectedBook ?
              <div>
                <h2>{selectedBook}</h2>
                <form className={styles.inputContainer} onSubmit={handlePageEntered}>
                  <label>Enter a page number</label>
                  <input type='number' min="0" max="1000" value={selectedPage} autoFocus onChange={handleChange} />
                  <button type='submit'>Enter</button>
                </form>


                {
                  displayText && <div className={styles.textContainer}>
                    <pre>{displayText}</pre>
                  </div>
                }
              </div> :
              null
        }
      </div>
    </div>
  ) : null
}

export default Bookshelf;


// Hnadling the various states of results

// 1 - wrong boo and page - returns "Theres nothing useful"
// 2 - Right book and page - stage 1 - They enter page 13 - This could return some text about counting the number of hands ie 13 * 2 = 26(page 26)
// 3 - Right book correct completeion page ie page 26 - Well done Youve solved the puzzle and retrieved the "Opal Key"



// How to make this dynamic?
// Need the books array
// Then book title
// The page number
// An some sort of callback
// Again, usng redux will be a problem because of stroing the callback in then state