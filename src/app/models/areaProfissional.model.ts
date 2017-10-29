export class AreaProfissional {
    id: number;
    area: string;
    department: any;
    codigo: string;
    formula: any;
    areasFuncoes: string[];
    palavrasDescritivas: string[];
    breveRelato: string;
    podePrecisarGerir: string;
    aproveitar: string;

    constructor(id: number, area: string, department: any, codigo: string, formula: any, areasFuncoes: string[], palavrasDescritivas: string[], breveRelato: string, podePrecisarGerir: string, aproveitar: string) {
        this.id = id;
        this.area = area;
        this.department = department;
        this.codigo = codigo;
        this.formula = formula;
        this.areasFuncoes = areasFuncoes;
        this.palavrasDescritivas = palavrasDescritivas;
        this.breveRelato = breveRelato;
        this.podePrecisarGerir = podePrecisarGerir;
        this.aproveitar = aproveitar;
    }
}
