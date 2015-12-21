'use strict';
/**
 * MQTT 消息代理
 */

const mqtt = require('mqtt');
const mqtt_regex = require('mqtt-regex');

const actions = {
  "music play":"/local/music/set/play/single",
  "music play playlist":"/local/music/set/play/playlist",
  "music stop":"/local/music/set/stop"
}

const messages = [
  '/local/db/pub/list/music',
  '/local/music/pub/status'
]

function SAMQTTService($rootScope){

  let client = null;
  let server = null;
  let port   = 1883;

  /**
   * 建立连接
   * @return {[type]} [description]
   */
  function connect(){
    if(server && port){
      client = mqtt.connect(`mqtt://${server}:${port}`,{
        clientId:`sm_${Math.random().toString(16).substr(2,8)}`,
        keepalive:0
      });

      // 注册感兴趣的事件
      messages.forEach((msg)=>{
        console.log('register event:', msg);
        client.subscribe(msg);
      });

      /**
       * 处理接受数据
       * @param  {[type]} 'message' [description]
       * @param  {[type]} (topic,   msg           [description]
       * @return {[type]}           [description]
       */
      client.on('message', (topic, msg)=>{
        let _topic = topic.toString();
        let _data   = JSON.parse(msg.toString());

        $rootScope.$broadcast(_topic, _data);

      });

      // 设备连接事件
      client.on('connect', () => {
        // 获取播放器状态
        client.publish('/local/music/get/status');
        // 获得音乐列表
        client.publish('/local/db/list/music');
        $rootScope.$broadcast('deviceOnline');
      })

      // 设备丢失事件
      client.on('close', ()=>{
        $rootScope.$broadcast('deviceOffine');
      })

      client.on('offline', ()=>{
        $rootScope.$broadcast('deviceOffine');
      })

      // 重新连接事件
      client.on('reconnect', ()=>{
        // $rootScope.$broadcast('deviceOnline');
      });
    }
  }


  /**
   * 断开连接
   * @return {[type]} [description]
   */
  function close(){
    client ? client.end() : null;
  }

  //
  // 公开方法定义
  //
  this.setServer = (_srv_)=>{
    server = _srv_;
    return this;
  }

  this.setPort  = (_port_)=>{
    port = _port_;
    return this;
  }

  this.connect = ()=>{
    connect();
    return this;
  }

  /**
   * 发送指令
   * @param  {string} action 指令名称
   * @param  {object|array} data   附加数据
   * @return {[type]}        [description]
   */
  this.send = (action,data)=>{

    // 没有连接设备的时候发出警告
    if(client == null || client.on == null){
        $rootScope.$broadcast('error',{error:'设备没有连接!'});
        // throw("device not connected");
        return this;
    }

    client.publish(action, JSON.stringify(data));
    return this;
  }

}
