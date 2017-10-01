export class Solution {
    id: number;
    title: string;
    description: string;
    hasJobPosition: boolean;
    valor: number;
    cortesia: boolean;
    resultOrder: Object;
    active: boolean;

    constructor(id: number, title: string, description: string, hasJobPosition: boolean, valor: number, cortesia: boolean, resultOrder: Object, active?: boolean) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.hasJobPosition = hasJobPosition;
        this.valor = valor
        this.cortesia = cortesia;
        this.resultOrder = resultOrder;
        this.active = active || false;
    }
}
