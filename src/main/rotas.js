import React from "react";

import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

import { AuthConsumer } from "../main/provedorAutenticacao";

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamento from "../views/consultaLancamento";
import CadastroLancamento from "../views/cadastroLancamento";

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
	return (
		<Route {...props} render={(componentProps) => {
			if (isUsuarioAutenticado) return <Component {...componentProps} />
			else {
				return (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: componentProps.location }
						}}
					/>
				)
			}
		}} />
	)
}

function Rotas(props) {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/">
					<Redirect to="/login" component={Login} />
				</Route>
				<Route path="/login" component={Login} />
				<Route path="/cadastro-usuarios" component={CadastroUsuario} />
				<RotaAutenticada
					isUsuarioAutenticado={props.isUsuarioAutenticado}
					path="/home"
					component={Home}
				/>
				<RotaAutenticada
					isUsuarioAutenticado={props.isUsuarioAutenticado}
					path="/consulta-lancamentos"
					component={ConsultaLancamento}
				/>
				<RotaAutenticada
					isUsuarioAutenticado={props.isUsuarioAutenticado}
					path="/cadastro-lancamentos/:id?"
					component={CadastroLancamento}
				/>
			</Switch>
		</HashRouter>
	);
}

export default () => (
	<AuthConsumer>
		{(context) => <Rotas isUsuarioAutenticado={context.isAutenticado} />}
	</AuthConsumer>
)
