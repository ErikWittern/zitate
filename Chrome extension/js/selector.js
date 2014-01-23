// top-level namespace being assigned an object literal
var demonstratio = demonstratio || {};

demonstratio.getMetaValue = function(meta_name){
	var my_arr = document.getElementsByTagName("META");
	for (var counter = 0; counter < my_arr.length; counter++) {
		if (my_arr[counter].name.toLowerCase() == meta_name.toLowerCase()) {
			return my_arr[counter].content;
		}
	}
	return null;
};


demonstratio.sendInformation = function(){
	var source = document.URL;
	var title = document.title;
	var author = demonstratio.getMetaValue("author");
	var description = demonstratio.getMetaValue("description");
	var data = {
		url: source,
		title: title,
		author: author,
		description: description,
	};
	chrome.extension.sendRequest(data);
};


// perform it:
console.log("Injected");
demonstratio.sendInformation();