const StreamInfoEvents = {
	'StreamInfoQuerying':'StreamInfoQuerying',
	'StreamInfoReady':'StreamInfoReady',
	'StreamInfoFail':'StreamInfoFail'
};

var StreamInfoUrl = "http://" + document.location.hostname +":10500/api/streaminfo" ;

 
$(document).ready(function() 
{
	//window.setTimeout(function(){
		var jqxhr = $.ajax({
			url: StreamInfoUrl, 
			timeout: 5000,
			beforeSend: function(){
				var evt = new CustomEvent(StreamInfoEvents['StreamInfoQuerying'], {'detail': StreamInfoUrl});
				window.dispatchEvent(evt);
			},
			success: function(data) 
			{	
				var stream_title = $('#stream_title')[0];
				var stream_subtitle = $('#stream_subtitle')[0];
				var stream_game = $('#stream_game')[0];
				
				stream_title.innerHTML = data.title;
				stream_subtitle.innerHTML = data.subtitle;
				stream_game.innerHTML = data.game;
				
				var evt = new CustomEvent(StreamInfoEvents['StreamInfoReady'], {'detail': data});
				window.dispatchEvent(evt);
			},
			error: function(xhr, status, error) 
			{
				var evt = new CustomEvent(StreamInfoEvents['StreamInfoFail'], {'detail': error});
				window.dispatchEvent(evt);
			}
		});
	//},500);
});
