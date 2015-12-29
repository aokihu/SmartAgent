'use strict';

//
// 侧边导航栏
//
angular.module('app')
.component('sidenavList', {
  template:`
  <md-list flex ng-cloak>
    <md-list-item ng-repeat="menu in menus">
      <md-button ng-href="#/{{menu.state}}" ng-class="{'md-primary md-raised':isCurrent($index)}" flex>
        <md-icon>{{menu.icon}}</md-icon>
        {{menu.title}}
      </md-button>
    </md-list-item>
  </md-list>
  `,
  controller: ($scope,$state,$mdToast, $document) => {
    $scope.menus = [
      {title:"音乐管理",icon:'library_music', state:'music'},
      {title:"定时管理",icon:'access_time', state:'timer'},
      // {title:"动作管理",icon:'compare_arrows', state:'action'},
      {title:"系统管理",icon:'settings', state:'system'}
    ];

    $scope.isCurrent = (index) => {
      let menu = $scope.menus[index];
      return $state.includes(menu.state);
    }
  }
});
