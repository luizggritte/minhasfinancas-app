import React from "react";

import NavbarItem from "./navbarItem";

import { AuthConsumer } from "../main/provedorAutenticacao";

function Navbar(props) {
	return (
		<div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
			<div className="container">
				<a href="#/home" className="navbar-brand">Minhas Finanças</a>
				<button
					className="navbar-toggler"
					data-toggle="collapse"
					data-target="#navbarResponsive"
					aria-controls="navbarResponsive"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
					<ul className="navbar-nav">
						<NavbarItem
							label="Home"
							href="#/home"
							render={props.isUsuarioAutenticado}
						/>
						<NavbarItem
							label="Lançamentos"
							href="#/consulta-lancamentos"
							render={props.isUsuarioAutenticado}
						/>
						<NavbarItem
							label="Sair"
							href="#/login"
							onClick={props.deslogar}
							render={props.isUsuarioAutenticado}
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default () => (
	<AuthConsumer>
		{(context) => (
			<Navbar
				isUsuarioAutenticado={context.isAutenticado}
				deslogar={context.encerrarSessao}
			/>
		)}
	</AuthConsumer>
)
