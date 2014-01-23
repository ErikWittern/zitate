/**
	Demonstratio extension
	copyright by: Erik Wittern
**/
var tags = [];
var metaData = {};
var currentUrl;
var serverUrl = "http://localhost:3000/";

chrome.extension.onRequest.addListener(function(data) {
	// 'data' will be sent multiple times, due to injection of selector.js in all frames. 
	// Use only actual selection:
	metaData = data;
	renderMetaData();
});


function renderMetaData(){
	$('#title').html(metaData.title);
	$('#description').html(metaData.description);
	$('#author').html(metaData.author);
	$('#url').html(metaData.url);
};


function postBookmark(){
	if(validate()){
		metaData.tags = tags;
		$.post(
			serverUrl + "bookmarks",
			metaData,
			function(data){
				$("#meta").html("<h1>Successfully sent!</h1>");
				setTimeout(function(){
					window.close();
				}, 500);
			}
		);
	} else {
		$("#tag_form_p").addClass("error");
		setTimeout(function(){
			$("#tag_form_p").removeClass("error");
		}, 500);
	}
};

function validate(){
	if(tags.length > 0){
		return true;
	}
	return false;
}


window.onload = function() {
	// Create listener for "Submit zitat" button:
	document.getElementById('submit_btn').onclick = postBookmark;

	// Inject selector.js into all frames in the active tab.
	chrome.windows.getCurrent(function (currentWindow) {
	chrome.tabs.query({active: true, windowId: currentWindow.id},
		function(activeTabs) {
			chrome.tabs.executeScript(
				activeTabs[0].id, {file: 'js/selector.js', allFrames: false});
		});
	});
}

$(document).ready(function() {
	$("#tag_form_text").tagit({
		beforeTagAdded: function(event, ui) {
        	tags
        .push(ui.tagLabel);
        	console.log(tags
        	);
    	},
    	beforeTagRemoved: function(event, ui) {
    		var index = tags
    	.indexOf(ui.tagLabel);
    		if (index > -1) {
    			tags
    		.splice(index, 1);
			}
    		console.log(tags
    		);
    	},
    	autocomplete: { 
			source: function( request, response ) { 
				// var filter = request.term.toLowerCase();
				var filter = request.term.toLowerCase();
				$.ajax({
					type: "GET",
					url: serverUrl + "tags",
					dataType: "json",
					success: function(data){
						response( $.grep(data, function(element) {
							// Only match autocomplete options that begin with the search term.
							// (Case insensitive.)
							return (element.toLowerCase().indexOf(filter) === 0);
						}));
					}
				});
			},
			delay: 0, 
			minLength: 1
		}
	});
});