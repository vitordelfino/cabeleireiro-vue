export default class AgendamentoService {

  constructor(resource){

    let customActions = {
      confirmar: {method: 'PUT', url: 'agendamento/confirma{/id}'},
      finalizar: {method: 'PUT', url: 'agendamento/finalizar{/id}'},
      cancelar: {method: 'DELETE', url: 'agendamento/cancelar{/id}{/obs}'}
    };

    this._resource = resource('agendamento/list',{}, customActions);
  }

  lista() {
    return this._resource
      .query()
      .then(res => res.json(), erro => {
        console.log(erro);
        throw new Error('Não foi possível buscar os agendamentos');
      });
  }

  cancelar(agendamento, observacao){
    return this._resource
      .cancelar({ id: agendamento.id, obs: observacao })
      .then(null, erro => {
        throw new Error('Não foi possível cancelar o agendamento');
      });
  }

  confirmar(agendamento){
    var id = agendamento.id;
    console.log('id: ' + id);
    return this._resource
    .confirmar({ id })
    .then(null, erro => {
      console.log(erro);
      throw new Error('Não foi possível confirmar o agendamento');
    });
  }

}
