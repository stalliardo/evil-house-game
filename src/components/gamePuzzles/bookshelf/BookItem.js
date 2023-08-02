import styles from './Bookshelf.module.css';

const BookItem = ({title, onBookSelected}) => {

    const onBookItemSelected = () => {
        onBookSelected(title);
    }

  return (
    <div className={styles.bookItem} onClick={onBookItemSelected}>{title}</div>
  )
}


export default BookItem;



// when book selected close the selection window
// Pass the title across to the page select comp
// Title select page
// input
// display message when page has been selceted
// also need back buttons?