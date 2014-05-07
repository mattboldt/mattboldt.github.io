$(function(){

	// Open links with .target-link class in a new tab
	// if setting is set to "on"

	// localStorage.removeItem("mb-link-target");
	$("._BLANK").click(function(){
		var state = $("#_BLANK-status");

		if ($(state).val() === "on"){
			blankLinks("false");
			$(state).val("off");
			$(this).val("Off");
			$(".target-text").text("Links open in the same window");
		}
		else{
			blankLinks("true");
			$(state).val("on");
			$(this).val("On");
			$(".target-text").text("Links open in a new tab");
		}
	});


	var blankLinks = function(state){
		var state = state;
		var links = $(".tg");
		if (state === "true"){
			$.each(links, function(index){
				$(links).attr("target", "_BLANK");
			});
			localStorage.setItem("mb-link-target", "blank");
		}
		else{
			$.each(links, function(index){
				$(links).removeAttr("target");
			});
			localStorage.removeItem("mb-link-target");
		}

	}

	if( localStorage.getItem("mb-link-target") == "blank" ){
		blankLinks("true");
		$("#_BLANK-status").val("on");
		$("._BLANK").val("On");
		$(".target-text").text("Links open in a new tab");
	}

	// get scroll position
	$(".module-body").scroll(function(){
		window.scrollPos = $(".module-body").scrollTop();
	});
	if(localStorage.getItem("mb-scroll-pos")){
		var returnData = JSON.parse(localStorage.getItem("mb-scroll-pos"));
		if (returnData[1] == window.location.pathname){
			$(".module-body").scrollTop(returnData[0]);
		}
	}
	window.onbeforeunload = function(){
		var posData = [scrollPos, window.location.pathname];
		localStorage.setItem("mb-scroll-pos", JSON.stringify(posData));
	};

});

