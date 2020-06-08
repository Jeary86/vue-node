const createError = require('http-errors');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const setHead = require('./src/common/head');
const session = require('express-session');



const app = express();

const router = express.Router();
const users = require('./routes/index');


app.use(session({
    secret: 'test secret',
    cokkie: { maxAge: 60 * 1000 * 300 } //过期时间 ms
}))

// view engine setup
app.engine('html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', setHead); //设置白名单,等一些请求头

app.use('/api/', users(router));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//
// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
