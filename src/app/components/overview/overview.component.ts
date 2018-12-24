import { Component, OnInit } from "@angular/core";
import { GqlQueriesService } from "../../../services/queries/gql-queries.service";
import { OverviewService } from "../../../services/overview/overview.service";
import { Apollo } from "apollo-angular";
import { Chart } from "chart.js";
@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"]
})
export class OverviewComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private gqlQueriesService: GqlQueriesService,
    private overview: OverviewService
  ) {}
  gqlQuery: any;
  stats: any;
  ngOnInit() {
    this.apollo
      .watchQuery({ query: this.gqlQueriesService.GET_REPOS_COMMITS })
      .valueChanges.subscribe(({ data }) => {
        this.gqlQuery = data;

        this.stats = this.overview.formatData(
          this.gqlQuery.viewer.repositories.nodes
        );
      });

    var speedCanvas = document.getElementById("speedChart");

    setTimeout(() => {
      var chartOptions = {
        legend: {
          display: true,
          position: "top",
          labels: {
            boxWidth: 80,
            fontColor: "black"
          }
        }
      };

      let linec = new Chart(speedCanvas, {
        type: "line",
        data: this.stats,
        options: chartOptions
      });
    }, 3000);
  }
}
