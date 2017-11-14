import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, Input, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { JobPositionService } from '../jobPosition.service';
import { DepartmentService } from '../../departments';
import { Alert, JobPosition } from '../../../models';
import { EditComponent } from '../../../components';
import { JobPositionComponent } from '../jobPosition.component';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'temperamentoMapForm',
    templateUrl: './mapForm.component.html',
    styleUrls: ['../jobPosition.component.scss', '../../../app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService]
})
export class TemperamentoMapFormComponent implements AfterViewInit {

    parent: JobPositionComponent;
    areas: any[];
    selectedAreas: number[];

    constructor(protected route: ActivatedRoute,
        protected router: Router,
        protected service: JobPositionService,
        protected departmentService: DepartmentService,
        protected inj: Injector,
        protected http: Http) {
        this.parent = this.inj.get(JobPositionComponent);
    }

    async ngAfterViewInit() {
        this.refresh();
    }

    refresh() {
        this.areas = this.parent.areas;
        const phase = this.parent.phase;
        const parent = this.parent;
        this.initMap();

        if (parent.object.jobAreas == null) { return; }
        if (phase === 1) {
            this.setSelectedAreas(parent.object.jobAreas, parent.temperamentoAreaIdealClassification);

        } else if (phase === 2) {
            this.setSelectedAreas(parent.object.jobAreas, parent.temperamentoAreasPrincipaisClassifications);

        } else if (phase === 3) {
            this.setSelectedAreas(parent.object.jobAreas, parent.temperamentoAreasAlternativasClassifications);
        }

        this.areas.map(a => {
            if (a.selected === true) {
                $('#' + a.temperamento + '_area').css('fill', a.color);
            } else {
                $('#' + a.temperamento + '_area').css('fill', 'white');
            }
        });
        this.repaint();
    }


    getArea(temperamento: string) {
        if (this.areas == null || this.areas.length === 0) { return; }
        const area = this.areas.filter(a => a.temperamento === temperamento)[0];
        return area;
    }

    setSelectedAreas(jobAreas: any[], classifications: string[]) {
        jobAreas.filter(a => classifications.indexOf(a.jobAreaClassification) > -1).map(a => {
            this.areas.filter(area => area.id === a.areaProfissional.id)
                .map(area => {
                    area.selected = true;
                });
        });
    }

    initMap() {
        const parent = this.parent;
        const phase = this.parent.phase;
        const areas = this.areas;
        const self = this;
        $('.mapArea').off();
        this.repaint();
        $('.mapArea').click(function(e) {
            const area = self.getArea(this.id);
            const selectedCount = areas.filter(a => a.selected === true).length;
            if (area == null) { return; }

            if (phase > 1 && selectedCount == 8 && !area.selected) {
                self.parent.alert.buildAlert(0, 'Numero máximo de áreas alcançado', 4);
                return;
            }

            if (phase === 1 && selectedCount === 1 && !area.selected) {
                areas.filter(a => a.selected === true).map(a => {
                    a.selected = false;
                    $('#' + a.temperamento + '_area').css('fill', 'white');
                });
            }
            let out = '';
            area.areasAssociadas.map(a => out += '(' + a.areaAssociada.temperamento + ' - '  + a.jobAreaClassification + ') ');
            // console.log('>>> area ' + area.temperamento + ' => ' + JSON.stringify(area.areasAssociadas));
            console.log('>>> area ' + area.temperamento + ' => ' + out);

            // Seleciona area
            if (!area.selected) {
                area.selected = true;
                $('#' + this.id + '_area').css('fill', area.color);
                self.submit();

            } else {
                // Remove selecao da area clicada
                $('#' + this.id + '_area').css('fill', 'white');
                area.selected = false;
                self.submit();
            }

        }).mouseenter(function(e) {
            const area = self.getArea(this.id);
            if (area === undefined) { return; }
            $('#' + this.id + '_area').css('fill', area.color);
            self.parent.displayTooltip = true;
            self.parent.hoverArea = area;

        }).mouseleave(function() {
            $('.map_tooltip').remove();
            const area = self.getArea(this.id);
            if (area === undefined) { return; }
            if (area.selected == null || area.selected === false) {
                $('#' + this.id + '_area').css('fill', 'white');
            }
            self.parent.hoverArea = {};
            self.parent.displayTooltip = false;
        });
    }

    repaint() {
        for (const a of this.areas) {
            if (a.selected === true) {
                $('#' + a.temperamento + '_area').css('fill', a.color);
            } else {
                $('#' + a.temperamento + '_area').css('fill', 'white');
            }
        }
    }

    submit() {
        const phase = this.parent.phase;
        const parent = this.parent;
        const formAreas = this.areas;
        let objectAreas = parent.object.jobAreas;

        let classifications: any[];

        if (phase === 1) {
            classifications = parent.temperamentoAreaIdealClassification;
        } else if (phase === 2) {
            classifications = parent.temperamentoAreasPrincipaisClassifications;
        } else if (phase === 3) {
            classifications = parent.temperamentoAreasAlternativasClassifications;
        }

        // Delete existing & add new
        objectAreas = objectAreas.filter(a => classifications.indexOf(a.jobAreaClassification) === -1);

        formAreas.filter((a) => a.selected).map((a, index) => {
            objectAreas.push(parent.createJobArea(a, classifications[index]));
        });

        parent.object.jobAreas = objectAreas;
        parent.refreshLabels();
    }

    validate() {
        let valid = false;
        this.parent.object.jobAreas.filter(a => this.parent.temperamentoAreaIdealClassification.indexOf(a.jobAreaClassification) > -1).map(a => valid = true);
        if (!valid) {
            this.parent.alert.buildAlert(0, 'Área ideal do temperamento precisa ser escolhida', 5);
            return false;
        }
        return true;
    }
}
