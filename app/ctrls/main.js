var app = angular.module('app', ['ngMaterial','ui.router'])
.config(($mdThemingProvider, $stateProvider, $urlRouterProvider)=>{
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('orange');

  $urlRouterProvider.otherwise("/music");

  $stateProvider.state('music',{
    url:"/music",
    templateUrl:'app/views/music.html'
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


angular.bootstrap(app);
