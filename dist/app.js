"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const json = require("koa-json");
const logger = require("koa-logger");
const koaStatic = require("koa-static");
const views = require("koa-views");
const index_1 = require("./routes/index");
const users_1 = require("./routes/users");
const koaOnerror = require("koa-onerror");
const app = new Koa();
koaOnerror(app);
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + '/public'));
app.use(views(__dirname + '/views', {
    extension: 'pug',
}));
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(index_1.index.routes());
app.use(users_1.users.routes());
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});
module.exports = app;
