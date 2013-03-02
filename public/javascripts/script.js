window.shareURL = window.location.href;
window.ids = {
	top: "",
	bottom: "",
	shoe: "",
	accessory: ""
};

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
} ();

var updateURL = function() {
	var url = encodeURI(window.location.href.split("?")[0] + "?top=" + window.ids.top + "&bottom=" + window.ids.bottom + "&shoe=" + window.ids.shoe + "&accessory=" + window.ids.accessory);
	var textfield = document.getElementsByClassName("url")[0];
	textfield.setAttribute("value", url);
	return url;
};

var init = function() {
	if (getParameterByName("top") && getParameterByName("bottom") && getParameterByName("shoe") && getParameterByName("accessory"))
	{
		refreshGiven(getParameterByName("top"), getParameterByName("bottom"), getParameterByName("shoe"), getParameterByName("accessory"));
	} else {
		refresh();
	}

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
};

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
		
		for (i in window.ids) {
			window.ids[i] = r[i].id;
		}
		updateURL();
		loading.style["display"] = "none";
	};
	var gender = document.getElementsByClassName("gender-sel")[0].value;
	var url = "/refresh?gender=" + gender;
	console.log(url);
	req.open("get", url, true);
	req.send();
};

var refreshGiven = function(topNum, bottomNum, shoeNum, accessoryNum) {
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
		
		for (i in window.ids) {
			window.ids[i] = r[i].id;
		}
		updateURL();
		loading.style["display"] = "none";
	};
	var url = "/refreshgiven?top=" + topNum + "&bottom=" + bottomNum + "&shoe=" + shoeNum + "&accessory=" + accessoryNum;
	console.log(url);
	req.open("get", url, true);
	req.send();
};

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
		window.ids[kind] = r.id;
		updateURL();
		loading.style["display"] = "none";
	};
	var gender = document.getElementsByClassName("gender-sel")[0].value;
	var url = "/pick?gender=" + gender + "&kind=" + kind;
	console.log(url);
	req.open("get", url, true);
	req.send();
};

window.addEventListener("load", init, false);