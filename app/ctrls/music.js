'use strict';

// @controller
function MusicManager($scope, SAMusic){

  // 播放器状态
  $scope.playing = false;
  $scope.selectIndex = 0;
  $scope.library = []; // 音乐列表

  // 请求获取音乐列表
  let evtGetMusicLibrary = SAMusic.getMusicLibrary()

  // 处理获取音乐列表事件
  $scope.$on(evtGetMusicLibrary, (evt, data) => {
    console.log(data);
    $scope.$apply(()=>{
      $scope.library = data.map((item) => {
        item.title = item.filename;
        return item;
      });
    });

  });

  /**
   * 播放单曲
   * @return {[type]} [description]
   */
  $scope.play = (index) => {
    console.log(index);
    SAMusic.play($scope.library[index]);
  }

}

//
// 音乐播放控制器
//
function MusicPlayer($scope, SAMusic){

  $scope.status = 'idle'; // 播放器状态

  $scope.stop = () => {
    SAMusic.stop();
  }

  let evtGetPlayerStatus = SAMusic.getPlayerStatus();

  $scope.$on(evtGetPlayerStatus, (evt, data) => {
    console.log(data);
    $scope.status = data.status;
    $scope.$apply();
  });

}
