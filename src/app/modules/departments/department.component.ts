import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from './department.service';
import { Alert, Department } from '../../models';
import { EditComponent } from '../../components';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss', '../../app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DepartmentService]
})
export class DepartmentComponent extends EditComponent {

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: DepartmentService) {
        super(route, router, service);
        this.listPath = '/jobs/department/list';
        this.object = this.newEntity({ id: 0, name: '', department: {}, clientId: 0 });
    }

    newEntity(serverObject: any) {
        return new Department(serverObject.id, serverObject.name, serverObject.industry, serverObject.clientId);
    }

    ngOnInit() {
        super.ngOnInit();
        this.initMap();
    }

    initMap() {
        console.log('Initializing map... ' + $('#area1_1'));
        var localRegions = {};
        for (let i = 0; i < this.regions.length; i++) {
            localRegions[this.regions[i].name] = this.regions[i];
            console.log('region: ' + localRegions[this.regions[i].name]);
            $('#' + this.regions[i].code)
                .css({ 'fill': this.regions[i].color });
            let name = this.regions[i].name;
            let color = this.regions[i].color;
            $('#' + name).hover(function(){
                $(this).css("fill", color);
            }, function(){
                var data = localRegions[this.id];
                if(!data.selected) {
                    $(this).css("fill", "white");
                }
            });
        }

        $('.mapArea').click(function(e){
            var data = localRegions[this.id];
            for(var i in localRegions) {
                localRegions[i].selected = false;
                $('#' + localRegions[i].name).css("fill", "white");
            }
            data.selected = true;
            $('#' + data.name).css("fill", data.color);
            $('#description').html(data.details.toLocaleString("en-US"));
        })
        .mouseover(function(e) {
            if(this.id === undefined || this.id === '') { return; }
            var data = localRegions[this.id];
            $('<div class="map_tooltip">' + data.code + '<br>' +
                'Details: ' + data.details.toLocaleString("en-US") +
                '</div>'
            ).appendTo('body');
        })
        .mouseleave(function() {
            $('.map_tooltip').remove();
        })
        .mousemove(function(e) {
            var mouseX = e.pageX,
                mouseY = e.pageY;

            $('.map_tooltip').css({
                top: mouseY - 75,
                left: mouseX - ($('.map_tooltip').width() / 2 - 75)
            });
        });
    }

    regions: any = [
        { "name": "area1_1", "code": "1A", "details": "<u>1A</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_2", "code": "1AR", "details": "<u>1AR</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_3", "code": "1EQ", "details": "<u>1EQ</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_4", "code": "1AP", "details": "<u>1AP</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_5", "code": "2A", "details": "<u>2A</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_6", "code": "2AR", "details": "<u>2AR</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_7", "code": "2EQ", "details": "<u>2EQ</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_8", "code": "2AP", "details": "<u>2AP</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_9", "code": "3AR", "details": "<u>3AR</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area1_10", "code": "3AP", "details": "<u>3AP</u>", "color": "rgba(40, 185, 255, 0.75)" },
        { "name": "area2_1", "code": "3EQ", "details": "<u>3EQ</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_2", "code": "2RA", "details": "<u>2RA</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_3", "code": "3AR", "details": "<u>3AR</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_4", "code": "3RP", "details": "<u>3RP</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_5", "code": "4RA", "details": "<u>4RA</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_6", "code": "4RP", "details": "<u>4RP</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_7", "code": "4R", "details": "<u>4R</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area2_8", "code": "5RP", "details": "<u>5RP</u>", "color": "rgba(196, 4, 82, 0.75)" },
        { "name": "area3_1", "code": "3PA", "details": "<u>3PA</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_2", "code": "2PA", "details": "<u>2PA</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_3", "code": "3PR", "details": "<u>3PR</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_4", "code": "4PA", "details": "<u>4PA</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_5", "code": "4EQ", "details": "<u>4EQ</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_6", "code": "4PR", "details": "<u>4PR</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_7", "code": "4P", "details": "<u>4P</u>", "color": "rgba(30, 240, 159, 0.75)" },
        { "name": "area3_8", "code": "5PR", "details": "<u>5PR</u>", "color": "rgba(30, 240, 159, 0.75)" }
    ];
}
