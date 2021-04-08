import ApiService from "../apiService";

import ErroValidacao from "../exception/ErroValidacao"; 

export default class UsuarioService extends ApiService {
    constructor() {
        super("/api/usuarios");
    }

    autenticar(credenciais) {
        return this.post("/autenticar", credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    validar(usuario) {
        const erros = [];

        if (!usuario.nome) erros.push("Campo Nome é obrigatório");
        if (!usuario.email) erros.push("Campo Email é obrigatório");
        else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]/)) erros.push("Informe um Email válido");
        if (!usuario.senha) erros.push("Campo Senha é obrigatório");
        if (!usuario.confirmarSenha) erros.push("Campo Confirmar Senha é obrigatório");
        if (usuario.senha !== usuario.confirmarSenha) erros.push("As senhas não coincidem");

        if (erros && erros.length > 0) throw new ErroValidacao(erros);
    }

    salvar(usuario) {
        return this.post("/", usuario);
    }
}
