
<!--用于编写当前组件的结构代码的-->
<template>
  <div id="app">
<router-view class="main"></router-view>
  </div>
</template>


<style lang="scss">
@import './assets/style/index.scss';
#app{
  height: 100%;
}
.main{
  background-color: #ededed;
  overflow: hidden;
  width: 100%;
}

</style>
