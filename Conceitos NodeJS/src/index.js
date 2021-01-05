const express = require('express')
/*Importa um id unico universal do microservico uuidv4 */
const {uuid, isUuid} = require('uuidv4')
const { request } = require('express')

const app = express()

//o express n le json direto, tem que declarar 
app.use(express.json())

/*
    Metodos HTTP:
    GET => Buscar infor do 👽Backend
    POST => Criar uma info no 👽Backend
    PUT/PATCH => Alterar uma info no 👽Backend
    DELETE => Deletar uma info no 👽Backend
*/
/*
    Tipos de parametros(Formas do front end enviar uma requisicao)

    Query Params:Filtros e paginacao
    Route Params:Identificar recursos (Att/Deletar)
    Request Body: Conteudo na hora de criar ou editar um recurso (JSON)

*/
/*
  * Middleware:
    *Interceptador de requisicoes que interrompe totalmente a requisicao ou alterar dados da requisicao  
    *


*/
/*
Metodo do express com parametros:
 Qual endereco voce quer observar (projects)
 E os outros dois parametros requisicao e respostas
 */

const projects = []

function logRequests(request, response, next) {
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.log(logLabel)

   
    return next()
}

function validateProjectId(request,response, next){
    const { id } = request.params

    if(!isUuid(id)){
        return response.status(400).json({erro: 'Invalid project ID.'})
    }

    return next()
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (resquest,response) => {
    const {title} = resquest.query

    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects
  
// JSON sempre deve retornar um objeto ou array!
    return response.json(results)
})

app.post('/projects',(resquest,response) => {
    const {title, owner} = resquest.body

    const project = {id: uuid(),title, owner}
    
    projects.push(project)

    return response.json(project)
})

// Como voce quer att uma info especifica vc deve informar um :id
app.put('/projects/:id',(resquest,response) => {
    const {id} = resquest.params
    const {title, owner} = resquest.body
    
    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return response.status(400).json({ erro:"Project not Found"})
    }


    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex]=project

    return response.json(project)
})
// Assim como no put vc deve informar o id
app.delete('/projects/:id',(request,response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return response.status(400).json({ erro:"Project not Found"})
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})



app.listen(3334, () => {
//toda vez que o servidor for colocado no ar
    console.log('👽Backend started!👽')
})