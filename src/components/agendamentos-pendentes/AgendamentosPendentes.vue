<template>
  <div class="conteudo">
    <transition name="fade" mode="in-out">
      <card-agendamento class="agendamentos" :agendamentos="agendamentosPendentes"></card-agendamento>
    </transition>
  </div>
</template>

<script>
  import AgendamentoService from '../../domain/agendamento/AgendamentoService';
  import CardAgendamento from '../shared/card-agendamentos/CardAgendamentol.vue'
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

    components: {
      'card-agendamento': CardAgendamento
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
              .sort((a,b) => this.dataAux(a.dt_agendamento,a.horario) - this.dataAux(b.dt_agendamento,b.horario));



        }, erro => console.log(erro.message));
      }

    }
  }
</script>

<style>

  .conteudo {
    padding: 5%;
    text-align: center;
  }

  .agendamentos {
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
