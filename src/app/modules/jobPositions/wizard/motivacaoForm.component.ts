import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, Input, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from '../jobPosition.service';
import { DepartmentService } from '../../departments';
import { Alert, JobPosition } from '../../../models';
import { EditComponent } from '../../../components';
import { JobPositionComponent } from '../jobPosition.component';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'motivacaoForm',
    templateUrl: './motivacaoForm.component.html',
    styleUrls: ['../jobPosition.component.scss', '../../../app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService]
})
export class MotivacaoFormComponent implements OnInit {

    parent: JobPositionComponent;
    motivacoes: any[];
    public motivacao1: any;
    motivacao2: any;
    motivacao3: any;
    motivacaoAlternativa1: any;
    motivacaoAlternativa2: any;
    motivacaoAlternativa3: any;
    // motivacoes2: any[];
    // motivacoes3: any[];
    // motivacao1: string;
    // motivacao2: string;
    // motivacao3: string;

    constructor(protected route: ActivatedRoute,
        protected router: Router,
        protected service: JobPositionService,
        protected inj: Injector) {
        this.parent = this.inj.get(JobPositionComponent);
    }

    async ngOnInit() {
        // this.motivacoes1 = await this.service.getMotivacoes1();
        // this.motivacoes2 = await this.service.getMotivacoes2();
        // this.motivacoes3 = await this.service.getMotivacoes3();
        this.motivacoes = ["abcdefg", "I", "Fr", "aaaaaaa aaaaaaaa aaaaaaaa aaaaaaaa", "bbbbbbb bbbbbbbb bbbbbbbbbb bbbbbbbbbbb", "ccccccccccc cccccccccc cccccccccccc ccccccccccc", "dddddddddd ddddddddddd ddddddddddd", "aaaaaa aaaaaa aaaaaaa", "bbbbbb bbbbbb bbbbbb", "cccccc cccccc cccccc cccccc", "dddddd dddddd dddddd ddddd", "aaaaaaa", "bbbbbbb", "ccccccc", "ddddddd"];
        this.loadMotivacoes();
    }

    loadMotivacoes() {
        let obj = this.parent.object;
        if (obj.jobMotivacao === undefined) obj.jobMotivacao = [];
        for (let m of obj.jobMotivacao) {
            if (m.jobMotivacaoClassification == "MOTIVACAO_PRINCIPAL_1") this.motivacao1 = m;
            if (m.jobMotivacaoClassification == "MOTIVACAO_PRINCIPAL_2") this.motivacao2 = m;
            if (m.jobMotivacaoClassification == "MOTIVACAO_PRINCIPAL_3") this.motivacao3 = m;
            if (m.jobMotivacaoClassification == "MOTIVACAO_ALTERNATIVA_1") this.motivacaoAlternativa1 = m;
            if (m.jobMotivacaoClassification == "MOTIVACAO_ALTERNATIVA_2") this.motivacaoAlternativa2 = m;
            if (m.jobMotivacaoClassification == "MOTIVACAO_ALTERNATIVA_3") this.motivacaoAlternativa3 = m;
        }
        if(this.motivacao1 === undefined) this.motivacao1 = { "motivacao": "", "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_1" };
        if(this.motivacao2 === undefined) this.motivacao2 = { "motivacao": "", "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_2" };
        if(this.motivacao3 === undefined) this.motivacao3 = { "motivacao": "", "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_3" };
        if(this.motivacaoAlternativa1 === undefined) this.motivacaoAlternativa1 = { "motivacao": "", "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_1" };
        if(this.motivacaoAlternativa2 === undefined) this.motivacaoAlternativa2 = { "motivacao": "", "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_2" };
        if(this.motivacaoAlternativa3 === undefined) this.motivacaoAlternativa3 = { "motivacao": "", "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_3" };
        console.log('>>> motivacao1=' + this.motivacao1 + ', motivacao2=' + this.motivacao2 + ', motivacao3=' + this.motivacao3 + ', motivacaoAlternativa1=' + this.motivacaoAlternativa1);
    }

    validate() {
        this.parent.populateJobMotivacoes();
        return true;
    }
}
