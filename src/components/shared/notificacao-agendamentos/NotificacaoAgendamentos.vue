<template>
  <div style="padding-bottom: 3%">



      <md-card class="notification" md-with-hover>
        <md-card-header>
          <md-avatar>
            <img src="../../../assets/notification.png" alt="People">
          </md-avatar>

          <div class="md-title">Notificação</div>
          <div class="md-subhead">Há {{ agendamentos.length }} agendamentos pendentes de confirmação.</div><br>
          <router-link :to="{name: 'AgendamentosPendentes'}">
            <md-button>Visualizar</md-button>
          </router-link>
          <md-button class="md-accent" @click="disparaAcaoOK()">OK !</md-button>
        </md-card-header>
      </md-card>

  </div>
</template>

<script>
  export default {
    props: ['agendamentos'],

    methods: {
      disparaAcaoOK() {
        this.$emit('botaoOKAtivado');
      }
    }
  }
</script>

<style>
  .notification {
    max-width: 700px;
    text-align: left;
    margin: auto;
    overflow: hidden;
  }


</style>

