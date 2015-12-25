'use strict';

//
// 定时任务控制器
//
function SAScheduleCtrl($scope, SASchedule){

  $scope.schedule = []; // 定时表

  const evtGetListPub = SASchedule.getList();

  // 显示定时列表
  $scope.$on(evtGetListPub, (evt, data) => {

    $scope.schedule = data.map( (item) =>{

      item.alarm = `${item.h}:${item.m}:${item.s}`;

      // 更改星期天的显示
      item.dw = item.dw.map( (d) => {
        return d===7 ? "日" : d;
      })


      console.log(item);
      return item;

    } );


    $scope.$apply();

  });

}
