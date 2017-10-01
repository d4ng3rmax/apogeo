export class Result {
    id: number;
    description: string;
    active: boolean;
    codigo: number;

    constructor(id: number, description: string, codigo: number, active?: boolean) {
        this.id = id;
        this.description = description;
        this.codigo = codigo;
        this.active = active || false;
    }
}
