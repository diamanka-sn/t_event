import {Component, OnInit, ViewChild} from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-chart-events',
  templateUrl: './chart-events.component.html',
  styleUrls: ['./chart-events.component.scss']
})
export class ChartEventsComponent implements OnInit{

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      width: 380,
      type: "pie"
    },
    labels: [],
    responsive: []
  };

  constructor() {

  }

  ngOnInit(): void {
    this.defineChart();
  }

  public defineChart(){
    this.chartOptions.series = [44, 55, 13, 43, 22];
    this.chartOptions.labels = ["Team A", "Team B", "Team C", "Team D", "Team E"];
    this.chartOptions.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ];
  }
}
