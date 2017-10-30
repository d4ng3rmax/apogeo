export class Department {
    id: number;
    name: string;
    industry: any;
    clientId: string;

    constructor(id: number, name: string, industry: any, clientId?: string) {
        this.id = id;
        this.name = name;
        this.industry = industry;
        this.clientId = clientId;
    }
}
