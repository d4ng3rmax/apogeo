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

export class DistributorAddress {
    id: number;
    addressType: string;
    street: string;
    number: string;
    other: string;
    area: string;
    zipCode: string;
    city: string;
    state: string;

    constructor(
        id: number,
        addressType: string,
        street: string,
        number: string,
        other: string,
        area: string,
        zipCode: string,
        city: string,
        state: string
    ) {
        this.id = id;
        this.addressType = addressType;
        this.street = street;
        this.number = number;
        this.other = other;
        this.area = area;
        this.zipCode = zipCode;
        this.city = city;
        this.state = state;
    }
}

export class DistributorPhone {
    id: number;
    phoneType: string;
    code: string;
    number: string;
    extension: string;
    operatorType: string;

    constructor(
        id: number,
        phoneType: string,
        code: string,
        number: string,
        extension: string,
        operatorType: string
    ) {
        this.id = id;
        this.phoneType = phoneType;
        this.code = code;
        this.number = number;
        this.extension = extension;
        this.operatorType = operatorType;
    }
}

export class DistributorDiscounts {
    id: number;
    minimumAnswers: string;
    maximunAnswers: string;
    discount: string;

    constructor(
        id: number,
        minimumAnswers: string,
        maximunAnswers: string,
        discount: string
    ) {
        this.id = id;
        this.minimumAnswers = minimumAnswers;
        this.maximunAnswers = maximunAnswers;
        this.discount = discount;
    }
}
