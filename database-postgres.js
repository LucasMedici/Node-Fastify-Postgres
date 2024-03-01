import {randomUUID} from 'node:crypto'
import {sql} from './db.js'

export class DatabasePostgres {



    async list(search) {
        let videos 

        if(search) {
            videos = await sql`select * from videos where title ilike ${'%'+search+'%'}`
        } else {
            videos = await sql`select * from videos`
        }

        return videos
    }
 

    async create(video) {
        const videoId = randomUUID()

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${video.title}, ${video.description}, ${video.duration})`

      
    }


    async update(id, video) {

        await sql`update videos set title = ${video.title}, description = ${video.description}, duration = ${video.duration} where id = ${id}`
      
    }


    async delete(id) {
    
        await sql`delete from videos where id = ${id}`

    }
}