import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://randomuser.me/api/?page=${page}&results=10`
        );
        setUsers((users) => [...users, ...response.data.results]);
        setErrorMsg("");
      } catch (error) {
        setErrorMsg("Error while loading data. Try again later.", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className="main-section">
      <Header />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <div className="load-more">
        <button onClick={loadMore} className="btn-grad">
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
      <UsersList users={users} />
    </div>
  );
}

export default App;
