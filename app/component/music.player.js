'use strict';

angular.module('app')
.component('musicPlayer', {
  template:`
  <div layout='row' flex layout-align="center center" style="padding-top:10px" ng-show='status=="playing"'>
    <md-button class="md-fab md-primary md-hue-2 md-mini" ng-click="stop()" >
      <md-icon>stop</md-icon>
    </md-button>
  </div>
  `,
  controller: ($scope, SAMusic) => {
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

});
