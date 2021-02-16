require('dotenv').config()
const port = process.env.API_PORT;
const database = process.env.API_DATABASE;
const host = process.env.API_HOST;
const user = process.env.API_USER;
const password = process.env.API_PASSWORD;
console.log(`Your port is ${port}`);

const Pool = require('pg').Pool
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
})

const getEvents = (request, response) => {
    console.log("hey, got here!")
    pool.query('SELECT * FROM events ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEventById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        })
    }

const createEvent = (request, response) => {
    const { title, creator, date, location } = request.body

    pool.query('INSERT INTO events (title, creator, date, location) VALUES ($1, $2, $3, $4)', [title, creator, date, location], (error, results) => {
        if (error) {
        throw error
        }
        response.status(201).send(`Event added with ID: ${results.id}`)
    })
}

const updateEvent = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, creator, date, location } = request.body

    pool.query(
        'UPDATE events SET title = $1, creator = $2 , date = $3, location = $4, WHERE id = $5',
        [title, creator, date, location, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Event modified with ID: ${id}`)
        }
    )
}

const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Event deleted with ID: ${id}`)
    })
}

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
}

// require('dotenv').config()
// const port = process.env.API_PORT;
// const database = process.env.API_DATABASE;
// const host = process.env.API_HOST;
// const user = process.env.API_USER;
// const password = process.env.API_PASSWORD;
// console.log(`Your port is ${port}`);

// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: user,
//     host: host,
//     database: database,
//     password: password,
//     port: port,
// })
// console.log(Pool)
// console.log(pool)
// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//         })
//     }

// const createUser = (request, response) => {
//     const { name, email } = request.body

//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//         throw error
//         }
//         response.status(201).send(`User added with ID: ${results.id}`)
//     })
// }

// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body

//     pool.query(
//         'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//         [name, email, id],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`User modified with ID: ${id}`)
//         }
//     )
// }

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

// module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
// }