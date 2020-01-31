import { parseISO, differenceInYears } from 'date-fns';

export class User {
    id: number;
    nome: string;
    usuario: string;
    nascimento: number;
    email: string;
    password: String;
    permissaoLevel: number;
    ativo: Boolean;
    criado: string;
    token?: string;
    expiresIn?: string;
    data: any;

    constructor(private us: User){
        this.nome = us.nome;
        this.usuario =  us.usuario;
        this.nascimento = this.idade(us.nascimento); 
        this.ativo = us.ativo;
        this.criado = us.criado;
        this.token = us.token;
        this.expiresIn = Date.now().toString();
        ;
    }

    getUsuario(){
        return this.usuario;
    }

    idade(tempo) {
        console.log(tempo);
        return differenceInYears(new Date(), new Date());
    }


}
