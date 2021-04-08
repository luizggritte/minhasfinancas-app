import React from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { withRouter } from "react-router-dom";

import LancamentoService from "../app/service/lancamentoService";
import LocalStorageService from "../app/service/localStorageService";

import Card from "../components/card";
import FormGroup from "../components/formGroup";
import SelectMenu from "../components/selectMenu";
import { mensagemSucesso, mensagemErro, mensagemAlerta } from "../components/toastr";

class ConsultaLancamento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ano: "",
            mes: "",
            descricao: "",
            tipo: "",
            status: "",
            lancamentos: [],
            idLancamentoDeletar: null,
            showConfirmDialog: false,
        };

        this.service = new LancamentoService();
    }

    handleChange = input => event => this.setState({ [input]: event.target.value });

    consultar = () => {
        const { ano, mes, descricao, tipo, status } = this.state;

        if (!ano) return mensagemErro("Campo Ano é obrigatório");

        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

        const lancamentoFiltro = {
            ano,
            mes,
            descricao,
            tipo,
            status,
            usuario: usuarioLogado.id,
        };

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data });

                response.data.length > 0 ?
                    mensagemSucesso("Lançamentos encontrados com sucesso!") :
                    mensagemAlerta("Nenhum lançamento encontrado!");
            })
            .catch(err => mensagemErro(err.response.data));
    }

    irParaCadastrar = () => this.props.history.push("/cadastro-lancamentos");

    atualizar = id => this.props.history.push(`/cadastro-lancamentos/${id}`);

    atualizarStatus = (lancamento, status) => {
        this.service.atualizarStatus(lancamento.id, status)
            .then(() => {
                let { lancamentos } = this.state;

                const indexLancamento = lancamentos.indexOf(lancamento);

                if (indexLancamento !== -1) {
                    lancamento["status"] = status;

                    lancamentos[indexLancamento] = lancamento;
                }

                this.setState({ lancamentos });

                mensagemSucesso("Estado atualizado com sucesso!")
            })
            .catch(err => mensagemErro(err.response.data));
    }

    abrirConfirmacao = idLancamento => {
        this.setState({ showConfirmDialog: true, idLancamentoDeletar: idLancamento });
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, idLancamentoDeletar: null });
    }

    deletar = () => {
        let { idLancamentoDeletar, lancamentos } = this.state;

        this.service.deletar(idLancamentoDeletar)
            .then(() => {
                lancamentos = lancamentos.filter(lancamento => lancamento.id !== idLancamentoDeletar);

                this.setState({ lancamentos, showConfirmDialog: false });

                mensagemSucesso("Lançamento deletado com sucesso!");
            })
            .catch(() => mensagemErro("Ocorreu um erro ao tentar deletar um lançamento!"));
    }

    render() {
        const { lancamentos, showConfirmDialog } = this.state;

        const footer = (
            <div>
                <Button
                    label="Confirmar"
                    className="p-button-danger"
                    icon="pi pi-check"
                    onClick={this.deletar}
                />
                <Button
                    label="Cancelar"
                    className="p-button-primary"
                    icon="pi pi-times"
                    onClick={this.cancelarDelecao}
                />
            </div>
        );

        return (
            <Card title="Consulta de Lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup label="Ano: *" htmlFor="inputAno">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAno"
                                        onChange={this.handleChange("ano")}
                                        placeholder="Digite o Ano"
                                    />
                                </FormGroup>
                                <FormGroup label="Mês:" htmlFor="inputMes">
                                    <SelectMenu
                                        id="inputMes"
                                        lista={this.service.obterListaMeses()}
                                        onChange={this.handleChange("mes")}
                                    />
                                </FormGroup>
                                <FormGroup label="Descrição:" htmlFor="inputDescricao">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputDescricao"
                                        onChange={this.handleChange("descricao")}
                                        placeholder="Digite a Descrição"
                                    />
                                </FormGroup>
                                <FormGroup label="Tipo de Lançamento:" htmlFor="inputTipoLancamento">
                                    <SelectMenu
                                        id="inputTipoLancamento"
                                        lista={this.service.obterListaTipos()}
                                        onChange={this.handleChange("tipo")}
                                    />
                                </FormGroup>
                                <FormGroup label="Estado do Lançamento:" htmlFor="inputStatusLancamento">
                                    <SelectMenu
                                        id="inputStatusLancamento"
                                        lista={this.service.obterListaStatus()}
                                        onChange={this.handleChange("status")}
                                    />
                                </FormGroup>
                                <button
                                    onClick={this.consultar}
                                    className="btn btn-success"
                                >
                                    <i className="pi pi-search"></i>&ensp;Buscar
                                </button>
                                <button
                                    onClick={this.irParaCadastrar}
                                    className="btn btn-primary"
                                >
                                    <i className="pi pi-plus"></i>&ensp;Cadastrar
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Descrição</th>
                                        <th scope="col">Valor</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Ano</th>
                                        <th scope="col">Mês</th>
                                        <th scope="col">Situação</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lancamentos.map((lancamento, index) => (
                                            <tr key={index}>
                                                <td>{lancamento.descricao}</td>
                                                <td>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(lancamento.valor)}</td>
                                                <td>{lancamento.tipo}</td>
                                                <td>{lancamento.ano}</td>
                                                <td>{lancamento.mes}</td>
                                                <td>{lancamento.status}</td>
                                                <td>
                                                    <button
                                                        title="Efetivar"
                                                        className="btn btn-success"
                                                        onClick={() => this.atualizarStatus(lancamento, "EFETIVADO")}
                                                        disabled={lancamento.status !== "PENDENTE"}
                                                    >
                                                        <i className="pi pi-check"></i>
                                                    </button>
                                                    <button
                                                        title="Cancelar"
                                                        className="btn btn-warning"
                                                        onClick={() => this.atualizarStatus(lancamento, "CANCELADO")}
                                                        disabled={lancamento.status !== "PENDENTE"}
                                                    >
                                                        <i className="pi pi-times"></i>
                                                    </button>
                                                    <button
                                                        title="Atualizar"
                                                        className="btn btn-primary"
                                                        onClick={() => this.atualizar(lancamento.id)}
                                                    >
                                                        <i className="pi pi-pencil"></i>
                                                    </button>
                                                    <button
                                                        title="Deletar"
                                                        className="btn btn-danger"
                                                        onClick={() => this.abrirConfirmacao(lancamento.id)}
                                                    >
                                                        <i className="pi pi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        header="Confirmação"
                        footer={footer}
                        visible={showConfirmDialog}
                        style={{ width: "50vw" }}
                        resizable={false}
                        draggable={false}
                        onHide={this.cancelarDelecao}
                    >
                        Confirma a exclusão deste lançamento ?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamento);
