var app = angular.module('app', ['ngMaterial','ui.router'])
.config(($mdThemingProvider, $stateProvider, $urlRouterProvider)=>{
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
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
        templateUrl:'app/views/music.topmenu.html'
      }
    }
  })
  .state('system',{
    url:"/system",
    template:"system"
  })
  .state('timer',{
    url:'/timer',
    template:'timer'
  })
})
.service('SADiscover', ['$rootScope','$interval', DiscoverService])
.controller('SASideMenu', ['$scope', SideMenuCtrl])
.controller('SADeviceManager',['$scope','$mdDialog','$mdMedia','SADiscover', DeviceManager])
.controller('SAMusicManagerCtrl', MusicManager)


angular.bootstrap(app);
