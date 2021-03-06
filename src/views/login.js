import React from "react";

import { withRouter } from "react-router-dom";

import { AuthContext } from "../main/provedorAutenticacao";

import UsuarioService from "../app/service/usuarioService";

import Card from "../components/card";
import FormGroup from "../components/formGroup";
import { mensagemErro } from "../components/toastr";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            senha: "",
        }

        this.service = new UsuarioService();
    }

    handleChange = input => event => this.setState({ [input]: event.target.value });

    entrar = () => {
        const { email, senha } = this.state;

        const erros = [];

        if (!email) erros.push("Preencha seu Email");
        else if (!email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]/)) erros.push("Informe um Email válido");
        if (!senha) erros.push("Preencha sua Senha");

        if (erros && erros.length > 0) return erros.forEach(mensagem => mensagemErro(mensagem));

        this.service.autenticar({ email, senha })
            .then(response => {
                this.context.iniciarSessao(response.data);

                this.props.history.push("/home");
            })
            .catch(err => mensagemErro(err.response.data));
    }

    irParaCadastrar = () => this.props.history.push("/cadastro-usuarios");

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: "relative", left: "300px" }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
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
                                            <button
                                                onClick={this.entrar}
                                                className="btn btn-success"
                                            >
                                                <i className="pi pi-sign-in"></i>&ensp;Entrar
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
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);
