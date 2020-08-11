'use strict'

/**
* @class pagination_helper
* @extends com.sample.helpers.base_helper
* @classdesc Application Base Model
* @memberof com.sample.helpers
*/

const path 			= require("path");
const pagination	= require("pagination");
const baseHelper 	= require("." + "/" + "base_helper.js").base_helper;

/**
 * Export Common Helper Class Object
 * @memberof com.sample.helpers
 * @module pagination_helper
 * @see com.sample.helpers.pagination_helper
 */

module.exports.pagination_helper = class pagination_helper extends baseHelper{
	constructor(){
		super();
	}
	
	/**
	 *  @summery Create Filter Query
	 *  @public
	 *  @memberof com.sample.helpers.pagination_helper
	 *  @function createPageData
	 *  @param {Object} filter - Data To be Filter
	 *  @return Where Query
	 */
	
	createPageData(data){
		return new pagination.SearchPaginator({prelink:data.route, current: data.current, rowsPerPage: data.limit, totalResult: data.total});
		
	}
	
	/**
	 *  @summery Create Filter Query
	 *  @public
	 *  @memberof com.sample.helpers.pagination_helper
	 *  @function createPageLinks
	 *  @param {Object} filter - Data To be Filter
	 *  @return Where Query
	 */
	 
	createPageLinks(data){
		var translations = {
			'PREVIOUS' : '&laquo;',
			'NEXT' : '&raquo;',
			'FIRST' : 'First',
			'LAST' : 'Last',
			'CURRENT_PAGE_REPORT' : 'Results {FromResult} - {ToResult} of {TotalResult}'
		};
		return new pagination.TemplatePaginator({
			prelink			: data.route,
			current			: data.current,
			rowsPerPage 	: data.limit,
			totalResult		: data.total,
			slashSeparator	: false,
			translator		: function(str){
				return translations[str];
			},
			template		: function(result){
				var i, len, prelink;
				var html = '<div><ul class="pagination pull-right">';
				if(result.pageCount < 2) {
					html += '</ul></div>';
					return html;
				}
				prelink = this.preparePreLink(result.prelink);
				if(result.previous) {
					html += '<li><a href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
				}else{
					html += '<li class="disabled"><span>' + this.options.translator('PREVIOUS') + '</span></li>'
				}
				if(result.range.length) {
					for( i = 0, len = result.range.length; i < len; i++) {
						if(result.range[i] === result.current) {
							html += '<li class="active"><span>' + result.range[i] + '</span></li>';
						} else {
							html += '<li><a href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
						}
					}
				}
				if(result.next) {
					html += '<li><a href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
				}else{
					html += '<li class="disabled"><span>' + this.options.translator('NEXT') + '</span></li>'
				}
				html += '</ul></div>';
				return html;
			}
		}).render();
	}
};
