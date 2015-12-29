'use strict';

angular.module('app')
.component('scheduleList',{

  template:`
  <md-subheader>{{schedule.length}}条任务</md-subheader>
  <md-list>
    <md-list-item ng-cloak md-no-ink ng-repeat="item in schedule" layout ng-click="edit($event,$index)">
      <h3 style="display:block;width:120px">
        <md-icon style="margin-right:6px">alarm</md-icon>{{item.alarm}}
      </h3>

      <div class="md-list-item-text" flex>
        <md-chips ng-model="item.displayDw" readonly="true" class="schedule-list">
          <md-chip-template>
            <span>星期 {{$chip}}</span>
          </md-chip-template>
        </md-chips>
      </div>

      <md-icon flex="5" style="font-size:32px;">{{item.icon}}</md-icon>
      <md-divider></md-divider>
    </md-list-item>
  </md-list>
  `,
  controller: ($scope, SASchedule ,$mdDialog) => {
    $scope.schedule = []; // 定时表

    const evtGetListPub = SASchedule.getList();

    // 显示定时列表
    $scope.$on(evtGetListPub, (evt, data) => {

      $scope.schedule = data

      $scope.$apply();

    });

    //
    // 编辑定时
    //
    $scope.edit = (evt,index) =>{

      $mdDialog.show({
         controller: SAScheduleEditCtrl,
         templateUrl: 'app/views/timer.edit.html',
         parent: angular.element(document.body),
         targetEvent: evt,
         clickOutsideToClose:true,
         escapeToClose:true,
         locals:{index:index}
       })
       .then(function(answer) {
         $scope.status = 'You said the information was "' + answer + '".';
       }, function() {
         $scope.status = 'You cancelled the dialog.';
       });


    }
  }

});


//
// 时刻表编辑控制器
//
function SAScheduleEditCtrl($scope,$mdDialog, SASchedule, $mdBottomSheet, index){

  $scope.title = "编辑定时任务";

  //
  // 编辑的时刻项目
  //
  $scope.localSchd = SASchedule.schedule[index];

  $scope.hours = SASchedule.hours;
  $scope.minutes = SASchedule.minutes;
  $scope.seconds = SASchedule.minutes;
  $scope.dw = SASchedule.dw;

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  /**
   * 删除定时记录
   * @return {[type]} [description]
   */
  $scope.remove = function(){
    SASchedule.remove($scope.localSchd.id);
    $scope.hide();
  }

  /**
   * 保存定时记录
   */
  $scope.update = function(){
    let task = {
      id:$scope.localSchd.id,
      dw:$scope.localSchd.dw,
      h:$scope.localSchd.h,
      m:$scope.localSchd.m,
      s:$scope.localSchd.s,
      action:$scope.localSchd.action,
      data:$scope.localSchd.data
    }

    SASchedule.update(task);
    $scope.hide();
  }

  /**
   * 选择动作
   * @return {[type]} [description]
   */
  $scope.chooseAction = ($event) =>{

  }

  //
  // 判断工作日是否存在
  //
  $scope.exists = (d) => {
    let _d = d === '日' ? 7 : d;
    return $scope.localSchd.dw.join('').indexOf(_d) > -1;
  }

  //
  // 选择工作日
  //
  $scope.toggle = (d) =>{
    let _d = d === '日' ? 7 : d;
    let idx = $scope.localSchd.dw.join('').indexOf(_d);
    if(idx > -1){
      $scope.localSchd.dw.splice(idx,1);
    }else {
      $scope.localSchd.dw.push(_d);
    }
  }

}
