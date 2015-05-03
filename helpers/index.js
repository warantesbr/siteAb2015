/**
 * Helper dateFormat
 */
var moment = require('moment');
var i18n = require("i18next");

module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('dateFormat', function(context, block) {
        var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
        return moment(context).format(f);
    });
	Handlebars.registerHelper('t', function(i18n_key) {
		var result = i18n.t(i18n_key);

		return new Handlebars.SafeString(result);
	});
};
