import React from "react";

import { withRouter } from "react-router-dom";

import LancamentoService from "../app/service/lancamentoService";
import LocalStorageService from "../app/service/localStorageService";

import Card from "../components/card";
import FormGroup from "../components/formGroup";
import SelectMenu from "../components/selectMenu";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

class CadastroLancamento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            descricao: "",
            ano: "",
            mes: "",
            valor: "",
            tipo: "",
            status: "",
            usuario: null,
            atualizando: false,
        };

        this.service = new LancamentoService();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        if (id) {
            this.service.consultarPorId(id)
                .then(response => this.setState({ ...response.data, atualizando: true }))
                .catch(err => mensagemErro(err.response.data))
        }
    }

    handleChange = input => event => this.setState({ [input]: event.target.value });

    salvar = () => {
        const { descricao, ano, mes, valor, tipo } = this.state;

        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

        const lancamento = {
            descricao,
            ano,
            mes,
            valor,
            tipo,
            usuario: usuarioLogado.id
        };

        try { this.service.validar(lancamento) }
        catch (erro) {
            const mensagens = erro.mensagens

            return mensagens.forEach(mensagem => mensagemErro(mensagem));
        }

        this.service.salvar(lancamento)
            .then(() => {
                mensagemSucesso("Lançamento cadastrado com sucesso!");

                this.props.history.push("/consulta-lancamentos");
            })
            .catch(err => mensagemErro(err.response.data));
    }

    atualizar = () => {
        const { id, descricao, ano, mes, valor, tipo, status, usuario } = this.state;

        const lancamento = { id, descricao, ano, mes, valor, tipo, status, usuario };

        try { this.service.validar(lancamento) }
        catch (erro) {
            const mensagens = erro.mensagens

            return mensagens.forEach(mensagem => mensagemErro(mensagem));
        }

        this.service.atualizar(lancamento)
            .then(() => {
                mensagemSucesso("Lançamento atualizado com sucesso!");

                this.props.history.push("/consulta-lancamentos");
            })
            .catch(err => mensagemErro(err.response.data));
    }

    cancelar = () => this.props.history.push("/consulta-lancamentos");

    render() {
        const { descricao, ano, mes, valor, tipo, status, atualizando } = this.state;

        return (
            <Card title={`${atualizando ? "Atualização" : "Cadastro"} de Lançamento`}>
                <fieldset>
                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={descricao}
                                    onChange={this.handleChange("descricao")}
                                    placeholder="Digite a Descrição"
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input
                                    type="number"
                                    min="1000"
                                    max="9999"
                                    className="form-control"
                                    id="inputAno"
                                    value={ano}
                                    onChange={this.handleChange("ano")}
                                    placeholder="Digite o Ano"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup label="Mês:" htmlFor="inputMes">
                                <SelectMenu
                                    id="inputMes"
                                    lista={this.service.obterListaMeses()}
                                    value={mes}
                                    onChange={this.handleChange("mes")}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup label="Valor: *" htmlFor="inputValor">
                                <input
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    className="form-control"
                                    id="inputValor"
                                    value={valor}
                                    onChange={this.handleChange("valor")}
                                    placeholder="Digite o Valor"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Tipo de Lançamento:" htmlFor="inputTipoLancamento">
                                <SelectMenu
                                    id="inputTipoLancamento"
                                    lista={this.service.obterListaTipos()}
                                    value={tipo}
                                    onChange={this.handleChange("tipo")}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup label="Estado do Lançamento:" htmlFor="inputStatusLancamento">
                                <SelectMenu
                                    id="inputStatusLancamento"
                                    lista={this.service.obterListaStatus()}
                                    value={status || "PENDENTE"}
                                    disabled={true}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    {atualizando ?
                        <button
                            onClick={this.atualizar}
                            className="btn btn-success"
                        >
                            <i className="pi pi-refresh"></i>&ensp;Atualizar
                        </button> :
                        <button
                            onClick={this.salvar}
                            className="btn btn-success"
                        >
                            <i className="pi pi-save"></i>&ensp;Cadastrar
                        </button>
                    }
                    <button
                        onClick={this.cancelar}
                        className="btn btn-danger"
                    >
                        <i className="pi pi-times"></i>&ensp;Cancelar
                    </button>
                </fieldset>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento);
