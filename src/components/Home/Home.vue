<template>
  <div class="conteudo">



    <transition name="fade" mode="out-in">
      <card-notification v-show="agendamentosPendentes.length > 0 && visivel" :agendamentos="agendamentosPendentes" @botaoOKAtivado="visivel = !visivel" />
    </transition>



      <md-tabs class="tab" md-fixed>
        <md-tab md-label="Hoje">
          <card-agendamento :agendamentos="agendamentosHoje"></card-agendamento>
        </md-tab>

        <md-tab md-label="Próximos">
          <card-agendamento :agendamentos="agendamentosProximos"></card-agendamento>
        </md-tab>
      </md-tabs>



  </div>
</template>

<script>
  import AgendamentoService from '../../domain/agendamento/AgendamentoService';
  import CardAgendamento from '../shared/card-agendamentos/CardAgendamentol.vue'
  import NotificacaoAgendamentos from '../shared/notificacao-agendamentos/NotificacaoAgendamentos.vue'
  export default {

    components: {
      'card-agendamento': CardAgendamento,
      'card-notification': NotificacaoAgendamentos
    },

    data() {
      return {
        agendamentosProximos: [],
        agendamentosAntigos: [],
        agendamentosHoje: [],
        agendamentosPendentes: [],
        visivel: true,
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

    sockets: {
      connect: function() {
        console.log('socket connected')
      },
      novoAgendamento: function(val) {
        this.visivel = true;
        this.buscaAgendamentos();
      }
    },

    methods: {
      buscaAgendamentos() {


        this.service
          .lista()
          .then(agendamentos => {

            this.agendamentosHoje =
              agendamentos.filter(agendamento =>
                agendamento.status == 'Confirmado' &&
                new Date(agendamento.dt_agendamento).toDateString() == new Date().toDateString());

            this.agendamentosProximos =
              agendamentos.filter(agendamento =>
                agendamento.status == 'Confirmado' &&
                new Date(agendamento.dt_agendamento) > this.dataHoje());

            this.agendamentosPendentes =
              agendamentos.filter(agendamento =>
                agendamento.status == 'Pendente' &&
                new Date(agendamento.dt_agendamento) >= this.dataHoje())
              .sort((a, b) => this.dataAux(a.dt_agendamento, a.horario) - this.dataAux(b.dt_agendamento, b.horario));

            this.agendamentosAntigos = agendamentos.filter(agendamento => new Date(agendamento.dt_agendamento) < this.dataHoje());

          }, erro => console.log(erro.message));



      }
    },

    created() {

      this.service = new AgendamentoService(this.$resource);
      this.buscaAgendamentos();
    }

  }
</script>

<style>
  .conteudo {
    padding: 5%;
    text-align: center;
  }

  .tab {
    max-width: 700px;
    margin: auto;
  }

  .md-tabs .md-tab {
    padding: 1px;
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
