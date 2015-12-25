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
        controller:'SAMusicPlayerCtrl'
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
        templateUrl:"app/views/timer.html",
        controller:'SAScheduleCtrl'
      },
      "topmenu":{
        templateUrl:"app/views/timer.topmenu.html"
      }
    }
  })
})
.service('SADiscover', DiscoverService)
.service('SAMQTT',SAMQTTService)
.service('SAMusic',SAMusicService)
.service('SASchedule',SAScheduleService)
.controller('SASideMenu', SideMenuCtrl)
.controller('SADeviceManager',DeviceManager)
.controller('SAMusicManagerCtrl', MusicManager)
.controller('SAMusicPlayerCtrl', MusicPlayer)
.controller('SASystemCtrl', SASystemCtrl)
.controller('SAScheduleCtrl',SAScheduleCtrl)
.controller('mainCtrl', ($scope, $mdDialog ,$mdToast)=>{

  var errToast = null;
  //
  // 主控制器
  //

  // 处理系统错误
  $scope.$on('error', (ev, data)=>{

    if(errToast == null){
      errToast = $mdToast.simple()
            .textContent(data.error)
            .action('确定')
            .highlightAction(true)
            .position('bottom right');
      $mdToast.show(errToast)
      .then(()=>{
          errToast = null;
      }, () => {
          errToast = null;
      });
    }

  });



})

angular.bootstrap(app);
