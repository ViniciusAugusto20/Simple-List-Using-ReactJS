import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositorys(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo projeto ${Date.now()}`,
      url: "https://www.google.com.br",
      techs: ["NodeJs", "ReactJS"],
    });

    setRepositorys([...repositorys, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositorys(repositorys.filter((repository) => repository.id !== id));
  }

  return (
    <>
      <div>
        <ul data-testid="repository-list">
          {repositorys.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))}
        </ul>

        <p />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}

export default App;
