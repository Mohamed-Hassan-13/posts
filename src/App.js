import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Additem, Deleteitem, EditItem, getallposts } from "./reducers";

function App() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallposts());
  }, []);
  const [key, setKey] = useState("Save");
  const [editid, seteditid] = useState("");

  const allData = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      if (editid > 0) {
        dispatch(EditItem({ title: inputValue, id: editid }));
        setKey("Save");
        seteditid("");
      } else {
        dispatch(Additem({ title: inputValue, id: allData.length + 1 }));
      }
      setInputValue("");
    }
  };
  const handleDelete = (id) => {
    dispatch(Deleteitem(id));
  };
  const handleEdit = (id, title) => {
    setInputValue(title);
    seteditid(id);
    setKey("Ubdtae");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            padding: "10px",
            margin: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
          }}
        >
          {key}
        </button>
      </form>
      <div>
        {status === "loading" ? (
          <h1>Loading...</h1>
        ) : allData.length > 0 ? (
          allData.map((item, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(item.id, item.title)}
                >
                  {item.title}
                </span>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#dc3545",
                    fontSize: "40px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(item.id)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>{error}</h1>
        )}
      </div>
    </div>
  );
}

export default App;
