$(document).ready(function() {

	var tags = [];

	/**
	 * Add tag-it.js
	 */
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
				// var filter = request.term.toLowerCase();
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


	/**
	 * Sorting:
	 */
	$("#name_sort").click(function(){
		$('ul.list>li').tsort('a.title');
	});
	$("#date_sort").click(function(){
		$('ul.list>li').tsort('span.created_hidden', {order:'desc'});
	});

	/*
	 * Apply moment formatting
	 */
	$('ul.list>li').find('p.created').each(function(){
		// Thu Jan 23 2014 09:06:05 GMT+0100 (CET)
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
			$(".container").html(data);
			$('ul.list>li').find('p.created').each(function(){
				// Thu Jan 23 2014 09:06:05 GMT+0100 (CET)
				$(this).html(moment($(this)).fromNow())
			});
		}
	);
}