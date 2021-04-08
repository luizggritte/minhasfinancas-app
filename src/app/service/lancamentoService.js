import ApiService from "../apiService";

import ErroValidacao from "../exception/ErroValidacao"; 

export default class LancamentoService extends ApiService {
    constructor() {
        super("/api/lancamentos");
    }

    obterListaMeses() {
        return [
            { label: "Selecione o Mês", value: "" },
            { label: "Janeiro", value: 1 },
            { label: "Fevereiro", value: 2 },
            { label: "Março", value: 3 },
            { label: "Abril", value: 4 },
            { label: "Maio", value: 5 },
            { label: "Junho", value: 6 },
            { label: "Julho", value: 7 },
            { label: "Agosto", value: 8 },
            { label: "Setembro", value: 9 },
            { label: "Outubro", value: 10 },
            { label: "Novembro", value: 11 },
            { label: "Dezembro", value: 12 },
        ];
    }

    obterListaTipos() {
        return [
            { label: "Selecione o Tipo", value: "" },
            { label: "Despesa", value: "DESPESA" },
            { label: "Receita", value: "RECEITA" },
        ];
    }

    obterListaStatus() {
        return [
            { label: "Selecione o Estado", value: "" },
            { label: "Pendente", value: "PENDENTE" },
            { label: "Cancelado", value: "CANCELADO" },
            { label: "Efetivado", value: "EFETIVADO" },
        ];
    }

    consultar(lancamentoFiltro) {
        let params = `?usuario=${lancamentoFiltro.usuario}`;

        if (lancamentoFiltro.ano) params += `&ano=${lancamentoFiltro.ano}`;
        if (lancamentoFiltro.mes) params += `&mes=${lancamentoFiltro.mes}`;
        if (lancamentoFiltro.descricao) params += `&descricao=${lancamentoFiltro.descricao}`;
        if (lancamentoFiltro.tipo) params += `&tipo=${lancamentoFiltro.tipo}`;
        if (lancamentoFiltro.status) params += `&status=${lancamentoFiltro.status}`;

        return this.get(params);
    }

    consultarPorId(id) {
        return this.get(`/${id}`);
    }

    validar(lancamento) {
        const erros = [];

        if (!lancamento.descricao) erros.push("Campo Descrição é obrigatório");
        if (!lancamento.ano) erros.push("Campo Ano é obrigatório");
        else if (lancamento.ano.toString().length !== 4) erros.push("Informe um Ano válido");
        if (!lancamento.mes) erros.push("Campo Mês é obrigatório");
        if (!lancamento.valor) erros.push("Campo Valor é obrigatório");
        else if (parseFloat(lancamento.valor) <= 0) erros.push("Informe um Valor válido");
        if (!lancamento.tipo) erros.push("Campo Tipo de Lançamento é obrigatório");

        if (erros && erros.length > 0) throw new ErroValidacao(erros);
    }

    salvar(lancamento) {
        return this.post("/", lancamento);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    atualizarStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, { status })
    }

    deletar(id) {
        return this.delete(`/${id}`);
    }
}
