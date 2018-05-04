'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.insertProfile=insertProfile;exports.findOneByID=findOneByID;exports.auth=auth;var _dotenv=require('dotenv');var _dotenv2=_interopRequireDefault(_dotenv);var _sha=require('sha1');var _sha2=_interopRequireDefault(_sha);var _jsonwebtoken=require('jsonwebtoken');var jwt=_interopRequireWildcard(_jsonwebtoken);var _profile=require('./profile.query');var _device=require('../device/device.service');var _pgPromise=require('pg-promise');var _db=require('../../db/db');var _db2=_interopRequireDefault(_db);var _errorHandler=require('../../handlers/errorHandler');var _errorHandler2=_interopRequireDefault(_errorHandler);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}if(process.env.NODE_ENV==='development'){_dotenv2.default.config()}async function insertProfile(profile){profile.password=(0,_sha2.default)(profile.password);const insertProf=new _pgPromise.PreparedStatement('insert-profile',_profile.CREATE_PROFILE);insertProf.values=[profile.login,profile.password,profile.type];try{return await _db2.default.one(insertProf)}catch(error){throw error}}async function findOneByID(id){const findone=new _pgPromise.PreparedStatement('find-one-by-id',_profile.FINDONE_BY_ID,[id]);try{return await _db2.default.one(findone)}catch(error){throw error}}const secret=process.env.JWT_SECRET;async function auth(credential,password,deviceId,type){const loginUser=new _pgPromise.PreparedStatement('login-user',_profile.FINDONE_BY_LOGIN,[credential,(0,_sha2.default)(password)]);try{let profile=await _db2.default.one(loginUser);await(0,_device.deviceAssignment)(profile,deviceId);return jwt.sign({profile},secret,{expiresIn:'365d'})}catch(error){throw new _errorHandler2.default('Usu\xE1rio e/ou senha inv\xE1lidos')}}