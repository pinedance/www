var app = angular.module('myApp', ["firebase", 'youtube-embed', 'ngRoute', 'ngCookies', 'ui.bootstrap','cgPrompt']);

app.filter('secondsToDateTime', [ function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]) // http://stackoverflow.com/questions/28394572/angularjs-seconds-to-time-filter

app.controller('mainCtrl', ['$scope', "$firebase", "$interval", "$http", "$window", "$cookieStore", "prompt",
function($scope, $firebase, $interval, $http, $window, $cookieStore, prompt){
    
    $scope.logout = function(){ 
        $cookieStore.remove('login') ; 
        $scope.loginState = $cookieStore.get('login') ; 
        console.log($cookieStore.get('login'))
        $window.location.reload();  // http://stackoverflow.com/questions/21885518/angularjs-reload-page
    }

    function loginSession(value){
            prompt({
                    title: 'login',
                    message: 'input password',
                    input: true,
                    label: 'answer?',
                    value: value
            }).then(function(answer){
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                    $http.post('http://myapibox.herokuapp.com/auth', {serial: answer} ).
                      success(function(data, status, headers, config) {
                        console.log(data)
                        if(data.auth){
                            $cookieStore.put('login', true)
                            $scope.loginState = $cookieStore.get('login'); 
                            linkFirebase()
                        } else {
                            loginSession('wrong password')
                        }
                }).
                      error(function(data, status, headers, config) {
                        console.log(data)
                });        
            })
        }

    if(!$cookieStore.get('login')){
        // login session
        loginSession()
    } else {
        $scope.loginState = $cookieStore.get('login'); 
        linkFirebase()
    }
    
    var isMobile = (function isMobileOrTablet() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }()); // http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    
    
    var ref, mainObj
    
    function linkFirebase(){
        ref = new Firebase("https://brilliant-torch-7744.firebaseio.com/"); 
        mainObj = $firebase(ref).$asObject();
        mainObj.$bindTo($scope, "data").then(function() {
            setPlayLists();
            setSongs();
            $scope.jukebox.ctrl.newId($scope.currentSong.url);  // https://www.youtube.com/watch?v=rg2_PZ0kgBo
            $scope.$broadcast('loadYT', true);
        });        
    }


    function setPlayLists(){
        var _PlayList = Object.keys( $scope.data )
        $scope.playlists = _PlayList.slice(2, _PlayList.length);
        $scope.currentPlaylist = $scope.playlists[0]; 
        return true;
    };
    
    function setSongs(){
        $scope.songs = $scope.data[$scope.currentPlaylist]
        $scope.currentSong = $scope.songs.current();   //present playing song init
        return true;
    };
    
    var rindex = [];
    
    (function init(){
        $scope.newSong = {
           'title': "",
           'artist': "", 
           'url': "",
           'type': "youtube",
        };

        $scope.jukebox = {
            state: {}
        }

        $scope.random = false;

        $scope.randomize = function(){
            $scope.random = !$scope.random;
            if($scope.random){
                rindex = $scope.songs.keys().suffle();
            }
        };
    }());

   ///////////////////////////// jukebox ////////////////////////////////

    
    $scope.$on('onPlayerReady', function(event, data){
        $scope.jukebox.state = {
            isPlay: function(){
                if(this.now === 1){return true};
                return false;
            },
            isMuted: function(){
                return data.target.isMuted();
            },
            runTime: data.target.getDuration(),
            progress: function(){
                return (data.target.getCurrentTime() / this.runTime * 100) + '%';
            }
        }
        $interval( function(){ data.target.getCurrentTime() }, 500, false);
        console.log("on player ready")
        $scope.$apply(function(){
            $scope.jukebox.state.now = data.target.getPlayerState();
        })
        
        if(isMobile){return}  // 모바일인 경우 자동 재생 되지 않으므로 정지시킴
        $scope.jukebox.ctrl.play();
    });
    
//    -1 –시작되지 않음, 0 – 종료, 1 – 재생 중, 2 – 일시중지, 3 – 버퍼링, 5 – 동영상 신호
    $scope.$on('onPlayerStateChange', function (event, data) {
        
        if(data.playerState == 0){ $scope.jukebox.ctrl.next(); }
        $scope.$apply(function(){
            $scope.jukebox.state.now = data.playerState;
        })
        console.log("player state: " + $scope.jukebox.state.now)
        
    });
    
    $scope.$on('onPlayerError', function (event, data) {
        $scope.jukebox.ctrl.next();
    });
        
    $scope.jukebox.ctrl= {
        newId: function(url){
            $scope.ytPlayerData.id = $scope.youtube_url2id(url)
        },
        play: function(){
            $scope.ytPlayer.playVideo();
        },
        pause: function(){
            $scope.ytPlayer.pauseVideo(); 
        },
        previous: function(){
            if($scope.random){
                var _idx = rindex.prev()
                $scope.songs.setnow(_idx);
                $scope.currentSong = $scope.songs.current();
            } else {
                $scope.currentSong = $scope.songs.prev();
            }
            $scope.jukebox.ctrl.newId($scope.currentSong.url)
         //   $scope.jukebox.ctrl.play();
        },
        next: function(){
            if($scope.random){
                var _idx = rindex.next()
                $scope.songs.setnow(_idx);
                $scope.currentSong = $scope.songs.current();
            } else {
                $scope.currentSong = $scope.songs.next();
            }
            $scope.jukebox.ctrl.newId($scope.currentSong.url)
         //   $scope.jukebox.ctrl.play();
        },
        playThis: function(index){
            $scope.currentSong = $scope.songs[index];
            $scope.songs.setnow(index);
            $scope.jukebox.ctrl.newId($scope.currentSong.url)
         //   $scope.jukebox.ctrl.play();
        },
        mute: function(){
            if( $scope.jukebox.state.isMuted() ){
                $scope.ytPlayer.unMute();
            } else {
                $scope.ytPlayer.mute();
            }
        }
    }
    
    
   ///////////////////////////// playlist ////////////////////////////////
    
    $scope.reloadPlayList = function(listname){
        $scope.currentPlaylist = listname;
        $scope.songs = $scope.data[$scope.currentPlaylist];
        $scope.editingPlayList = false;
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
        $scope.newNamedPlaylist = $scope.currentPlaylist;
    }
    
     $scope.renamePlayList = function(event){
        if(event.keyCode != 13){return};
        if($scope.newNamedPlaylist == ""){return};
        if($scope.newNamedPlaylist == $scope.currentPlaylist){return}; 
        $scope.data[$scope.newNamedPlaylist] = $scope.data[$scope.currentPlaylist];
        delete $scope.data[$scope.currentPlaylist];
        setPlayLists();
        $scope.currentPlaylist = $scope.newNamedPlaylist;
        setSongs();
        $scope.editingPlayList = false; 
    };
    
    $scope.deletePlayList = function(){
        if(confirm( "이 플레이리스트를 정말 지우시렵니까? 다시 복구할 수 없습니다.") ){
            delete $scope.data[$scope.currentPlaylist];
            setPlayLists();
            $scope.currentPlaylist = $scope.playlists[0]; 
            setSongs();
        };
    };

   ///////////////////////////// song ////////////////////////////////
    
    $scope.add = function(){
        $scope.data[$scope.currentPlaylist].push({
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
        if( confirm("이 노래를 정말 지우시렵니까? 다시 복구할 수 없습니다.") ){
            var index = $scope.data[$scope.currentPlaylist].indexOf(song);
            $scope.data[$scope.currentPlaylist].splice(index, 1);
            setSongs();
        }
    };

    var editingSong = "";
    
    $scope.edit = function(song){
        $scope.updatedSong = song;
        editingSong = song;
        $scope.editing = true; 
    };

    $scope.update = function(updatedSong){
        var index = $scope.data[$scope.currentPlaylist].indexOf(editingSong);
        $scope.data[$scope.currentPlaylist][index] = $scope.updatedSong;
        setSongs();
        $scope.editing = false; 
    };

    $scope.up = function(song){
        var i = $scope.data[$scope.currentPlaylist].indexOf(song);
        if(i==0){
            return false
        } else {
            var j = i - 1 ;
            var prev = $scope.data[$scope.currentPlaylist][j];
            $scope.data[$scope.currentPlaylist][j] = song;
            $scope.data[$scope.currentPlaylist][i] = prev;
        }
        setSongs();
    };

    $scope.down = function(song){
        var i = $scope.data[$scope.currentPlaylist].indexOf(song);
        if(i==$scope.songs.length-1){
            return false
        } else {
            var j = i + 1;
            var next = $scope.data[$scope.currentPlaylist][j];
            $scope.data[$scope.currentPlaylist][j] = song;
            $scope.data[$scope.currentPlaylist][i] = next;
        }
        setSongs();
    };

    
    //http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
    $scope.youtube_url2id = function(url){ 
        var ytRegExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(ytRegExp);
        if (match && match[7].length==11){
            return match[7]
        }else{
            return "***********"
        }
    }

    
}]);