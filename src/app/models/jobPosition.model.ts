// import { Department } from './department.model';

export class JobPosition {
    id: number;
    name: string;
    department: any;
    clientId: number;
    jobAreas: any[];
    jobMotivacao: any[];
    autoGerenciamento1: number;
    autoGerenciamento2: number;
    apogeo1: number;
    apogeo2: number;

    constructor(id: number, name: string, department: any, clientId: number, jobAreas: any[], jobMotivacao: any[], autoGerenciamento1: number, autoGerenciamento2: number, apogeo1: number, apogeo2: number) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.clientId = clientId;
        this.jobAreas = jobAreas;
        this.jobMotivacao = jobMotivacao;
        this.autoGerenciamento1 = autoGerenciamento1;
        this.autoGerenciamento2 = autoGerenciamento2;
        this.apogeo1 = apogeo1;
        this.apogeo2 = apogeo2;
    }
}
