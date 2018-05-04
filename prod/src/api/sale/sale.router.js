'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _express=require('express');var _express2=_interopRequireDefault(_express);var _jwt=require('../middlewares/jwt.middleware');var _jwt2=_interopRequireDefault(_jwt);var _sale=require('./sale.controller');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const router=_express2.default.Router();// router.post('/', CreateSaleReq)
// router.put('/:id', jwtMiddleware, CheckoutSale)
// router.get('/', jwtMiddleware, GetSales)
router.post('/v2/',_sale.CreateSaleReqV2);exports.default=router;