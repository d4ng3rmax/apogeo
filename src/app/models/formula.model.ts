export class Formula {
    id: number;
    relacionamento: number;
    acao: number;
    ponderacao: number;

    constructor(id: number, relacionamento: number, acao: number, ponderacao: number) {
        this.id = id;
        this.relacionamento = relacionamento;
        this.acao = acao;
        this.ponderacao = ponderacao;
    }
}
