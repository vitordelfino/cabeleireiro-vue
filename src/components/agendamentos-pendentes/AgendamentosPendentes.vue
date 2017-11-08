<template>
  <div class="conteudo">
    <transition name="fade" mode="in-out">

      <md-card class="card">
        <md-list>
          <md-list-item class="list-item" v-for="agendamento in agendamentosPendentes" :key="agendamento.id">
            <span>{{ agendamento.str_data }} às {{ agendamento.horario }}</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">Cliente: {{ agendamento.nome }}</md-list-item>
                <md-list-item class="md-inset">Serviço: {{ agendamento.servico }}</md-list-item>
                <md-list-item class="md-inset">Status: {{ agendamento.status }}</md-list-item>
              </md-list>
              <md-button class="md-primary" @click="confirmar(agendamento)">Confirmar</md-button>
              <md-button class="md-primary" @click="cancelar(agendamento)">Cancelar</md-button>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </md-card>

    </transition>
  </div>
</template>

<script>
  import AgendamentoService from '../../domain/agendamento/AgendamentoService';

  export default {

    data() {
      return {
        agendamentosPendentes: [],
        dataHoje: () => {
          var data = new Date();
          data.setHours(0);
          data.setMinutes(0);
          data.setSeconds(0);
          data.setMilliseconds(0);
          return data;
        },
        dataAux: (dt, horas) => {
          var aux = horas.split(':');
          var data = new Date(dt);
          data.setHours(aux[0]);
          data.setMinutes(aux[1]);
          return data;
        }
      }
    },

    created() {
      this.service = new AgendamentoService(this.$resource);
      this.buscaAgendamentos();
    },

    sockets: {
      connect: function() {
        console.log('socket connected')
      },
      novoAgendamento: function(val) {
        this.buscaAgendamentos();
      }
    },
    methods: {

      buscaAgendamentos() {
        this.service
          .lista()
          .then(agendamentos => {

            this.agendamentosPendentes =
              agendamentos.filter(agendamento =>
                agendamento.status == 'Pendente' &&
                new Date(agendamento.dt_agendamento) >= this.dataHoje())
              .sort((a, b) => this.dataAux(a.dt_agendamento, a.horario) - this.dataAux(b.dt_agendamento, b.horario));



          }, erro => console.log(erro.message));
      },
      confirmar(agendamento) {
        this.service
          .confirmar(agendamento)
          .then(() => {
            let indice = this.agendamentosPendentes.indexOf(agendamento);
            this.agendamentosPendentes.splice(indice, 1);
          }, erro => {
            console.log(erro.message);
          });
      },
      cancelar(agendamento) {
        this.service
          .cancelar(agendamento, 'Cancelando agendamento')
          .then(() => {
            let indice = this.agendamentosPendentes.indexOf(agendamento);
            this.agendamentosPendentes.splice(indice, 1);
          }, erro => {
            console.log(erro.message);
          });
      }

    }
  }
</script>

<style>
  .conteudo {
    padding: 5%;
    text-align: center;
  }

  .card {
    max-width: 700px;
    margin: auto;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .7s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
</style>
