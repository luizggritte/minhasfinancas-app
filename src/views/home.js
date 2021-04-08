import React from "react";

import { AuthContext } from "../main/provedorAutenticacao";

import UsuarioService from "../app/service/usuarioService";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = { saldo: 0 }

        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado;

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => this.setState({ saldo: response.data }))
            .catch(err => console.warn(err.response.data))
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a
                        className="btn btn-primary btn-lg"
                        href="#/cadastro-usuarios"
                        role="button"
                    >
                        <i className="pi pi-user-plus"></i>&ensp;Cadastrar Usuário
                    </a>
                    <a
                        className="btn btn-success btn-lg"
                        href="#/cadastro-lancamentos"
                        role="button"
                    >
                        <i className="pi pi-money-bill"></i>&ensp;Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;
