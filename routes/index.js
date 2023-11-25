const meRouter = require('./me');
const blogsRouter = require('./blogs');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const authRouter = require('./auth');

function route(app) {
    app.use('/me', meRouter);
    app.use('/blogs', blogsRouter);
    app.use('/comments', commentsRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
}

module.exports = route;
