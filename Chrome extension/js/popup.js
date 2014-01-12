/**
	Zitat extension
	copyright by: Erik Wittern
**/
var tagList = [];

chrome.extension.onRequest.addListener(function(data) {
	// 'data' will be sent multiple times, due to injection of selector.js in all frames. 
	// Use only actual selection:
	if(data.zitat != ''){
		$('#zitat_content').html("\"" + data.zitat + "\"");
		// Make font smaller if zitat is long:
		if(data.zitat.length > 150){
			$('#zitat_content').css("font-size", "24px");
		}
		$('#author_content').html(data.author);
		if(data.title.length > 60){
			$('#title_content').html("\"" + data.title.substring(0,60) + "...\"");
		} else {
			$('#title_content').html("\"" + data.title + "\"");
		}
		if(data.source.length > 60){
			$('#source_content').html(data.source.substring(0,60) + "...");
		} else {
			$('#source_content').html(data.source);
		}
		
		console.log(data.keywords);
		data.keywords.map(function(item){
			$("#tag_form_text").tagit("createTag", item);
		})
	}
});


function postZitat(){
	document.getElementById('zitat_content').innerHTML = "\"Sent!\"";
	setTimeout(function(){
		window.close();
	},500);
};


window.onload = function() {
	// Create listener for "Submit zitat" button:
	document.getElementById('submit_zitat_btn').onclick = postZitat;

	// Inject selector.js into all frames in the active tab.
	chrome.windows.getCurrent(function (currentWindow) {
	chrome.tabs.query({active: true, windowId: currentWindow.id},
		function(activeTabs) {
			chrome.tabs.executeScript(
				activeTabs[0].id, {file: 'js/selector.js', allFrames: true});
		});
	});
}

$(document).ready(function() {
	$("#tag_form_text").tagit({
		beforeTagAdded: function(event, ui) {
        	tagList.push(ui.tagLabel);
        	console.log(tagList);
    	},
    	beforeTagRemoved: function(event, ui) {
    		var index = tagList.indexOf(ui.tagLabel);
    		if (index > -1) {
    			tagList.splice(index, 1);
			}
    		console.log(tagList);
    	}
	});
});