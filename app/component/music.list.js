'use strict';

angular.module('app')
.component('musicList', {
  template:`
  <md-grid-list
      md-cols-sm="3" md-cols-md="4" md-cols-gt-md="6"
      md-row-height-gt-md="1:1" md-row-height="4:3"
      md-gutter="18px" md-gutter-gt-sm="12px"
      style="margin:15px">
    <md-grid-tile ng-repeat="item in library"
                  md-colspan-sm="1"
                  ng-class="tile.background"
                  ng-cloak>
      <md-icon style="font-size:320%">queue_music</md-icon>
      <md-button class="md-primary md-fab md-mini float-right" ng-click="play($index)">
        <md-icon>play_arrow</md-icon>
      </md-button>
      <md-grid-tile-footer class="md-mini">
        <h3>{{item.title}}</h3>
      </md-grid-tile-footer>
    </md-grid-tile>
  </md-grid-list>

  <div ng-if="library.length == 0" flex layout="column" layout-align="center center">
    <div flex><h1 class="uninteractive">请连接服务器</h1></div>
  </div>
  `,
  bindings:{
    library: '='
  },
  controller: ($scope,  $mdBottomSheet, SAMusic) => {

    // 播放器状态
    $scope.playing = false;
    $scope.selectIndex = 0;
    $scope.library = []; // 音乐列表


    // 请求获取音乐列表
    let evtGetMusicLibrary = SAMusic.getMusicLibrary()

    // 处理获取音乐列表事件
    $scope.$on(evtGetMusicLibrary, (evt, data) => {

      $scope.library = data;
      $scope.$apply();

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
});
