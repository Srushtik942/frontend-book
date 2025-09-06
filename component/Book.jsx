import useFetch from "../useFetch";

const Book = () =>{
    const {data, loading,error} = useFetch("https://backend-books-beta.vercel.app/books");
    console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    const books = data?.book || [];

    // shoe Dog book

    const shoeDog = books.find((b)=> b.title === "Shoe Dog");

    // books by J.K. Rowling
    const bookByAuthor = books.find((b)=> b.author === 'J.K. Rowling')


    console.log(books)
    return(
        <div>
            <h1>All Books</h1>
            <ul>
                {books.map((book)=>(
                    <li>{book.title}</li>
                ))}
            </ul>
        {shoeDog && (
        <div>
         <h1>{shoeDog.title}</h1>
         <h4>Author:<span>{shoeDog.author}</span></h4>
         <h4>Release Year: <span>{shoeDog.publishedYear}</span></h4>
         <h4>Genre: <span>{shoeDog.genre}</span></h4>
        </div>
        )}

        {bookByAuthor && (
            <div>
                <h1>Books by J.K.Rowling</h1>
                 <ul>
                    <li>{bookByAuthor.title}</li>
                 </ul>
            </div>
        )}
        </div>
    )
}

export default Book;