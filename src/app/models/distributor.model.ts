export class Distributor {
    id: number;
    question: string;
    active: any;

    constructor(id: number, question: string, active?: any) {
        this.id = id;
        this.question = question;
        this.active = active || false;
    }
}
