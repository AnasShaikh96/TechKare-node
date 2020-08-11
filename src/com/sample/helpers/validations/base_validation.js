'use strict'

/**
* @namespace com.sample.helpers.validations
* @auther Graymatrix soluations PVT LTD
* @version 1.0.0
*/

/**
* @class base_validation
* @extends com.sample.helpers.base_helper
* @classdesc Application Base Model
* @memberof com.sample.helpers.validations
*/

/**
 * Export Base Validation Class Object
 * @memberof com.sample.helpers.validations
 * @module base_validation
 * @see com.sample.helpers.validations.base_validation
 */

const Joi = require('joi');
const path = require('path');
const baseHelper = require(".." + "/" + "base_helper.js").base_helper;

module.exports.base_validation = class base_validation extends baseHelper{
	
	constructor(){
		super();
		this.Joi = Joi;
		this._messages = {
			any: {
				unknown: '{{!label}} is not allowed',
				invalid: '{{!label}} contains an invalid value',
				empty: '{{!label}} is not allowed to be empty',
				required: '{{!label}} is required',
				allowOnly: '{{!label}} must be one of {{valids}}',
				default: '{{!label}}threw an error when running default method'
			},
			alternatives: {
				base: '{{!label}} not matching any of the allowed alternatives',
				child: null
			},
			array: {
				base: 'must be an array',
				includes: 'at position {{pos}} does not match any of the allowed types',
				includesSingle: 'single value of "{{!label}}" does not match any of the allowed types',
				includesOne: 'at position {{pos}} fails because {{reason}}',
				includesOneSingle: 'single value of "{{!label}}" fails because {{reason}}',
				includesRequiredUnknowns: 'does not contain {{unknownMisses}} required value(s)',
				includesRequiredKnowns: 'does not contain {{knownMisses}}',
				includesRequiredBoth: 'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
				excludes: 'at position {{pos}} contains an excluded value',
				excludesSingle: 'single value of "{{!label}}" contains an excluded value',
				min: 'must contain at least {{limit}} items',
				max: 'must contain less than or equal to {{limit}} items',
				length: 'must contain {{limit}} items',
				ordered: 'at position {{pos}} fails because {{reason}}',
				orderedLength: 'at position {{pos}} fails because array must contain at most {{limit}} items',
				ref: 'references "{{ref}}" which is not a positive integer',
				sparse: 'must not be a sparse array',
				unique: 'position {{pos}} contains a duplicate value'
			},
			boolean: {
				base: 'must be a boolean'
			},
			binary: {
				base: 'must be a buffer or a string',
				min: 'must be at least {{limit}} bytes',
				max: 'must be less than or equal to {{limit}} bytes',
				length: 'must be {{limit}} bytes'
			},
			date: {
				base: 'must be a number of milliseconds or valid date string',
				format: 'must be a string with one of the following formats {{format}}',
				strict: 'must be a valid date',
				min: 'must be larger than or equal to "{{limit}}"',
				max: 'must be less than or equal to "{{limit}}"',
				isoDate: 'must be a valid ISO 8601 date',
				timestamp: {
					javascript: 'must be a valid timestamp or number of milliseconds',
					unix: 'must be a valid timestamp or number of seconds'
				},
				ref: 'references "{{ref}}" which is not a date'
			},
			function: {
				base: 'must be a Function',
				arity: 'must have an arity of {{n}}',
				minArity: 'must have an arity greater or equal to {{n}}',
				maxArity: 'must have an arity lesser or equal to {{n}}',
				ref: 'must be a Joi reference'
			},
			lazy: {
				base: '!!schema error: lazy schema must be set',
				schema: '!!schema error: lazy schema function must return a schema'
			},
			object: {
				base: 'must be an object',
				child: '!!child "{{!child}}" fails because {{reason}}',
				min: 'must have at least {{limit}} children',
				max: 'must have less than or equal to {{limit}} children',
				length: 'must have {{limit}} children',
				allowUnknown: '!!{{!child}} is not allowed',
				with: '!!"{{mainWithLabel}}" missing required peer "{{peerWithLabel}}"',
				without: '!!"{{mainWithLabel}}" conflict with forbidden peer "{{peerWithLabel}}"',
				missing: 'must contain at least one of {{peersWithLabels}}',
				xor: 'contains a conflict between exclusive peers {{peersWithLabels}}',
				or: 'must contain at least one of {{peersWithLabels}}',
				and: 'contains {{presentWithLabels}} without its required peers {{missingWithLabels}}',
				nand: '!!"{{mainWithLabel}}" must not exist simultaneously with {{peersWithLabels}}',
				assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
				rename: {
					multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
					override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists'
				},
				type: 'must be an instance of "{{type}}"',
				schema: 'must be a Joi instance'
			},
			number: {
				base: '{{!label}} must be a number',
				min: '{{!label}} must be larger than or equal to {{limit}}',
				max: '{{!label}} must be less than or equal to {{limit}}',
				less: '{{!label}} must be less than {{limit}}',
				greater: '{{!label}} must be greater than {{limit}}',
				float: '{{!label}} must be a float or double',
				integer: '{{!label}} must be an integer',
				negative: '{{!label}} must be a negative number',
				positive: '{{!label}} must be a positive number',
				precision: '{{!label}} must have no more than {{limit}} decimal places',
				ref: '{{!label}} references "{{ref}}" which is not a number',
				multiple: '{{!label}} must be a multiple of {{multiple}}'
			},
			string: {
				base: '{{!label}} must be a string',
				min: '{{!label}} length must be at least {{limit}} characters long',
				max: '{{!label}} length must be less than or equal to {{limit}} characters long',
				length: '{{!label}} length must be {{limit}} characters long',
				alphanum: '{{!label}} must only contain alpha-numeric characters',
				token: '{{!label}} must only contain alpha-numeric and underscore characters',
				regex: {
					base: 'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
					name: 'with value "{{!value}}" fails to match the {{name}} pattern',
					invert: {
						base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
						name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
					}
				},
				email: '{{!label}} must be a valid email',
				uri: '{{!label}} must be a valid uri',
				uriRelativeOnly: '{{!label}} must be a valid relative uri',
				uriCustomScheme: '{{!label}} must be a valid uri with a scheme matching the {{scheme}} pattern',
				isoDate: '{{!label}} must be a valid ISO 8601 date',
				guid: '{{!label}} must be a valid GUID',
				hex: '{{!label}} must only contain hexadecimal characters',
				base64: '{{!label}} must be a valid base64 string',
				hostname: '{{!label}} must be a valid hostname',
				lowercase: '{{!label}} must only contain lowercase characters',
				uppercase: '{{!label}} must only contain uppercase characters',
				trim: '{{!label}} must not have leading or trailing whitespace',
				creditCard: '{{!label}} must be a credit card',
				ref: 'references "{{ref}}" which is not a number',
				ip: '{{!label}} must be a valid ip address with a {{cidr}} CIDR',
				ipVersion: '{{!label}} must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
			}
		}
	}
	
	/**
	* @summary Validation Apply Function
	* @private
	* @memberof com.sample.helpers.validations.base_validation
	* @function validate
	* @param {object} data - Data To be Validated
	* @param {value} rule - Validation Rules
	*/
	
	validate(data,rule){
		return this.Joi.validate(data,rule,{abortEarly:false,language:this._messages});
	}


	validate(data,rule,isAbortEarly = false){
		return this.Joi.validate(data,rule,{abortEarly:isAbortEarly,language:this._messages});
	}
	
	/**
	* @summary Validation Apply Function
	* @private
	* @memberof com.sample.helpers.validations.base_validation
	* @function validate
	* @param {object} data - Data To be Validated
	* @param {value} rule - Validation Rules
	*/
	
	validateCallback(data,rule,callback){
		return this.Joi.validate(data,rule,{abortEarly:false,language:this._messages},callback);
	}
};
