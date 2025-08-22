import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState(null);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [createMessage, setCreateMessage] = useState("");

  const [bookTitle, setBookTitle] = useState("");
  const [borrowMessage, setBorrowMessage] = useState("");

  const [libraries, setLibraries] = useState([]);
  const [libraryName, setLibraryName] = useState("");
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [libraryError, setLibraryError] = useState("");

  const [newLibraryName, setNewLibraryName] = useState("");
  const [newLibraryLocation, setNewLibraryLocation] = useState("");
  const [createLibraryMessage, setCreateLibraryMessage] = useState("");

  const [allBooks, setAllBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookIsbn, setNewBookIsbn] = useState("");
  const [newBookCount, setNewBookCount] = useState("");
  const [newBookLibraryId, setNewBookLibraryId] = useState("");
  const [createBookMessage, setCreateBookMessage] = useState("");

  const [updateTitleToChange, setUpdateTitleToChange] = useState("");
  const [updateNewTitle, setUpdateNewTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updateIsbn, setUpdateIsbn] = useState("");
  const [updateCount, setUpdateCount] = useState("");
  const [updateLibraryId, setUpdateLibraryId] = useState("");
  const [updateBookMessage, setUpdateBookMessage] = useState("");

  const fetchLibraries = async () => {
    try {
      const res = await axios.get("http://localhost:5237/api/library");
      setLibraries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5237/api/book");
      setAllBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch all books:", err);
    }
  };

  useEffect(() => {
    fetchLibraries();
    fetchAllBooks();
  }, []);

  const loginStudent = async () => {
    try {
      setError("");
      const loginRes = await axios.post("http://localhost:5237/api/student/login", { email, password });
      const id = loginRes.data.id ?? loginRes.data;
      if (!id || id === 0) {
        setError("Invalid email or password");
        return;
      }
      setStudentId(id);
      const studentRes = await axios.get(`http://localhost:5237/api/student/${id}`);
      if (studentRes.data) setStudent(studentRes.data);
    } catch (err) {
      console.error(err);
      setError("Login failed. Check credentials.");
    }
  };

  const createStudent = async () => {
    if (!newFullName || !newEmail || !newPassword) {
      setCreateMessage("All fields are required.");
      return;
    }
    try {
      setCreateMessage("");
      const res = await axios.post("http://localhost:5237/api/student/create", {
        fullName: newFullName,
        email: newEmail,
        password: newPassword,
        studentBooks: [],
      });
      setCreateMessage(`Student created! ID: ${res.data.id}`);
      setNewFullName("");
      setNewEmail("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setCreateMessage("Failed to create student.");
    }
  };

  const borrowBook = async () => {
    if (!bookTitle) return;
    try {
      setBorrowMessage("");
      const res = await axios.post("http://localhost:5237/api/student/borrow", {
        studentId: student.id,
        bookTitle,
      });
      
      const message = res.data;
      setBorrowMessage(message);

      if (message === "successful") {
        const studentRes = await axios.get(`http://localhost:5237/api/student/${student.id}`);
        setStudent(studentRes.data);
        setBookTitle("");
      }

    } catch (err) {
      console.error(err);
      setBorrowMessage("Failed to borrow book.");
    }
  };


  const fetchLibraryBooks = async () => {
    if (!libraryName) return;
    try {
      setLibraryError("");
      const res = await axios.get(`http://localhost:5237/api/library/${libraryName}`);
      setLibraryBooks(res.data);
    } catch (err) {
      console.error(err);
      setLibraryError("Failed to fetch library books.");
    }
  };

  const createLibrary = async () => {
    if (!newLibraryName || !newLibraryLocation) {
      setCreateLibraryMessage("All fields are required.");
      return;
    }
    try {
      setCreateLibraryMessage("");
      await axios.post("http://localhost:5237/api/library/create", {
        name: newLibraryName,
        location: newLibraryLocation,
      });
      setCreateLibraryMessage(`Library "${newLibraryName}" created successfully!`);
      setNewLibraryName("");
      setNewLibraryLocation("");
      fetchLibraries();
    } catch (err) {
      console.error(err);
      setCreateLibraryMessage("Failed to create library.");
    }
  };

  const createBook = async () => {
    if (!newBookTitle || !newBookAuthor || !newBookIsbn || !newBookCount || !newBookLibraryId) {
      setCreateBookMessage("All fields are required.");
      return;
    }
    try {
      setCreateBookMessage("");
      await axios.post("http://localhost:5237/api/book/create", {
        title: newBookTitle,
        author: newBookAuthor,
        isbn: newBookIsbn,
        count: parseInt(newBookCount),
        libraryId: parseInt(newBookLibraryId),
      });
      setCreateBookMessage(`Book "${newBookTitle}" created successfully!`);
      setNewBookTitle("");
      setNewBookAuthor("");
      setNewBookIsbn("");
      setNewBookCount("");
      setNewBookLibraryId("");
      fetchAllBooks();
    } catch (err) {
      console.error(err);
      setCreateBookMessage("Failed to create book.");
    }
  };

  const updateBook = async () => {
    if (!updateTitleToChange || !updateNewTitle || !updateAuthor || !updateIsbn || !updateCount || !updateLibraryId) {
      setUpdateBookMessage("All fields are required.");
      return;
    }
    try {
      setUpdateBookMessage("");
      await axios.put("http://localhost:5237/api/book/update", {
        titleToChange: updateTitleToChange,
        newTitle: updateNewTitle,
        author: updateAuthor,
        isbn: updateIsbn,
        count: parseInt(updateCount),
        libraryId: parseInt(updateLibraryId),
      });
      setUpdateBookMessage(`Book "${updateTitleToChange}" updated successfully!`);
      setUpdateTitleToChange("");
      setUpdateNewTitle("");
      setUpdateAuthor("");
      setUpdateIsbn("");
      setUpdateCount("");
      setUpdateLibraryId("");
      fetchAllBooks();
    } catch (err) {
      console.error(err);
      setUpdateBookMessage("Failed to update book.");
    }
  };

  const logout = () => {
    setStudent(null);
    setStudentId(null);
    setEmail("");
    setPassword("");
    setLibraryBooks([]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student</h1>
      {!student ? (
        <div>
          <h3>Login</h3>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={loginStudent}>Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <h3>Create Student</h3>
          <input placeholder="Full Name" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} />
          <input placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={createStudent}>Create Student</button>
          {createMessage && <p>{createMessage}</p>}

          <hr />

          <h1>Library</h1>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "40px" }}>
            <div style={{ minWidth: "200px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <h3>Create Library</h3>
              <input placeholder="Library Name" value={newLibraryName} onChange={(e) => setNewLibraryName(e.target.value)} />
              <input placeholder="Location" value={newLibraryLocation} onChange={(e) => setNewLibraryLocation(e.target.value)} />
              <button onClick={createLibrary}>Create Library</button>
              {createLibraryMessage && <p>{createLibraryMessage}</p>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input placeholder="Enter library name" value={libraryName} onChange={(e) => setLibraryName(e.target.value)} />
              <button onClick={fetchLibraryBooks}>Show Books</button>
              {libraryError && <p style={{ color: "red" }}>{libraryError}</p>}
              {libraryBooks.length > 0 && (
                <>
                  <h3>Books in {libraryName}</h3>
                  <ul>
                    {libraryBooks.map((b) => (
                      <li key={b.id}>{b.title} - {b.author} | Count: {b.count}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div style={{ minWidth: "220px" }}>
              <h3>All Libraries</h3>
              <ul>
                {libraries.map((lib, i) => (
                  <li key={i}>
                    {lib.name ? `${lib.name} (Id: ${lib.id})` : lib}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <h1>Books</h1>
          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "220px" }}>
              <h3>Create Book</h3>
              <input placeholder="Title" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
              <input placeholder="Author" value={newBookAuthor} onChange={(e) => setNewBookAuthor(e.target.value)} />
              <input placeholder="ISBN" value={newBookIsbn} onChange={(e) => setNewBookIsbn(e.target.value)} />
              <input placeholder="Count" value={newBookCount} onChange={(e) => setNewBookCount(e.target.value)} />
              <input placeholder="Library ID" value={newBookLibraryId} onChange={(e) => setNewBookLibraryId(e.target.value)} />
              <button onClick={createBook}>Create Book</button>
              {createBookMessage && <p>{createBookMessage}</p>}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "220px" }}>
              <h3>Update Book</h3>
              <input placeholder="Title to Change" value={updateTitleToChange} onChange={(e) => setUpdateTitleToChange(e.target.value)} />
              <input placeholder="New Title" value={updateNewTitle} onChange={(e) => setUpdateNewTitle(e.target.value)} />
              <input placeholder="Author" value={updateAuthor} onChange={(e) => setUpdateAuthor(e.target.value)} />
              <input placeholder="ISBN" value={updateIsbn} onChange={(e) => setUpdateIsbn(e.target.value)} />
              <input placeholder="Count" value={updateCount} onChange={(e) => setUpdateCount(e.target.value)} />
              <input placeholder="Library ID" value={updateLibraryId} onChange={(e) => setUpdateLibraryId(e.target.value)} />
              <button onClick={updateBook}>Update Book</button>
              {updateBookMessage && <p>{updateBookMessage}</p>}
            </div>

            <div style={{ minWidth: "300px" }}>
              <h3>All Books</h3>
              <ul>
                {allBooks.map((b) => (
                  <li key={b.id}>
                    {b.title} - {b.author} | ISBN: {b.isbn} | Count: {b.count} | Library: {b.libraryName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Welcome, {student.fullName}!</h2>
          <p>Email: {student.email}</p>

          <h3>Borrow a Book</h3>
          <input placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
          <button onClick={borrowBook}>Borrow</button>
          {borrowMessage && <p>{borrowMessage}</p>}

          <h3>Your Books:</h3>
          {student.studentBooks && student.studentBooks.length > 0 ? (
            <ul>
              {student.studentBooks.map((b) => (<li key={b.bookId}>{b.bookTitle} (ID: {b.bookId})</li>))}
            </ul>
          ) : (
            <p>No books assigned.</p>
          )}

          <button onClick={logout} style={{ marginTop: "20px" }}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
