import { Component, ViewChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { JobPositionsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-job-positions',
    templateUrl: './jobPositions.component.html',
    styleUrls: ['./jobPosition.component.scss', '../../components/data-grid/data-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class JobPositionsComponent extends CrudComponent {

    @ViewChild(JobPositionsDataGridComponent) dataGrid: DataGridComponent;

    ngOnInit() {
        super.ngOnInit();
        this.initMap();
    }

    initMap() {
        for (let i = 0; i < this.regions.length; i++) {
            $('#' + this.regions[i].region_code)
                .css({ 'fill': this.regions[i].color })
                .data('region', this.regions[i]);
        }

        $('.mapArea').mouseover(function(e) {
            var region_data = $(this).data('region');
            if (e.target.id == '') {
                return;
            }
            $('<div class="map_tooltip">' + region_data.region_name + '<br>' +
                'Details: ' + region_data.details.toLocaleString("en-US") +
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
        {
            "region_name": "Região 1",
            "region_code": "region1area",
            "details": "<u>bla bla bla</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 2",
            "region_code": "region2area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 3",
            "region_code": "region3area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 4",
            "region_code": "region4area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 5",
            "region_code": "region5area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 6",
            "region_code": "region6area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 7",
            "region_code": "region7area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 8",
            "region_code": "region8area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 9",
            "region_code": "region9area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        },
        {
            "region_name": "Região 10",
            "region_code": "region10area",
            "details": "<u>ble ble ble</u>",
            "color": "rgba(255, 255, 255, 0.75)"
        }
    ];
}
