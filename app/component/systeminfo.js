angular.module('app')
.component('softwareInfo', {
  template:`
  <section  style="margin-bottom:15px;">
  <md-subheader class="md-no-sticky">控制端软件信息</md-subheader>
    <ul class="small-list">
      <li>版本号:<span ng-bind="ctrl.version"></span></li>
      <li>发行时间:<span>{{ctrl.date | date:"yyyy年MM月dd日"}}</span></li>
    </ul>
  </section>
  `,
  controllerAs:'ctrl',
  controller:() => {
    this.version = "0.0.2";
    this.date = new Date();
  }
});
