'use strict';

//
// 定时控制服务
//
function SAScheduleService($rootScope, SAMQTT){

  let schedule = []; // 定时时刻表

  /**
   * 获取所有的时刻表
   */
  this.getList = () => {
    SAMQTT.send('/local/timer/get/schedule');
    return '/local/timer/pub/schedule';
  }

  this.add = (item) => {
    SAMQTT.send('/local/timer/set/add', JSON.stringify(item));
  }

  this.remove = (id) => {
    SAMQTT.send('/local/timer/set/remove', JSON.stringify({'id':id}));
  }

  this.update = (item) => {
    SAMQTT.send('/local/timer/set/update', JSON.stringify(item));
  }


  // 注册监听事件

}
