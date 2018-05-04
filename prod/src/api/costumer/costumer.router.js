'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _costumer=require('./costumer.controller');var _express=require('express');var _express2=_interopRequireDefault(_express);var _jwt=require('../middlewares/jwt.middleware');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const router=_express2.default.Router();router.post('/',_jwt.jwtMiddleware,_costumer.UpdateProfileReq);router.get('/',_jwt.jwtMiddleware,_costumer.getCostumerData);exports.default=router;