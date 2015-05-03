var fs = require('fs'),
    seo = JSON.parse(fs.readFileSync(__dirname + '/seo.json'));

exports.router = {
    index: function(req, res) {
	    /*
	     *@todo melhorar esta parte da passagem de dados
	     */
	    data = JSON.parse(fs.readFileSync('locales/'+ req.locale + '/translation.json'));
        res.render('index', { seo : seo, data : data });
    },
    projects: function(req, res) {
        res.render('projects', { seo : seo });
    },
    services: function(req, res) {
        res.render('services', { seo : seo });
    },
    downloads: function(req, res) {
        res.render('downloads', { seo : seo });
    },
    about: function(req, res) {
        res.render('about', { seo : seo });
    },
	contact: function(req, res) {
		res.render('contact', { seo : seo });
	},
	patrocinio: function(req, res) {
		res.render('patrocinio', { seo : seo });
	}
};
