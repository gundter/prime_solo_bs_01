var apikey = '728618f4cc37c292e2a09339bb33711dd540ddbd'; // Put your API key here
var searchTerm;
// Use this function to do stuff with your results.
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
	for(var i = 0; i < 10; i++) {
		var description = "";
		if (results[i].deck){
			description = results[i].deck;
		}
		if (results[i].image){
			var image_url = results[i].image.icon_url;
		}
		$('.row').last().append("<div class='col-md-4 well info'><img class='hidden-sm hidden-xs' src='"+ image_url + "'><p class='lead'>" + results[i].name + "</p><div class='result'>" + description + "</div><button class='btn btn-sm btn-success removeTitle'>Remove Title</button></div>");
		if (i % 3 == 0){
			$('.container').append("<div class='row'></div>");
		}
		$('.row').hide().delay(i * 500).fadeIn('slow');
	}
	$('.info').on('click', '.removeTitle', function(){
		console.log("Remove button");
		console.log($(this).parent());
		$(this).parent().fadeOut('slow', function(){
			$(this).remove();
		});
	});
}

$(document).ready(function() {

	// Start the search here!
	$(".searchBtn").on('click', function(){
		$(".row").empty();
		searchTerm = $("#searchField").val();
		console.log(searchTerm);
		$("#searchField").val('');
		search(searchTerm);
	});
	//search("predator");
	
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
