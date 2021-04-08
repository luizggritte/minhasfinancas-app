import React from "react";

import Rotas from "./rotas";
import ProvedorAutenticacao from "./provedorAutenticacao";

import Navbar from "../components/navbar";

import "toastr/build/toastr.min.js";

import "bootswatch/dist/flatly/bootstrap.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "toastr/build/toastr.css";

import "../custom.css";

export default class App extends React.Component {
	render() {
		return (
			<ProvedorAutenticacao>
				<Navbar />
				<div className="container">
					<Rotas />
				</div>
			</ProvedorAutenticacao>
		);
	}
}
