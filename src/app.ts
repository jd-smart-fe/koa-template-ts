import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as koaStatic from 'koa-static';
import * as views from 'koa-views';
import { index } from './routes/index';
import { users } from './routes/users';

import koaOnerror = require('koa-onerror');

const app = new Koa();

// error handler
koaOnerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  }),
);

// logger
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes());
app.use(users.routes());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
