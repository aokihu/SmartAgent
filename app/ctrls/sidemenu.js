'use strict';

function SideMenuCtrl($scope,$mdSidenav){


  $scope.menus = [
    {title:"音乐管理",icon:'library_music', state:'music'},
    {title:"定时管理",icon:'access_time', state:'timer'},
    {title:"系统管理",icon:'settings', state:'system'}
  ];



}
