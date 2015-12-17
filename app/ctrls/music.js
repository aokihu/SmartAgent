'use strict';

function MusicManager($scope, SAMQTT){


  $scope.library = [
    {title:"hello"}
  ];

}


// @controller
// 音乐播放器控制器
function MusicPlayerCtrl($scope, SAMQTT){

  // 播放器状态
  $scope.playing = false;

  $scope.$on('updateMusicStatus', (evt, data)=>{
    console.log('Update Music Status', data);
    $scope.$apply(()=>{
      $scope.playing = data.playing;
    })
  });

  /**
   * 播放单曲
   * @return {[type]} [description]
   */
  $scope.play = () => {
    SAMQTT.send('music play',{file:"/Users/aokihu/Projects/SmartCore/test2.mp3"});
  }

  $scope.stop = () => {
    SAMQTT.send('music stop');
  }
}
