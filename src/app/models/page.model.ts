export class Page {
    id: number;
    title: string;
    active: boolean;
    questionOrder: Object;

    constructor(id: number, title: string, questionOrder: Object, active?: boolean) {
        this.id = id;
        this.title = title;
        this.questionOrder = questionOrder;
        this.active = active || false;
    }
}
