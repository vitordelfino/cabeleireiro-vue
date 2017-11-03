<template>
  <md-toolbar>

    <h2 class="md-title" style="flex: 1; margin-left: 7%">Agendamentos</h2>

    <span class="menu-item"><router-link to="/"> Home </router-link></span>
    <span class="menu-item"><router-link to="/agendamentos-pendentes"> Agendamentos Pendentes </router-link></span>


  </md-toolbar>
</template>
<script>

  export default {
    name: 'ToolBar'
  }

</script>

<style>

  .menu-item {
    margin-right: 3%;
    color: black;
    font-weight: bold;
  }

</style>
