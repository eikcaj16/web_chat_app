import contactsRouter from './users-router.js'


export default (app) => {
    app.use('/', contactsRouter)
}