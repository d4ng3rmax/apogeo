export class Distributor {
    id: number;
    client: string;
    email: string;
    document: string;
    name: string;
    roles : string[];
    phones : string[];
    addresses : string[];
    distributorType : any;
    enabled: any;

    constructor(
            id: number,
            client: string,
            email: string,
            document: string,
            name: string,
            roles : string[],
            phones : string[],
            addresses : string[],
            distributorType?: any,
            enabled?: any
        ) {
        this.id = id;
        this.client = client;
        this.email = email;
        this.document = document;
        this.name = name;
        this.roles = roles;
        this.phones = phones;
        this.addresses = addresses;
        this.distributorType = distributorType;
        this.enabled = enabled || false;
    }
}
