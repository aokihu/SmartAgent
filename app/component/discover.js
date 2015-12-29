'use strict';

angular.module('app')
.component('discover',{
  template:`
  <div style="border-top:1px solid rgba(0,0,0,0.15)" layout>
    <md-button flex ng-if="!connected" ng-click="openDeviceDiscover($event)">
        <md-icon>cast</md-icon>
        搜索设备
    </md-button>

    <md-button flex ng-if="connected" ng-click="openDeviceDiscover($event)">
        <md-icon>cast_connected</md-icon>
        连接:{{device.model}}
    </md-button>
  </div>
  `,
  controller: ($scope, $mdDialog, $mdMedia, SAMQTT, SADiscover) => {
    // 设备是否处于连接状态
    $scope.connected = false;
    $scope.connectDevice = null;

    // 打开搜索设备对话框
    $scope.openDeviceDiscover = (ev) =>{

      $mdDialog.show({
        controller: DeviceDialogCtrl,
        templateUrl: 'app/views/dialog.device.discover.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true
      })
      .then(function(device) {
        $scope.device = device;
        SAMQTT.setServer(device.ip).connect();
        SADiscover.stop();
      }, function(){
        SADiscover.stop();
      })
    }

    // 监听设备离线消息
    $scope.$on('deviceOffine', (ev, data)=>{
      $scope.connected = false;
      $scope.$apply();
    });

    $scope.$on('deviceOnline', (ev, data)=>{
      $scope.connected = true;
      // $scope.connectDevice = null;
      $scope.$apply();
    });
  }
});


//
// 搜索设备对话框
//
function DeviceDialogCtrl($scope, $mdDialog, $timeout, $mdToast, SADiscover){

  $scope.devices = null;

  SADiscover.start();

  // 直接关闭，不做任何行为
  $scope.close= ()=>{
    $mdDialog.cancel();
  }

  // 关闭，并选择设备
  $scope.choose = (index) => {
    $mdDialog.hide(JSON.parse(JSON.stringify($scope.devices[index])));
  }

  $scope.$on('NewDeviceFound', (ev,devices)=>{
    // console.log(data)
    $scope.devices = devices;
    $scope.$apply();
  })

}
