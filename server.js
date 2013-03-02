var svpply = require('svpply');  // require the svpply library
var api = new svpply.API('0ac471594da6692fdaf6a0dac1b44cf4', '6c17ab78bb1a78514f8b6d503e219190');  // setup svpply object
var querystring = require('querystring');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/test', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	
	var gender = "mens";
	
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
	
	api.shop.products(gender, "clothing/tops/shirts", query, function(response) {
		var index = Math.floor(Math.random()*response.response.products.length);
		var product = response.response.products[index];
		finalres.top.link = product.page_url;
		finalres.top.src = product.image;
		
		var bottomopts = ["pants", "jeans"];
		var bottom = "clothing/bottoms/" + bottomopts[Math.floor(Math.random()*bottomopts.length)];
		
		api.shop.products(gender, bottom, query, function(response) {
			var index = Math.floor(Math.random()*response.response.products.length);
			var product = response.response.products[index];
			finalres.bottom.link = product.page_url;
			finalres.bottom.src = product.image;
			
			api.shop.products(gender, "shoes", query, function(response) {
				var index = Math.floor(Math.random()*response.response.products.length);
				var product = response.response.products[index];
				console.log(product);
				finalres.shoe.link = product.page_url;
				finalres.shoe.src = product.image;
				
				api.shop.products(gender, "accessories", query, function(response) {
					var index = Math.floor(Math.random()*response.response.products.length);
					var product = response.response.products[index];
					console.log(product);
					finalres.accessory.link = product.page_url;
					finalres.accessory.src = product.image;
					
					console.log(finalres);
					
					res.send(JSON.stringify(finalres));
				});				
			});
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
