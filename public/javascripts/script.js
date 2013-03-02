var init = function() {
	document.getElementById("refresh-btn").addEventListener("click", function(e) {
		e.preventDefault();
		refresh();
	}, false);
	refresh();
}

var refresh = function() {
	var loading = document.getElementsByClassName("loading")[0];
	loading.style["display"] = "inline-block";

	var req = new XMLHttpRequest();
	var top = document.getElementsByClassName("top-img")[0];
	var bottom = document.getElementsByClassName("bottom-img")[0];
	var shoes = document.getElementsByClassName("shoes-img")[0];
	var accessory = document.getElementsByClassName("accessory-img")[0];
	
	req.onload = function() {
		var r = JSON.parse(this.responseText);
		console.log(r);
		top.getElementsByTagName("a")[0].setAttribute("href", r.top.link);
		top.getElementsByTagName("img")[0].setAttribute("src", r.top.src);
		bottom.getElementsByTagName("a")[0].setAttribute("href", r.bottom.link);
		bottom.getElementsByTagName("img")[0].setAttribute("src", r.bottom.src);
		shoes.getElementsByTagName("a")[0].setAttribute("href", r.shoe.link);
		shoes.getElementsByTagName("img")[0].setAttribute("src", r.shoe.src);
		accessory.getElementsByTagName("a")[0].setAttribute("href", r.accessory.link);
		accessory.getElementsByTagName("img")[0].setAttribute("src", r.accessory.src);
		loading.style["display"] = "none";
	};
	req.open("get", "/test", true);
	req.send("mens");
}

window.addEventListener("load", init, false);