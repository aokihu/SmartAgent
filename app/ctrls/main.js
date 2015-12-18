var app = angular.module('app', ['ngMaterial','ui.router'])
.config(($mdThemingProvider, $stateProvider, $urlRouterProvider)=>{
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('indigo');

  $mdThemingProvider.theme('toast')
  .primaryPalette('blue')
  .backgroundPalette('yellow')
  .accentPalette('indigo');

  $urlRouterProvider.otherwise("#/music");

  $stateProvider.state('music',{
    url:"/music",
    views:{
      "":{
        templateUrl:'app/views/music.html',
        controller:'SAMusicManagerCtrl'
      },
      "topmenu":{
        templateUrl:'app/views/music.topmenu.html',
        controller:"SAMusicPlayerCtrl"
      }
    }
  })
  .state('system',{
    url:"/system",
    views:{
      "":{
        templateUrl:'app/views/system.html',
        controller:'SASystemCtrl'
      },
      "topmenu":{
        templateUrl:'app/views/system.topmenu.html'
      }
    }
  })
  .state('timer',{
    url:'/timer',
    views:{
      "":{
        template:"timer",
        controller:'SAMusicManagerCtrl'
      },
      "topmenu":{
        templateUrl:"app/views/timer.topmenu.html"
      }
    }
  })
})
.service('SADiscover', DiscoverService)
.service('SAMQTT',SAMQTTService)
.controller('SASideMenu', SideMenuCtrl)
.controller('SADeviceManager',DeviceManager)
.controller('SAMusicManagerCtrl', MusicManager)
.controller('SAMusicPlayerCtrl', MusicPlayerCtrl)
.controller('SASystemCtrl', SASystemCtrl)
.controller('mainCtrl', ($scope, $mdDialog)=>{

  //
  // 主控制器
  //

  // 处理系统错误
  $scope.$on('error', (ev, data)=>{
    alert = $mdDialog.alert({
          title: '错误',
          textContent: data.error,
          ok: '确认'
        });
    $mdDialog
      .show( alert )
      .finally(function() {
        alert = undefined;
      });
  });

})

angular.bootstrap(app);
