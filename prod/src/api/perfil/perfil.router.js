'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _express=require('express');var _perfil=require('./perfil.controller');const routes=new _express.Router;routes.post('/',_perfil.criaPerfil);routes.get('/email/:email',_perfil.buscaPerfilPorEmail);exports.default=routes;