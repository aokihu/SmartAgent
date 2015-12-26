'use strict';

function SAMusicService($rootScope,$q,SAMQTT){

  var deferred = $q.defer();
  this.library = []; // 音乐库

  /**
   * 获取音乐列表
   * @return {[type]} [description]
   */
  this.getMusicLibrary = () =>{
    SAMQTT.send('/local/db/list/music');
    return 'pub/local/db/list/music';
  }

  /**
   * 处理获取的音乐列表数据
   */
  $rootScope.$on('/local/db/pub/list/music', (evt, data)=>{

    this.library = data.map((item) => {
      let dotIndex = item.filename.indexOf(".");
      item.title = item.filename.substr(0,dotIndex);
      if(item.title.length > 10){
        item.title = item.title.substr(0, 9) + '...';
      }
      return item;
    });

    $rootScope.$broadcast('pub/local/db/list/music', this.library);
  });

  /**
   * 获取播放器状态
   * @return {[type]} [description]
   */
  this.getPlayerStatus = () => {
    SAMQTT.send('/local/music/get/status');
    return '/local/music/pub/status';
  }

  /**
   * 播放指定音乐
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  this.play = (music) => {
    let file = `${music.path}/${music.filename}`;
    SAMQTT.send('/local/music/set/play/single', {file:file});
  }

  /**
   * 停止播放音乐🙌
   * @return {[type]} [description]
   */
  this.stop = () => {
    SAMQTT.send('/local/music/set/stop');
  }
}
