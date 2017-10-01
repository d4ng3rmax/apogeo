export class User {
    id : number;
    email : string;
    active : boolean;
    name : string;
    password : string;
    roles : string[];

    constructor( id : number, email : string, name: string, roles : string[], active? : boolean ) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.active = active || false;
        // this.password = password;
    }
}
