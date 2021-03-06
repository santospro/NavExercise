var express = require('express'),
	logger = require('morgan'),
	path = require('path'),
	api = require('./api'),
	app = express(),
	publicDir = path.join(__dirname, 'public'),
	css_file = path.join(publicDir, 'styles', 'main.css');

var fs = require('fs'),
	sass = require('node-sass'),
	result = sass.renderSync({
		file: path.join(__dirname, 'sass', 'main.scss'),
		outputStyle: 'compact'
	});
console.log("Rendering Complete, saving .css file...");
fs.writeFileSync(css_file, result.css.toString());
console.log("Wrote CSS to " + css_file);

app.use(logger('dev'));
app.use(express.static(publicDir));
app.use('/api', api);

module.exports = app;