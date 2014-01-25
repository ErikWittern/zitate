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
		$('#container>div.bookmark').tsort('a.title');
	});
	$("#date_sort").click(function(){
		$('#container>div.bookmark').tsort('span#created', {order:'desc'});
	});

	$("#likes_sort").click(function(){
		console.log("Likes...");
		$('#container>div.bookmark').tsort('h2#likes', {order:'desc'});
	});

	//////////////////////////////////
	// Liking / Disliking:
	//////////////////////////////////
	 $('.triangle_up').click(function(){
	 	var likes = Number($(this).next().html()) + 1;
	 	var self = this;
	 	$.ajax({
	 		type: 'POST',
	 		url: 'bookmarks/likes/' + $(self).attr('data-id'), 
	 		data: {
	 			likes: likes
	 		},
	 		success: function(data){
	 			$(self).next().html(data);
	 		}
	 	});
	 });

	$('.triangle_down').click(function(){
	 	var likes = Number($(this).prev().html()) - 1;
	 	var self = this;
	 	$.ajax({
	 		type: 'POST',
	 		url: 'bookmarks/likes/' + $(self).attr('data-id'), 
	 		data: {
	 			likes: likes
	 		},
	 		success: function(data){
	 			$(self).prev().html(data);
	 		}
	 	});
	 });


	//////////////////////////////////
	// Apply moment formatting
	//////////////////////////////////
	$('#container>div.bookmark').find('p.created').each(function(){
		$(this).html(moment($(this)).fromNow())
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
			$('#container>div.bookmark').find('p.created').each(function(){
				$(this).html(moment($(this)).fromNow())
			});
		}
	);
}