const meRouter = require('./me');
const blogsRouter = require('./blogs');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const authRouter = require('./auth');
const categoriesRouter = require('./categories');

function route(app) {
    app.use('/me', meRouter);
    app.use('/blogs', blogsRouter);
    app.use('/comments', commentsRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/categories', categoriesRouter);
}

module.exports = route;
