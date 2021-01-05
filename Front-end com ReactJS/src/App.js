import React, {useState, useEffect} from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'


function App() {
    const [projects, setProjects] = useState([])

    // useState retorn um array com 2 posicoes
    // 1. variavel com o seu valor incial
    //2. uma funcao para att o seu valor
    useEffect(() => {
        api.get('repositories').then(response => {
            setProjects(response.data)
        })
    }, [])

        async function handleAddProject() {
            //setProjects([...projects, `Novo projeto ${Date.now()}`])
            
            const reponse = await api.post('repositories',{
                title: `Novo projeto ${Date.now()}`,
                url: "https://github.com/LeonardoCHb/Projeto_Pizzaria.git",
                techs: [
                Node.js,
                React,
                Bootstrap
                ],
            })

            const project = response.data

            setProjects([...projects,project])
        }
    return (
    <>
    <Header title="Projects"/>
    

    <ul>
        {projects.map(projects => <li key={projects.id}>{projects.title}</li>)}
    </ul>

    <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
    )
}

export default App