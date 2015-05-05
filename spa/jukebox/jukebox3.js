(function(){
var app = angular.module('myApp', ["firebase", "videosharing-embed"]);

app.controller('MainCtrl', ["$scope", "$firebase", function ($scope, $firebase) {

    var ref = new Firebase("https://brilliant-torch-7744.firebaseio.com/"); 
    var mainObj = $firebase(ref).$asObject();

    mainObj.$bindTo($scope, "data").then(function() {
        setPlayLists();
        $scope.pplaylist = $scope.playlists[0]; 
        setSongs();
    });

    var youtubePlayer;
    var isYoutubePlayerReady = false;
    
    function onYouTubeIframeAPIReady() {
        youtubePlayer = new YT.Player('youtube1', {
          events: {
            'onReady': onPlayerReady
          }
        });
     };
     
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
  
   ////////////// playlist
    
    $scope.reloadPlayList = function(listname){
        $scope.pplaylist = listname;
        setSongs();
        $scope.editingPlayList = false;
    };
    
    var setPlayLists = function(){
        var tmpPlayList = Object.keys( $scope.data )
        $scope.playlists = tmpPlayList.slice(2, tmpPlayList.length);
    };
    
    var setSongs = function(){
        $scope.songs = $scope.data[$scope.pplaylist]
        $scope.ppsong = $scope.songs.current();   //present playing song init
        var id_tmp = $scope.ppsong.url.split("/")
        $scope.ppsong.id  = id_tmp[id_tmp.length-1]
    };
    
    $scope.addPlayList = function(event){
        if(event.keyCode != 13){return};
        if($scope.newPlaylist == ""){return};
        $scope.data[$scope.newPlaylist] = [];
        setPlayLists();
        delete $scope.newPlaylist;
    };
    
    
    $scope.editPlayList = function(){
        $scope.editingPlayList = true;
        $scope.newNamedPlaylist = $scope.pplaylist;
    }
    
     $scope.renamePlayList = function(event){
        if(event.keyCode != 13){return};
        if($scope.newNamedPlaylist == ""){return};
        if($scope.newNamedPlaylist == $scope.pplaylist){return}; 
        $scope.data[$scope.newNamedPlaylist] = $scope.data[$scope.pplaylist];
        delete $scope.data[$scope.pplaylist];
        setPlayLists();
        $scope.pplaylist = $scope.newNamedPlaylist;
        setSongs();
        $scope.editingPlayList = false; 
    };
    
    $scope.deletePlayList = function(){
        if(confirm("정말 지우게습니까?")){
        delete $scope.data[$scope.pplaylist];
        setPlayLists();
        $scope.pplaylist = $scope.playlists[0]; 
        setSongs();
        };
    };
    
    //// songs
    $scope.add = function(){
        $scope.data[$scope.pplaylist].push({
           'title': $scope.newSong.title,
           'artist': $scope.newSong.artist,
           'url': $scope.newSong.url,
           'type': "youtube",
           'ord': $scope.songs.length
         });
        $scope.newSong = {
           'title': "",
           'artist': "", 
           'url': "",
           'type': "youtube",
        };
        setSongs();
    };

    $scope.delete = function(song){
        var index = $scope.data[$scope.pplaylist].indexOf(song);
        $scope.data[$scope.pplaylist].splice(index, 1);
        setSongs();
    };

    var editingSong = "";
    
    $scope.edit = function(song){
        $scope.updatedSong = song;
        editingSong = song;
        $scope.editing = true; 
    };

    $scope.update = function(updatedSong){
        var index = $scope.data[$scope.pplaylist].indexOf(editingSong);
        $scope.data[$scope.pplaylist][index] = $scope.updatedSong;
        setSongs();
        $scope.editing = false; 
    };

    $scope.up = function(song){
        var i = $scope.data[$scope.pplaylist].indexOf(song);
        if(i==0){
            return false
        } else {
            var j = i - 1 ;
            var prev = $scope.data[$scope.pplaylist][j];
            $scope.data[$scope.pplaylist][j] = song;
            $scope.data[$scope.pplaylist][i] = prev;
        }
        setSongs();
    };

    $scope.down = function(song){
        var i = $scope.data[$scope.pplaylist].indexOf(song);
        if(i==$scope.songs.length-1){
            return false
        } else {
            var j = i + 1;
            var next = $scope.data[$scope.pplaylist][j];
            $scope.data[$scope.pplaylist][j] = song;
            $scope.data[$scope.pplaylist][i] = next;
        }
        setSongs();
    };

    
    //// player
    $scope.custom = {
        player: null,
        vars: {
            'modestbranding': 1
        }
    };
    
    ////// init vars    
    $scope.random = false;
    var rindex = [];
    
    $scope.randomize = function(){
        $scope.random = !$scope.random;
        if($scope.random){
            rindex = $scope.songs.keys().suffle();
        }
    };
    
    $scope.playThis = function(index){
        $scope.ppsong = $scope.songs[index];
        $scope.songs.setnow(index);
        $scope.play();
    };

    $scope.play = function(){
        if($scope.ppsong.type == "youtube"){
            onYouTubeIframeAPIReady();
            playYoutubeVideo();
        } else {
            $scope.mp3Player.playMp3();
        }
    };

    $scope.pause = function(){
        if($scope.ppsong.type == "youtube"){
            pauseYoutubeVideo();
        } else {
            $scope.mp3Player.stopMp3();   /////////////////////
        }
    };

    $scope.stepBackward = function(){
        if($scope.random){
            var _idx = rindex.prev()
            $scope.ppsong = $scope.songs[_idx];
            $scope.songs.setnow(_idx);
        } else {
            $scope.ppsong = $scope.songs.prev();
        }
        $scope.play();
    };

    $scope.stepForward = function(){
        if($scope.random){
            var _idx = rindex.next()
            $scope.ppsong = $scope.songs[_idx];
            $scope.songs.setnow(_idx);
        } else {
            $scope.ppsong = $scope.songs.next();
        }
        $scope.play();
    };

    $scope.$on('youtube.player.ended', function ($event, player) {
        $scope.stepForward();
    });
    
    $scope.$on('youtube.player.error', function ($event, player) {
        console.log("Oops, youtube error!");
        $scope.stepForward();
    });
    
}]); //MainCtrl

})(); //js
