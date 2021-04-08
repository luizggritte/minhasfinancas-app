import React from "react";

import { withRouter } from "react-router-dom";

import UsuarioService from "../app/service/usuarioService";

import Card from "../components/card";
import FormGroup from "../components/formGroup";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

class CadastroUsuario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
        };

        this.service = new UsuarioService();
    }

    handleChange = input => event => this.setState({ [input]: event.target.value });

    salvar = () => {
        const { nome, email, senha, confirmarSenha } = this.state;

        const usuario = { nome, email, senha, confirmarSenha };

        try { this.service.validar(usuario) }
        catch (erro) {
            const mensagens = erro.mensagens;

            return mensagens.forEach(mensagem => mensagemErro(mensagem));
        }

        this.service.salvar(usuario)
            .then(() => {
                mensagemSucesso("Usuário cadastrado com sucesso!");

                this.props.history.push("/login");
            })
            .catch(err => mensagemErro(err.response.data));
    };

    cancelar = () => this.props.history.push("/login");

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: "relative", left: "300px" }}>
                    <div className="bs-docs-section">
                        <Card title="Cadastro de Usuário">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inputNome"
                                                    onChange={this.handleChange("nome")}
                                                    placeholder="Digite o Nome"
                                                />
                                            </FormGroup>
                                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="inputEmail"
                                                    onChange={this.handleChange("email")}
                                                    placeholder="Digite o Email"
                                                />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="inputSenha"
                                                    onChange={this.handleChange("senha")}
                                                    placeholder="Digite a Senha"
                                                />
                                            </FormGroup>
                                            <FormGroup label="Confirmar Senha: *" htmlFor="inputConfirmarSenha">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="inputConfirmarSenha"
                                                    onChange={this.handleChange("confirmarSenha")}
                                                    placeholder="Repita a Senha"
                                                />
                                            </FormGroup>
                                            <button
                                                onClick={this.salvar}
                                                className="btn btn-success"
                                                
                                            >
                                                <i className="pi pi-save"></i>&ensp;Cadastrar
                                            </button>
                                            <button
                                                onClick={this.cancelar}
                                                className="btn btn-danger"
                                            >
                                                <i className="pi pi-times"></i>&ensp;Cancelar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CadastroUsuario);
