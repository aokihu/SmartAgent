
var app = angular.module('app', ['ngMaterial','ui.router'])
.config(($mdThemingProvider, $stateProvider, $urlRouterProvider)=>{
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('indigo');

  $mdThemingProvider.theme('dialogTheme')
  .primaryPalette('green')
  .warnPalette('red')
  .accentPalette('indigo');

  $urlRouterProvider.otherwise("#/music");

  $stateProvider.state('music',{
    url:"/music",
    views:{
      "":{
        template:'<music></music>',
      },
      "topmenu":{
        template:'<music-player></music-player>',
      }
    }
  })
  .state('system',{
    url:"/system",
    views:{
      "":{
        template:'<system-info></system-info>',
        // controller:'SASystemCtrl'
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
        template:"<schedule-list></schedule-list>"
        // controller:'SAScheduleCtrl'
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
