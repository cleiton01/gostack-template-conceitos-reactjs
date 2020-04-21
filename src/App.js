import React, {useState, useEffect }from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
  
  useEffect( () => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    });
  }, [] );

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url:"teste url",
      techs: "node, java, axios"
    });
    
    console.log(response);
    const project = response.data;

    setProjects([ ...projects, project ]);
  }

  async function handleRemoveRepository(id) {
    
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status == 400) {
        console.log("repositorio nao existe");
      }else{
        const repoUpdate = projects.filter(repo => repo.id != id);
        setProjects(repoUpdate);
      }
    });
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            projects.map( project => 
               
                <li key={project.id}> {project.title} 
                  <button 
                    onClick={() => handleRemoveRepository(project.id)}>
                    Remover 
                  </button>
                </li>
              )
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
