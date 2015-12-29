angular.module('app')
// 系统信息
.component('systemInfo', {
  template:`
  <software-info></software-info>
  <md-divider></md-divider>

  <hardware-info></hardware-info>
  <md-divider></md-divider>

  <backup-info></backup-info>
  <md-divider></md-divider>

  <sction style="margin-bottom:15px;">
    <md-subheader class="md-no-sticky">系统设置</md-subheader>
    <md-list>
      <md-list-item>
        <p>系统日期</p>

      </md-list-item>
    </md-list>
  </section>

  `,
  controller:() => {

  }
})
// 客户端信息
.component('softwareInfo', {
  template:`
  <section  style="margin-bottom:15px;">
  <md-subheader class="md-no-sticky">控制端软件信息</md-subheader>
    <ul class="small-list">
      <li>版本号:<span ng-bind="version"></span></li>
      <li>发行时间:<span>{{date | date:"yyyy年MM月dd日"}}</span></li>
    </ul>
  </section>
  `,
  controller:($scope) => {
    $scope.version = "0.0.2";
    $scope.date = new Date();
  }
})
// 硬件信息
.component('hardwareInfo', {
  template:`
  <section  style="margin-bottom:15px;">
  <md-subheader class="md-no-sticky">主机信息</md-subheader>
    <ul class="small-list">
      <li>设备型号:<span></span></li>
      <li>硬件版本:<span></span></li>
      <li>软件版本:<span></span></li>
      <li>制造商:<span></span></li>
      <li>产品序列号:<span></span></li>
    </ul>
  </section>
  `,
  controller:($scope) => {

  }
})
//备份信息
.component('backupInfo',{
  template:`
  <section style="margin-bottom:15px;">
    <md-subheader class="md-no-sticky">备份和恢复</md-subheader>
    <md-button class="md-raised"><md-icon>backup</md-icon>备份系统</md-button>
    <md-button class="md-raised"><md-icon>restore</md-icon>恢复系统</md-button>
    <small>从未备份过</small>
  </section>`,
  controller:() => {

  }
})
