import { Component, OnInit, Input } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"]
})
export class PieChartComponent implements OnInit {
  @Input() data;
  informationsRepo = [];
  commitsArray: number[] = [];
  languages: string[] = [];
  colors: string[] = [];
  lineOCArr: number[] = [];
  constructor() {}

  ngOnInit() {
    this.informationsRepo = this.data;
    this.informationsRepo.map(techno => {
      this.commitsArray.push(techno.commits);
      this.languages.push(techno.language);
      this.colors.push(techno.color);
      this.lineOCArr.push(techno.lineOfCode);
    });
    setTimeout(() => {
      let id = document.getElementById("pieChart");
      new Chart(id, {
        type: "pie",
        data: {
          labels: this.languages,
          datasets: [
            {
              label: "languages (commits)",
              backgroundColor: this.colors,
              data: this.lineOCArr || this.commitsArray
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Languages by line Of Code"
          }
        }
      });
    }, 0);
    setTimeout(() => {
      let Tid = document.getElementById("pieChart2");
      new Chart(Tid, {
        type: "pie",
        data: {
          labels: this.languages,
          datasets: [
            {
              label: "languages (commits)",
              backgroundColor: this.colors,
              data: this.commitsArray
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "languages by commits"
          }
        }
      });
    }, 0);
  }
}
