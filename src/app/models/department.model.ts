export class Department {
    id: number;
    name: string;
    industry: any;
    clientId: number;

    constructor(id: number, name: string, industry: any, clientId: number) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.clientId = clientId;
    }
}
