import styles from './Bookshelf.module.css';
import BookItem from './BookItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { earthsEnchantmentBookshelfPuzzle } from '../../../../gameUtils/puzzles/bookshelf';
import GameStateManager from '@/classes/GameStateManager';

const Bookshelf = () => {
  const [selectedBook, setSelctedBook] = useState("");
  const [displayBookText, setDisplayBookText] = useState("");
  const [text, setText] = useState("");
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
      setSelectedPage("");
      setDisplayBookText("");
      setText("");
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
    if (selectedPage === "") return;

    if (selectedBook === bookData.book) {
      if (selectedPage === bookData.cluePage) {
        setDisplayBookText(bookData.clue);
      } else if (selectedPage === bookData.completionPage) {
        const gameStateManager = new GameStateManager();
        const hasCompletedPuzzle = gameStateManager.hasItemForLevel({ level: bookData.level, item: bookData.completionItem[0] });

        if (hasCompletedPuzzle) {
          setText("There's nothing left.")
        } else {
          setText(bookData.completionText);
          gameStateManager.addToLevelInventory(
            {
              level: bookData.level,
              items: bookData.completionItem
            }
          )
        }
      } else {
        setText("Nothing useful here.");
      }
    } else {
      setText("Nothing useful here.");
    }

    setSelectedPage("");
  }

  const handleChange = (e) => {
    setDisplayBookText("");
    setText("");
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
                  displayBookText && <div className={styles.bookTextContainer}>
                    <pre>{displayBookText}</pre>
                  </div>
                }
                {
                  text && <div className={styles.textContainer}>
                    <p>{text}</p>
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