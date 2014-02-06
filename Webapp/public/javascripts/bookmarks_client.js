$(document).ready(function() {

	var tags = [];

	//////////////////////////////////
	// Add tag-it.js
	//////////////////////////////////
	$("#tag_search_form_text").tagit({
		beforeTagAdded: function(event, ui) {
			tags.push(ui.tagLabel);
			getBookmarks(tags);
		},
		beforeTagRemoved: function(event, ui) {
			var index = tags.indexOf(ui.tagLabel);
			if (index > -1) {
				tags.splice(index, 1);
			}
			getBookmarks(tags);
		},
		autocomplete: { 
			source: function( request, response ) { 
				var filter = request.term.toLowerCase();
				$.ajax({
					type: "GET",
					url: "tags",
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
		},
		placeholderText: "Search for tags..."
	});


	//////////////////////////////////
	// Sorting:
	//////////////////////////////////
	$("#name_sort").click(function(){
		$('#container>div').tsort('a.title');
	});
	$("#date_sort").click(function(){
		$('#container>div').tsort('span#created', {order:'desc'});
	});

	$("#likes_sort").click(function(){
		console.log("Likes...");
		$('#container>div').tsort('h2#likes', {order:'desc'});
	});

	//////////////////////////////////
	// Liking / Disliking:
	//////////////////////////////////
	 $('.triangle_up').click(function(){
	 	var self = this;
	 	$.ajax({
	 		type: 'POST',
	 		url: 'bookmarks/likes/' + $(self).attr('data-id'), 
	 		success: function(data){
	 			$(self).next().html(data.likes);
	 		},
	 		error: function(req, status, err){
	 			console.log(err);
	 		}
	 	});
	 });

	$('.triangle_down').click(function(){
	 	var self = this;
	 	$.ajax({
	 		type: 'POST',
	 		url: 'bookmarks/dislikes/' + $(self).attr('data-id'), 
	 		success: function(data){
	 			$(self).prev().html(data.likes);
	 		},
	 		error: function(req, status, err){
	 			console.log(err);
	 		}
	 	});
	 });

});


var getBookmarks = function(tags){
	$.get( 
		"bookmarks", 
		{
			tags: tags
		},
		function(data) {
			$("#container").html(data);
		}
	);
}