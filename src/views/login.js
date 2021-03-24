import React from "react";

import Card from "../components/card";
import FormGroup from "../components/form-group";

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log('Email: ', this.state.email);
        console.log('Senha: ', this.state.senha);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div
                        className="col-md-6"
                        style={{ position: "relative", left: "300px" }}
                    >
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup
                                                    label="Email: *"
                                                    htmlFor="emailInput"
                                                >
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="emailInput"
                                                        value={this.state.email}
                                                        onChange={e => this.setState({ email: e.target.value })}
                                                        placeholder="Digite o Email"
                                                    />
                                                </FormGroup>
                                                <FormGroup label="Senha: *" htmlFor="passwordInput">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="passwordInput"
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                        placeholder="Digite a Senha"
                                                    />
                                                </FormGroup>
                                                <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                                <button className="btn btn-primary">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
