export class Distributor {
    id: number;
    client: string;
    email: string;
    document: string;
    name: string;
    enabled: any;

    constructor(id: number, client: string, email: string, document: string, name: string, enabled?: any) {
        this.id = id;
        this.client = client;
        this.email = email;
        this.document = document;
        this.name = name;
        this.enabled = enabled || false;
    }
}
