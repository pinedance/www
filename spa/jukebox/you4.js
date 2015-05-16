var $youtube = {}
$youtube.done = false;

function onYouTubeIframeAPIReady() {
    alert("yes")
    $youtube.body = new YT.Player('myplayer', {
        events: {
            'onReady': $youtube.onPlayerReady,
            'onStateChange': $youtube.onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
$youtube.onPlayerReady = function (event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

$youtube.onPlayerStateChange = function (event) {
    if (event.data == YT.PlayerState.PLAYING && !$youtube.done) {
        setTimeout( $youtube.stopVideo, 6000);
        $youtube.done = true;
    }
}

$youtube.stopVideo = function () {
    $youtube.body.stopVideo();
}
