// app.js
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    throw new Error('resource not found');
});

app.use((req, res, next) => {
    logger.error(err.message, { ...err, stack: err.stack });
    return res.json(err.toJSON());
})

export default app;
