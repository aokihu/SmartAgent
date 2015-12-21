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
    return '/local/db/pub/list/music';
  }

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
