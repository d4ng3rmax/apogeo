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
    selector: 'areaPrincipalForm',
    templateUrl: './areaPrincipalForm.component.html',
    styleUrls: ['../jobPosition.component.scss', '../../../app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService]
})
export class AreaPrincipalFormComponent implements AfterViewInit {

    parent: JobPositionComponent;
    areas: any[];

    principal: any[];
    principalOutros: any[];
    alternativosOutros: any[];
    areaMap: any;

    color1: string = "rgba(40, 185, 255, 0.75)";
    color2: string = "rgba(196, 4, 82, 0.75)";
    color3: string = "rgba(30, 240, 159, 0.75)";

    constructor(protected route: ActivatedRoute,
        protected router: Router,
        protected service: JobPositionService,
        protected departmentService: DepartmentService,
        protected inj: Injector,
        protected http: Http) {
        this.parent = this.inj.get(JobPositionComponent);
    }

    async ngAfterViewInit() {
        if (this.parent.areas === undefined) {
            this.areas = await this.service.getAreas();
            this.parent.areas = this.areas;
            this.loadAreaSelections();
        } else {
            this.areas = this.parent.areas;
        }

        this.areaMap = {};
        // Enrich areas
        for (let a of this.areas) {
            this.staticAreas.filter(sa => sa.id == a.id).map(sa => {
                a.name = sa.name;
                a.color = sa.color;
            });
            if (a.selected === undefined || !a.selected) a.selected = false;
            if (a.phase === undefined) a.phase = undefined;
            this.areaMap[a.name] = a;
        }
        this.initMap();
    }

    initMap() {
        let self = this;
        $('.mapArea').off();
        for (let a of this.areas) {
            if (a.selected) {
                $('#' + a.name).css("fill", a.color);
            } else {
                $('#' + a.name).css("fill", "white");
            }
        }
        $('.mapArea').click(function(e) {
            var area = self.areaMap[this.id];
            if (!area.selected) {
                // Se for a primeira fase, preenche a selecao anterior de branco
                if (self.parent.phase == 1) {
                    for (let a of self.areas) {
                        $('#' + a.name).css("fill", "white");
                        a.selected = false;
                        a.phase = undefined;
                    }
                }

                area.selected = true;
                area.phase = self.parent.phase;
                $('#' + area.name).css("fill", area.color);

                // Remove selecao da area clicada
            } else if (area.phase >= self.parent.phase && area.selected) {
                $('#' + area.name).css("fill", "white");
                area.selected = false;
                area.phase = undefined;
            }
            self.triggerAreaSelected();

        }).hover(function(e) {
            let area = self.areaMap[this.id];
            $(this).css("fill", area.color);

        }, function(e) {
            let area = self.areaMap[this.id];
            if (area.phase === undefined || !area.selected) {
                $(this).css("fill", "white");
            }

        }).mouseover(function(e) {
            var area = self.areaMap[this.id];
            var popupContent = self.getPopupContent(area);
            $('#description').html(popupContent);

        }).mouseleave(function() {
            $('.map_tooltip').remove();

            for (let area of self.areas.filter(a => a.phase == self.parent.phase && !a.selected)) {
                $('#' + area.name).css("fill", "white");
            }
        });
    }

    getPopupContent(area: any) {
        var etniaImg = Object.keys(area.etniaImgURL).length > 0 ? '<img src="' + area.etniaImgURL + '" />' : '';
        var content = '<div class="map_tooltip">' +
            '<div class="row">' +

            '<div class="col-sm-8 col-md-8 col-lg-8">' +
            '<div class="row">' +
            '<div class="col-sm-8 col-md-8 col-lg-8"><b>Área </b><span>' + area.area + '</span></div>' +
            '<div class="col-sm-4 col-md-4 col-lg-4"><b>Família </b><span>' + area.familia + '</span></div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-sm-4 col-md-4 col-lg-4"><b>Relacionamento </b><span>' + area.formula.relacionamento + '</span></div>' +
            '<div class="col-sm-4 col-md-4 col-lg-4"><b>Ação </b><span>' + area.formula.acao + '</span></div>' +
            '<div class="col-sm-4 col-md-4 col-lg-4"><b>Ponderação </b><span>' + area.formula.ponderacao + '</span></div>' +
            '</div>' +
            '</div>' +

            '<div class="col-sm-4 col-md-4 col-lg-4">BONECO' +
            etniaImg +
            '</div>' +

            '</div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Descrição </b><span>' + area.areasDescricao + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Descrição das Funções </b><span>' + area.funcoesDescricao + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Palavras descritivas </b><span>' + area.palavrasDescritivas + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Breve relato1 </b><span>' + area.breveRelato1 + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Breve relato2 </b><span>' + area.breveRelato2 + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Breve relato3 </b><span>' + area.breveRelato3 + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Breve relato4 </b><span>' + area.breveRelato4 + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Precisa gerir </b><span>' + area.precisaGerir + '</span></div></div>' +
            '<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><b>Aproveitar </b><span>' + area.aproveitar + '</span></div></div>' +
            '</div>';

        return content;
    }

    triggerAreaSelected() {
        this.principal = this.areas.filter(a => a.phase == 1)[0];
        this.principalOutros = this.areas.filter(a => a.phase == 2);
        this.alternativosOutros = this.areas.filter(a => a.phase == 3);
    }

    validate() {
        var phase = this.parent.phase;
        if (phase == 1 && this.areas.filter(a => a.phase == 1).length != 1) {
            this.parent.alert.buildAlert(0, 'Uma área principal precisa ser selecionada', 4);
            return false;

        } else if ((phase == 2 || phase == 3) && this.areas.filter(a => a.phase == phase).length > 7) {
            this.parent.alert.buildAlert(0, 'Apenas 7 áreas podem ser selecionadas', 4);
            return false;
        }
        return true;
    }

    loadAreaSelections() {
        if (this.parent.object.jobAreas === undefined) this.parent.object.jobAreas = [];
        for (let a of this.parent.object.jobAreas) {
            if (a.jobAreaClassification == "AREA_PRINCIPAL") this.setSelectedArea(a, 1);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_1") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_2") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_3") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_4") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_5") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_6") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_PRINCIPAL_7") this.setSelectedArea(a, 2);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_1") this.setSelectedArea(a, 3);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_2") this.setSelectedArea(a, 3);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_3") this.setSelectedArea(a, 3);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_4") this.setSelectedArea(a, 3);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_5") this.setSelectedArea(a, 3);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_6") this.setSelectedArea(a, 3);
            if (a.jobAreaClassification == "OUTRA_AREA_ALTERNATIVA_7") this.setSelectedArea(a, 3);
        }
        this.triggerAreaSelected();
    }

    setSelectedArea(serverArea: any, phase: number) {
        var area = this.parent.areas.filter(a => a.id == serverArea.areaProfissional.id)[0];
        area.phase = phase;
        area.selected = true;
    }

    staticAreas: any = [
        { "id": 1, "name": "area1_2", "code": "1AR", "color": this.color1 },
        { "id": 2, "name": "area1_1", "code": "1A", "color": this.color1 },
        { "id": 3, "name": "area1_3", "code": "1EQ", "color": this.color1 },
        { "id": 4, "name": "area1_4", "code": "1AP", "color": this.color1 },
        { "id": 5, "name": "area2_2", "code": "2RA", "color": this.color2 },
        { "id": 6, "name": "area1_6", "code": "2AR", "color": this.color1 },
        { "id": 7, "name": "area1_5", "code": "2A", "color": this.color1 },
        { "id": 8, "name": "area1_7", "code": "2EQ", "color": this.color1 },
        { "id": 9, "name": "area1_8", "code": "2AP", "color": this.color1 },
        { "id": 10, "name": "area3_2", "code": "2PA", "color": this.color3 },
        { "id": 11, "name": "area2_4", "code": "3RP", "color": this.color2 },
        { "id": 12, "name": "area2_3", "code": "3RA", "color": this.color2 },
        { "id": 13, "name": "area1_9", "code": "3AR", "color": this.color1 },
        { "id": 14, "name": "area2_1", "code": "3EQ", "color": this.color2 },
        { "id": 15, "name": "area1_10", "code": "3AP", "color": this.color1 },
        { "id": 16, "name": "area3_1", "code": "3PA", "color": this.color3 },
        { "id": 17, "name": "area3_3", "code": "3PR", "color": this.color3 },
        { "id": 18, "name": "area2_6", "code": "4RP", "color": this.color2 },
        { "id": 19, "name": "area2_7", "code": "4R", "color": this.color2 },
        { "id": 20, "name": "area2_5", "code": "4RA", "color": this.color2 },
        { "id": 21, "name": "area3_5", "code": "4EQ", "color": this.color3 },
        { "id": 22, "name": "area3_4", "code": "4PA", "color": this.color3 },
        { "id": 23, "name": "area3_7", "code": "4P", "color": this.color3 },
        { "id": 24, "name": "area3_6", "code": "4PR", "color": this.color3 },
        { "id": 25, "name": "area2_8", "code": "5RP", "color": this.color2 },
        //{ "id": 26, "name": "area_000", "code": "4R", "color": this.color3 },
        //{ "id": 27, "name": "area_000", "code": "5P", "color": this.color3 },
        { "id": 28, "name": "area3_8", "code": "5PR", "color": this.color3 }
    ];

}
