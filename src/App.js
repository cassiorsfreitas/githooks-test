/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( async () => {
    const response = await fetch("https://api.github.com/users/cassiorsfreitas/repos")
    const data = await response.json()

    setRepositories(data)
  }, [])

  useEffect( () => {
    const filtered = repositories.filter(repo => repo.favorite)

    document.title = `You have ${filtered.length} favorites`
  })

  function handleFavorite(id) {
    const newRepositories = repositories.map( repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories)
  }


  return (
    <ul>
      {repositories.map( repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>Added</span>}
          <button onClick={() => handleFavorite(repo.id)}>Bookmarks</button>
          </li>
      ))}
    </ul>
  );
}

export default App;
