export class Survey {
    id: number;
    title: string;
    active: boolean;
    pageOrder: Object;

    constructor(id: number, title: string, pageOrder: Object, active?: boolean) {
        this.id = id;
        this.title = title;
        this.pageOrder = pageOrder;
        this.active = active || false;
    }
}
