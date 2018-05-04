'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.createProfile=createProfile;exports.getProfileByID=getProfileByID;exports.respondToServer=respondToServer;exports.authenticate=authenticate;var _profile=require('./profile.service');var _costumer=require('../costumer/costumer.service');var _facebook=require('../facebook/facebook.service');async function createProfile(req,res,next){let profile=req.body;try{profile.id_profile=await(0,_profile.insertProfile)(profile);profile.id_profile=profile.id_profile.id;console.log('profile -> ',profile);let costumer=await(0,_costumer.createCostumer)(profile);if(profile.type===2){costumer=await(0,_facebook.createFacebook)(profile);res.json(costumer)}else{res.json(costumer)}}catch(error){console.log('eeee->',error);next(error)}}async function getProfileByID(req,res,next){const id=req.params.id;try{res.json((await(0,_profile.findOneByID)(id)))}catch(error){next(error)}}function respondToServer(req,res){res.status(200).json({message:'Ok'})}async function authenticate(req,res,next){var _req$body=req.body;const login=_req$body.login,password=_req$body.password,device_id=_req$body.device_id,type=_req$body.type;try{let token=await(0,_profile.auth)(login,password,device_id,type);res.json({token:token})}catch(error){next(error)}}