var youtubePlayer;
var isYoutubePlayerReady = false;
	  
  function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtube1', {
      events: {
        'onReady': onPlayerReady
      }
    });
  }
  
  function onPlayerReady() {
    isYoutubePlayerReady = true;
  }
  
  function playYoutubeVideo() {
    if(isYoutubePlayerReady) {
      youtubePlayer.playVideo();
    }
  }
  
  function pauseYoutubeVideo() {
    if(isYoutubePlayerReady) {
      youtubePlayer.pauseVideo();
    }
  }
  
  function stopYoutubeVideo() {
    if(isYoutubePlayerReady) {
      youtubePlayer.stopVideo();
    }
  }