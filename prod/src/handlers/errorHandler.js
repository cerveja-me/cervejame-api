'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _httpStatus=require('http-status');var _httpStatus2=_interopRequireDefault(_httpStatus);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}class ErrorHandler extends Error{constructor(message,status=_httpStatus2.default.INTERNAL_SERVER_ERROR,isPublic=false,codigoErro){super(message);this.text_message=message;this.codigo_erro=codigoErro;this.status=status;this.isPublic=isPublic}}exports.default=ErrorHandler;