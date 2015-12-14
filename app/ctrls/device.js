'use strict';

function DeviceManager($scope, $mdDialog, $mdMedia, SAMQTT){

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
      // $scope.connected = true;
      $scope.device = device;
      SAMQTT.setServer(device.ip).connect();
    })
  }


  // 监听设备离线消息
  $scope.$on('deviceOffine', (ev, data)=>{
    $scope.connected = false;
    // $scope.connectDevice = null;
    $scope.$apply();
  });

  $scope.$on('deviceOnline', (ev, data)=>{
    $scope.connected = true;
    // $scope.connectDevice = null;
    $scope.$apply();
  });
}

function DeviceDialogCtrl($scope, $mdDialog, $timeout, $mdToast, SADiscover){

  $scope.devices = null;

  SADiscover.start();

  // 直接关闭，不做任何行为
  $scope.close= ()=>{
    $mdDialog.cancel();
    SADiscover.stop();
  }

  // 关闭，并选择设备
  $scope.choose = (index) => {
    $mdDialog.hide(JSON.parse(JSON.stringify($scope.devices[index])));
    SADiscover.stop();
  }

  $scope.$on('NewDeviceFound', (ev,devices)=>{
    // console.log(data)
    $scope.devices = devices;
    $scope.$apply();
  })

}
