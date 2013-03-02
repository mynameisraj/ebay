var init = function() {
	document.getElementById("refresh-btn").addEventListener("click", function(e) {
		e.preventDefault();
		refresh();
	}, false);
	
	document.getElementById("top-pick").addEventListener("click", function(e) {
		e.preventDefault();
		pick("top");
	}, false);
	
	document.getElementById("bottom-pick").addEventListener("click", function(e) {
		e.preventDefault();
		pick("bottom");
	}, false);
	
	document.getElementById("shoe-pick").addEventListener("click", function(e) {
		e.preventDefault();
		pick("shoe");
	}, false);
	
	document.getElementById("accessory-pick").addEventListener("click", function(e) {
		e.preventDefault();
		pick("accessory");
	}, false);
	
	refresh();
}

var refresh = function() {
	var loading = document.getElementsByClassName("loading")[0];
	loading.style["display"] = "inline-block";

	var req = new XMLHttpRequest();
	var top = document.getElementsByClassName("top-img")[0];
	var bottom = document.getElementsByClassName("bottom-img")[0];
	var shoe = document.getElementsByClassName("shoe-img")[0];
	var accessory = document.getElementsByClassName("accessory-img")[0];
	
	req.onload = function() {
		var r = JSON.parse(this.responseText);
		console.log(r);
		top.getElementsByTagName("a")[0].setAttribute("href", r.top.link);
		top.getElementsByTagName("img")[0].setAttribute("src", r.top.src);
		bottom.getElementsByTagName("a")[0].setAttribute("href", r.bottom.link);
		bottom.getElementsByTagName("img")[0].setAttribute("src", r.bottom.src);
		shoe.getElementsByTagName("a")[0].setAttribute("href", r.shoe.link);
		shoe.getElementsByTagName("img")[0].setAttribute("src", r.shoe.src);
		accessory.getElementsByTagName("a")[0].setAttribute("href", r.accessory.link);
		accessory.getElementsByTagName("img")[0].setAttribute("src", r.accessory.src);
		loading.style["display"] = "none";
	};
	var gender = document.getElementsByClassName("gender-sel")[0].value;
	var url = "/refresh?gender=" + gender;
	console.log(url);
	req.open("get", url, true);
	req.send();
}

var pick = function(kind) {
	var loading = document.getElementsByClassName("loading")[0];
	loading.style["display"] = "inline-block";

	var req = new XMLHttpRequest();
	var kindClass = kind + "-img";
	var newEl = document.getElementsByClassName(kindClass)[0];
	
	req.onload = function() {
		var r = JSON.parse(this.responseText);
		console.log(r);
		newEl.getElementsByTagName("a")[0].setAttribute("href", r.link);
		newEl.getElementsByTagName("img")[0].setAttribute("src", r.src);
		loading.style["display"] = "none";
	};
	var gender = document.getElementsByClassName("gender-sel")[0].value;
	var url = "/pick?gender=" + gender + "&kind=" + kind;
	console.log(url);
	req.open("get", url, true);
	req.send();
}

window.addEventListener("load", init, false);