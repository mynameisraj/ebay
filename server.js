var svpply = require('svpply');  // require the svpply library
var api = new svpply.API('0ac471594da6692fdaf6a0dac1b44cf4', '6c17ab78bb1a78514f8b6d503e219190');  // setup svpply object
var querystring = require('querystring');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/refresh', function (req, res) {
	console.log("refreshing");
	
	res.setHeader('Content-Type', 'application/json');
	var gender = "mens";
	if (req.query.gender) gender = req.query.gender;
	var query = {
		query: "",
		sort_by: "trending_score",
	};
	var finalres = {
		top: {
			link: "",
			src: ""
		},
		bottom: {
			link: "",
			src: ""
		},
		shoe: {
			link: "",
			src: ""
		},
		accessory: {
			link: "",
			src: ""
		}
	};
	
	// get top
	api.shop.products(gender, "clothing/tops/shirts", query, function(response) {
		console.log("-top");
		var index = Math.floor(Math.random()*response.response.products.length);
		var product = response.response.products[index];
		finalres.top.link = product.page_url;
		finalres.top.src = product.image;
		
		// get bottom
		var bottomopts = ["pants", "jeans"];
		var bottom = "clothing/bottoms/" + bottomopts[Math.floor(Math.random()*bottomopts.length)];
		api.shop.products(gender, bottom, query, function(response) {
			console.log("-bottom");
			var index = Math.floor(Math.random()*response.response.products.length);
			var product = response.response.products[index];
			finalres.bottom.link = product.page_url;
			finalres.bottom.src = product.image;
			
			// get shoes
			api.shop.products(gender, "shoes", query, function(response) {
				console.log("-shoe");
				var index = Math.floor(Math.random()*response.response.products.length);
				var product = response.response.products[index];
				finalres.shoe.link = product.page_url;
				finalres.shoe.src = product.image;
				
				// get accessories
				api.shop.products(gender, "accessories", query, function(response) {
					console.log("-accessory");
					var index = Math.floor(Math.random()*response.response.products.length);
					var product = response.response.products[index];
					finalres.accessory.link = product.page_url;
					finalres.accessory.src = product.image;
					
					res.send(JSON.stringify(finalres));
					console.log("done");
				});				
			});
		});
	});
});

app.get('/pick', function (req, res) {
	console.log("pick");
	res.setHeader('Content-Type', 'application/json');
	var finalres = {};
	
	var gender = "mens";
	if (req.query.gender) gender = req.query.gender;
	
	var kind = "top";
	if (req.query.kind) kind = req.query.kind;
	
	console.log("-" + kind);
	if (kind.match("top")) {
		kind = "clothing/tops/shirts";
	} else if (kind.match("bottom")) {
		var bottomopts = ["pants", "jeans"];
		kind = "clothing/bottoms/" + bottomopts[Math.floor(Math.random()*bottomopts.length)];
	} else if (kind.match("shoe")) {
		kind = "shoes";
	} else {
		kind = "accessories";
	}

	var query = {
		query: "",
		sort_by: "trending_score",
	};
	
	api.shop.products(gender, kind, query, function(response) {
		var index = Math.floor(Math.random()*response.response.products.length);
		var product = response.response.products[index];
		finalres.link = product.page_url;
		finalres.src = product.image;
		
		res.send(JSON.stringify(finalres));
		console.log("done");
	});
});


// port
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
