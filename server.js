import {fastify} from "fastify";
import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

// const db = new DatabaseMemory()

const db = new DatabasePostgres()


server.post('/videos' ,async (request, response) => {

    const res = request.body

    await db.create({
        title: res.title,
        description: res.description,
        duration: res.duration,
    })


    return response.status(201).send()
})



server.get('/videos' ,async (request, response) => {

    const search = request.query.search
    
    const videos = await db.list(search)

    return videos
})



server.put('/videos/:id' , async (request, response) => {
    const videoId = request.params.id

    const res = request.body

    await db.update(videoId, {
        title: res.title,
        description: res.description,
        duration: res.duration,
    })
    
    return response.status(204).send()
})



server.delete('/videos/:id' , async(request, response) => {
    const videoId = request.params.id 

    await db.delete(videoId)

    return response.status(204).send()
    
})










server.listen({port: process.env.PORT ?? 3333})