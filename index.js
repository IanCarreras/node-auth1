const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require('express-session')
const KnexSessionStore = require('connect-knex-session')(session)

const dbConfig = require('./data/dbConfig')
const authRouter = require("./auth/auth-router.js")
const usersRouter = require("./users/users-router.js")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(logger())
server.use(express.json())
server.use(session({
    resave: false,
    savedUninitialized: false,
    secret: 'keep it secret, keep if safe!',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24* 7,
        secure: false
    },
    store: new KnexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}))

server.use("/auth", authRouter)
server.use("/users", usersRouter)

server.use(notFound())
server.use(error())

server.listen(port, () => {
    console.log(`\n** Running on port ${port} **\n`)
})