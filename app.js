var express  = require('express'),
	i18n = require("i18next"),
    compress = require('compression'),
    hbs      = require('hbs'),
    moment   = require('moment'),
    router   = require(__dirname + '/routes').router,
    app      = express(),
    error    = require(__dirname + '/middleware/error');

//i18n
i18n.init({
	lng : 'pt-BR'
	, languages : ['pt-BR', 'en']
	, cookieName : 'lang'
	, useCookie : true
	, fallbackLng : 'pt-BR'
	, fallbackOnNull : false
	, fallbackOnEmpty : false
	, load : 'current'
	, debug : true
	, resGetPath : 'locales/__lng__/__ns__.json'
	, resSetPath : 'locales/__lng__/__ns__.json'
	, saveMissing : true
	, resStore : false
	, returnObjectTrees : false
	, getAsync : true
	, dynamicLoad : true
});
app.use(i18n.handle);
i18n.registerAppHelper(app);

hbs.registerHelper('t', function(i18n_key) {
	var result = i18n.t(i18n_key);

	return new hbs.SafeString(result);
});
//deveria servir para a versão client side
i18n.serveClientScript(app)      // grab i18next.js in browser
	.serveDynamicResources(app)    // route which returns all resources in on response
	.serveMissingKeyRoute(app)     // route to send missing keys
	.serveChangeKeyRoute(app)      // route to post value changes
	.serveRemoveKeyRoute(app);     // route to remove key/value
//
///////

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('dateFormat', function(context, block) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f);
});

app.set('view engine', 'html');
app.set('views', __dirname + '/views/pages');
app.engine('html', hbs.__express);

app.use(compress({
    filter: function(req, res) {
        return (/json|text|javascript|css|image\/svg\+xml|application\/x-font-ttf/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

if (app.get('env') === 'development'){
    app.use(express.static(__dirname + '/public', {maxAge: 86400000}));
}

var route = express.Router();

route.get('/index.html', function(req, res){
    res.redirect(301, '/');
});
route.get('/', router.index);
route.get('/projects.html', router.projects);
route.get('/services.html', router.services);
route.get('/downloads.html', router.downloads);
route.get('/about.html', router.about);
route.get('/contact.html', router.contact);
route.get('/patrocinio.html', router.patrocinio);

app.use('/', route);

app.use(error.notFound);
app.use(error.serverError);

module.exports = app;
