export class Industry {
    id: number;
    name: string;
    clientId: number;

    constructor(id: number, name: string, clientId: number) {
        this.id = id;
        this.name = name;
        this.clientId = clientId;
    }
}
