// top-level namespace being assigned an object literal
var zitate = zitate || {};

// Get selected text: (cf. http://stackoverflow.com/questions/6251937/how-to-get-selecteduser-highlighted-text-in-contenteditable-element-and-replac)
zitate.getSelectedText = function(){
	var html = "";
	if (typeof window.getSelection != "undefined") {
	    var sel = window.getSelection();
	    if (sel.rangeCount) {
	        var container = document.createElement("div");
	        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
	            container.appendChild(sel.getRangeAt(i).cloneContents());
	        }
	        html = container.innerHTML;
	    }
	} else if (typeof document.selection != "undefined") {
	    if (document.selection.type == "Text") {
	        html = document.selection.createRange().htmlText;
	    }
	}
	// Use browser to remove any html:
	var div = document.createElement("div");
	div.innerHTML = html;
	return div.innerText;
};


zitate.getMetaValue = function(meta_name){
	var my_arr = document.getElementsByTagName("META");
	for (var counter = 0; counter < my_arr.length; counter++) {
		if (my_arr[counter].name.toLowerCase() == meta_name.toLowerCase()) {
			return my_arr[counter].content;
		}
	}
	return null;
};


zitate.sendInformation = function(){
	var zitat = zitate.getSelectedText();
	var source = document.URL;
	var title = document.title;
	var author = zitate.getMetaValue("author");
	var keywords = [];
	if(zitate.getMetaValue("keywords") != null){
		keywords = zitate.getMetaValue("keywords").split(",");
	}
	var data = {
		zitat: zitat,
		source: source,
		title: title,
		author: author,
		keywords: keywords
	};
	chrome.extension.sendRequest(data);
};


// perform it:
zitate.sendInformation();