<template>
  <div>
    <toolbar></toolbar>
    <transition name="pagina" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import ToolBar from '@/components/shared/Toolbar/ToolBar.vue';

  export default {

    components: {
      'toolbar': ToolBar
    }
  }
</script>

<style>
  .pagina-enter-enter,
  .pagina-leave-active {
    opacity: 0;
  }

  .pagina-enter-enter-active,
  .pagina-leave-active {
    transition: opacity .2s;
  }
</style>
