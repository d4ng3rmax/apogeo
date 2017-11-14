export class User {
    id : number;
    email : string;
    active : boolean;
    name : string;
    password : string;
    roles : string[];
    client: any;

    constructor( id : number, email : string, name: string, roles : string[], active : boolean, client: any ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.active = active || false;
        this.client = client;
        // this.password = password;
    }
}
