'use strict';
var udpSock = require('dgram'),
	os = require('os');


function DiscoverService($rootScope,$interval){

  // 启动Discover服务
  var server = udpSock.createSocket("udp4");
  server.bind(9901, function(){
  	server.setBroadcast(true);
  	server.setMulticastTTL(128);
  	server.addMembership("234.0.0.1");
  });

  let FoundDevices = new Set();

  server.on('message', (msg, client) => {

  	let device = JSON.parse(msg.toString());

    // 搜索是否有相同IP地址的设备存在

    let isExist = false;
    FoundDevices.forEach((val,key) => {
      if(val.ip == device.ip){
        isExist = true;
        return false;
      }

    });

    // IP地址不同就将设备加入到列表中
    if(!isExist)
    {
      FoundDevices.add(device);
    }

    console.log(Array.from(FoundDevices));

    $rootScope.$broadcast('NewDeviceFound', Array.from(FoundDevices))

  });

  var retMsg = new Buffer('hello');
  var timer = null;

  /**
   * 开始搜索设备
   */
  this.start = ()=>{

    timer = $interval(()=>{
      server.send(retMsg,0,retMsg.length,9900,'234.0.0.1');
    },3000);

  }

  /**
   * 停止搜索设备
   */
  this.stop = ()=>{
    $interval.cancel(timer);
    FoundDevices.clear();
  }



};
