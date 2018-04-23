"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
exports.users = router;
router.prefix('/users');
router.get('/', (ctx, next) => {
    ctx.body = 'this is a users response!';
});
router.get('/bar', (ctx, next) => {
    ctx.body = 'this is a users/bar response';
});
