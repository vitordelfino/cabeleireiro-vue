<template>
  <md-card class="card">
    <md-list>
      <md-list-item class="list-item" v-for="agendamento in agendamentos" :key="agendamento.id">
        <span>{{ agendamento.str_data }} às {{ agendamento.horario }}</span>
        <md-list-expand>
          <md-list>
            <md-list-item class="md-inset">Cliente: {{ agendamento.nome }}</md-list-item>
            <md-list-item class="md-inset">Serviço: {{ agendamento.servico }}</md-list-item>
            <md-list-item class="md-inset">Status: {{ agendamento.status }}</md-list-item>
          </md-list>
          <md-button class="md-primary" @click="finalizar(agendamento)">Finalizar</md-button>
          <md-button class="md-primary" @click="cancelar(agendamento)">Cancelar</md-button>
        </md-list-expand>
      </md-list-item>
    </md-list>
  </md-card>
</template>

<script>

  import AgendamentoService from '../../../domain/agendamento/AgendamentoService';

  export default {

    created() {
      this.service = new AgendamentoService(this.$resource);
    },

    props: ['agendamentos'],

    methods: {
      finalizar(agendamento) {
        this.service
          .finalizar(agendamento)
          .then(() => {
            let indice = this.agendamentos.indexOf(agendamento);
            this.agendamentos.splice(indice, 1);
            console.log('finalizado');
          }, erro => {
            console.log(erro.message);
          });
      },
      cancelar(agendamento) {

        this.service
          .cancelar(agendamento, 'cancelando agendamento')
          .then(() => {
            let indice = this.agendamentos.indexOf(agendamento);
            this.agendamentos.splice(indice, 1);
          }, erro => {
            console.log(erro.message);
          });
      }
    }
  }
</script>

<style>
  /* .list-item {
      padding: 3px;
    } */

  .card {
    max-width: 700px;
  }
</style>
