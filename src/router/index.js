import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home.vue';
import AgendamentosPendentes from '@/components/agendamentos-pendentes/AgendamentosPendentes.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/agendamentos-pendentes',
      name: 'AgendamentosPendentes',
      component: AgendamentosPendentes
    }
  ]
})
