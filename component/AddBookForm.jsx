import { useState } from "react"

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    language: "",
    country: "",
    rating: "",
    summary: "",
    coverImageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const payload = {
      ...formData,
      publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
      genre: formData.genre ? [formData.genre] : []
    };

    try {
      console.log("Submitting payload:", payload);

      const response = await fetch(
        "https://backend-books-beta.vercel.app/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add book: ${errorText}`);
      }

      const data = await response.json();
      console.log("Book added successfully:", data);

      setFormData({
        title: "",
        author: "",
        publishedYear: "",
        genre: "",
        language: "",
        country: "",
        rating: "",
        summary: "",
        coverImageUrl: ""
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Book</h1>

      <label>Title</label><br />
      <input type="text" name="title" value={formData.title} onChange={handleChange} /><br />

      <label>Author</label><br />
      <input type="text" name="author" value={formData.author} onChange={handleChange} /><br />

      <label>Published Year</label><br />
      <input type="number" name="publishedYear" value={formData.publishedYear} onChange={handleChange} /><br />

      <label>Genre</label><br />
      <select name="genre" value={formData.genre} onChange={handleChange}>
        <option value="">Select Genre</option>
        <option value="Non-fiction">Non-fiction</option>
        <option value="Business">Business</option>
        <option value="Autobiography">Autobiography</option>
      </select><br />

      <label>Language</label><br />
      <input type="text" name="language" value={formData.language} onChange={handleChange} /><br />

      <label>Country</label><br />
      <input type="text" name="country" value={formData.country} onChange={handleChange} /><br />

      <label>Rating</label><br />
      <input type="text" name="rating" value={formData.rating} onChange={handleChange} /><br />

      <label>Summary</label><br />
      <input type="text" name="summary" value={formData.summary} onChange={handleChange} /><br />

      <label>Cover Image Url</label><br />
      <input type="text" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} /><br />

      <button type="submit">Submit</button>
    </form>
  )
}

export default AddBookForm
