'use strict';

//
// 定时控制服务
//
function SAScheduleService($rootScope, SAMQTT){

  this.schedule = []; // 定时时刻表

  this.hours = range(0,23);
  this.minutes = range(0,59);
  this.dw = [1,2,3,4,5,6,'日'];


  /**
   * 获取所有的时刻表
   */
  this.getList = () => {
    SAMQTT.send('/local/timer/get/schedule');
    return 'pub/local/timer/schedule';
  }

  /**
   * 处理获取的列表数据
   */
  $rootScope.$on('/local/timer/pub/schedule', (evt, data) =>{

    this.schedule = data.map( (item) =>{

      //
      // 格式化时间格式
      //
      let h = item.h < 10 ? "0"+item.h : item.h
      let m = item.m < 10 ? "0"+item.m : item.m
      let s = item.s < 10 ? "0"+item.s : item.s
      item.alarm = `${h}:${m}:${s}`;

      // 更改星期天的显示
      item.displayDw = item.dw.map( (d) => {
        return d===7 ? "日" : d;
      })

      // 设置图标
      item.icon = {
        'play music':'play_arrow',
        'play playlist':'playlist_play'
      }[item.action];

      return item;

    } );

    $rootScope.$broadcast('pub/local/timer/schedule', this.schedule);
  })

  // 添加时刻表任务
  this.add = (item) => {
    SAMQTT.send('/local/timer/set/add', JSON.stringify(item));
  }

  // 删除时刻表
  // id:String 时刻表任务ID
  this.remove = (id) => {
    SAMQTT.send('/local/timer/set/remove', JSON.stringify({id:id}));
  }

  // 更新时刻表
  this.update = (item) => {
    SAMQTT.send('/local/timer/set/update', JSON.stringify(item));
  }


  // 内部方法
  function range(start, end){
    var ret = [];
    for(; start <= end; start++){
      ret.push(start);
    }
    return ret;
  }

}
