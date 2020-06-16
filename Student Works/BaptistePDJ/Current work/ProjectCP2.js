var http = require('http');
var url = require('url');
var fs = require('fs');//File systems
var express = require('express');//Framework express
var path = require('path');//Useful to extract the path name from the rul
var app = express();

var top = new Array(new Array("52", "Johnny"),new Array("70", "Emma"),new Array("73", "Larry"),new Array("79", "Jordan"),new Array("82","Michel" ),);
// Top players array

//Function to update Top.html with content = Top player array and content2 = top player top3 for the carousel
function formatAsHtml(content, content2){
	var output = 
		'<!DOCTYPE html>\n' +
		'<html>\n' +
		'<head>\n' +
			'<title>Top Players</title>\n' +
			'<link rel="shortcut icon" href="mine.png" />\n' +
			'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">\n' +
		'<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>\n' +
		'<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>\n' +
		'<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>\n' +
		'<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>\n' +
			'<link rel="stylesheet" type="text/css" href="style.css">\n' +
		'</head>\n' +
		'<body>\n' +
	'<div class="container-fluid div1">\n' +
		'<div class="row">\n' +
			'<div class="col-sm">\n' +
		    	'<a href="menu.html"><img src="mine.png" class="img-fluid" alt="mine"></a>\n' +
		    '</div>\n' +
		    '<div class="col-sm headr">\n' +
		     		'<header class="header1">\n' +
						'MINESWEEPER \n' +
					'</header>\n' +
					'<br>\n' +
					'<p class="p1">\n' +
						'Are you ready to sweep ?\n' +
					'</p>\n' +
		    '</div>\n' +
		    '<div class="col-sm headr2">\n' +
		    	'<a href="https://www.famnit.upr.si/sl/"><img src="famnit.png" class="famnit img-fluid" alt="famnit"></a>\n' +
		    '</div>\n' +
		'</div>\n' +
	'</div>\n' +
	
	'<div class="div2">\n' +
		'<nav class="nav1">\n' +
			'<ul class="nav nav-tabs nav-justified ">\n' +
				'<li class="nav-item ">\n' +
			  		'<a class="nav-link a1" href="rules.html">RULES</a>\n' +
				'</li>\n' +
			    '<li class="nav-item dropdown dropdown1">\n' +
			    	'<a class="nav-link dropdown-toggle a1 dropbtn" data-toggle="dropdown" href="8x8.html" role="button" aria-haspopup="true" aria-expanded="false">8-BY-8</a>\n' +
			    	'<div class="dropdown-menu dropdown-content">\n' +
				    	'<a class="a2" href="8x8.html">Beginner</a>\n' +
				    	'<a class="a2" href="8x8normal.html">Normal</a>\n' +
				    	'<a class="a2" href="8x8king.html">King</a>\n' +
			    	'</div>\n' +
				'</li>\n' +
			    '<li class="nav-item dropdown dropdown1">\n' +
			    	'<a class="nav-link dropdown-toggle a1 dropbtn" data-toggle="dropdown" href="16x16.html" role="button" aria-haspopup="true" aria-expanded="false">16-BY-16</a>\n' +
			    	'<div class="dropdown-menu dropdown-content">\n' +
			        	'<a class="a2" href="16x16.html">Beginner</a>\n' +
			       		'<a class="a2" href="16x16normal.html">Normal</a>\n' +
			        	'<a class="a2" href="16x16king.html">King</a>\n' +
			   		'</div>\n' +
			  	'</li>\n' +
			  	'<li class="nav-item">\n' +
			  		'<a class="nav-link a1 activ" href="Top.html">TOP PLAYERS</a>\n' +
			  	'</li>\n' +
			  	'<li class="nav-item">\n' +
			    	'<a class="nav-link a1" href="about.html">ABOUT</a>\n' +
			  	'</li>\n' +
			'</ul>\n' +
		'</nav>\n' +
	'</div>\n' +
	'<div class="container-fluid div3">\n' +
		'<div class="div4">\n' +
		'<div id="carouselExampleCaptions" class="carousel slide divcar3" data-ride="carousel">\n' +
			
  		'<div class="carousel-inner">\n' +
    		content2 + '\n' +
  		'</div>\n' +
  	'<a class="carousel-control-prev divcar2" href="#carouselExampleCaptions" role="button" data-slide="prev">\n' +
    	'<span class="carousel-control-prev-icon" aria-hidden="true"></span>\n' +
    	'<span class="sr-only">Previous</span>\n' +
  	'</a>\n' +
  	'<a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">\n' +
    	'<span class="carousel-control-next-icon" aria-hidden="true"></span>\n' +
    	'<span class="sr-only">Next</span>\n' +
  	'</a>\n' +
	'</div>\n' +
	'<div class="table-responsive-lg">\n' +
	

	'<table class="table">\n' +
  '<thead class="thead-dark">\n' +
    '<tr>\n' +
      '<th scope="col">#</th>\n' +
      '<th scope="col">Name</th>\n' +
      '<th scope="col">Time (s)</th>\n' +
    '</tr>\n' +
  '</thead>\n' +
  '<tbody id="score">\n' +
  		content + '\n' +
	'</tbody>\n' +
	'</table>\n' +
	'</div>\n' +
		 
		'</div>\n' +
	'</div>\n' +
	'<div class="card-footer text-muted">\n' +
		'<footer>\n' +
			'&copy Baptiste PDJ\n' +
		'</footer>\n' +
		
	'</div>\n' +
	
	'</body>\n' +
	'</html>\n';
    return output;//Function used to write Top players page with the new Top players array
}

app.use(express.static(__dirname + '/Public'));// Define the /Public files as a static file used for the style, JS and image...,

//All the function to open the different file of the project
app.get('/menu.html', function(req, res) {
	fs.readFile('menu.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/rules.html', function(req, res) {
	fs.readFile('rules.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})

app.get('/8x8.html', function(req, res) {
	fs.readFile('8x8.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/8x8normal.html', function(req, res) {
	fs.readFile('8x8normal.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/8x8king.html', function(req, res) {
	fs.readFile('8x8king.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/16x16.html', function(req, res) {
	fs.readFile('16x16.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/16x16normal.html', function(req, res) {
	fs.readFile('16x16normal.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/16x16king.html', function(req, res) {
	fs.readFile('16x16king.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
app.get('/Top.html', function(req, res) {
	fs.readFile('Top.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);

    return res.end(); })
})
app.get('/about.html', function(req, res) {
	fs.readFile('about.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); })
})
//The function used to change the Top player rank 
app.get('/Top.html/:username/:time/', function(req, res) {
		var username = req.params.username;//take the username from the url
		var time = req.params.time;//take the time from the url
		top.push(new Array(time, username));// include the new player in the rank
		var tableau = "";
      	var carousel = "";	
      	top.sort();//Sort the Top players ranking
      		
		for (var i = 0; i <= 2; i++) { // create in carousel all the new carousel with the new TOP 3 
			if(i == 0){
				carousel = carousel +
    		'<div class="carousel-item active divcar">\n' +
      			'<img src="white.png" class="d-block w-100 imgcar" alt="nothing">\n' +
      			'<div class="carousel-caption d-none d-md-block">\n' +
        			'<h5 class="divcar2">' + (i+1).toString() + '</h5>\n' +
        			'<p class="divcar2">' + top[i][1].toString() + ' with this time:' + top[i][0].toString() + 's</p>\n' +
        		'</div>\n' +
    		'</div>\n';
			}
			else{
				carousel = carousel +
				'<div class="carousel-item divcar">\n' +
      			'<img src="white.png" class="d-block w-100 imgcar" alt="nothing">\n' +
      			'<div class="carousel-caption d-none d-md-block">\n' +
        			'<h5 class="divcar2">' + (i+1).toString() + '</h5>\n' +
        			'<p class="divcar2">' + top[i][1].toString() + ' with this time:' + top[i][0].toString() + 's</p>\n' +
        		'</div>\n' +
    		'</div>\n';
			}
			
		}
		for (var i = 0; i < top.length; i++) {
					tableau = tableau + 
					  "<tr>\n" + 
				      "<th scope='row'>" + (i+1).toString() + "</th>\n" +
				      "<td>" + top[i][1].toString() + "</td>\n" +
				      "<td>" + top[i][0].toString() + "</td>\n" + 
				      "</tr>";// create in tableau (mean array in french) the new top 
			
		}
		fs.writeFile('Top.html',formatAsHtml(tableau, carousel), function (err) {//update the file Top.html with the new Top
  			if (err) throw err;
  			console.log('Replaced!');
  			res.redirect('http://localhost:8080/Top.html'); //Redirect the user to the Top.html page after updated it 
		 
  		
    	return res.end(); })
})

.use(function(req, res, next){// If you can't find a page write this
	 res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page is not HERE !');
});



app.listen(8080);//listen the server at localhost:8080

 