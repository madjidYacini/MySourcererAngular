import { Component, OnInit } from "@angular/core";
import { GqlQueriesService } from "../services/queries/gql-queries.service";
import { CommitsService } from "../services/commitsG/commits.service";
import { Apollo } from "apollo-angular";
import { CommitsData } from "../interfaces/commitsData.i";
@Component({
  selector: "app-commits-view",
  templateUrl: "./commits-view.component.html",
  styleUrls: ["./commits-view.component.css"]
})
export class CommitsViewComponent implements OnInit {
  gqlQuery: any;
  constructor(
    private apollo: Apollo,
    private gqlQueriesService: GqlQueriesService,
    private commitsService: CommitsService
  ) {}
  stats: CommitsData[] = [];

  ngOnInit() {
    this.apollo
      .watchQuery({ query: this.gqlQueriesService.GET_USER_RC })
      .valueChanges.subscribe(({ data }) => {
        this.gqlQuery = data;
        console.log(this.gqlQuery.viewer);
        this.stats = this.commitsService.getCommitStat(this.gqlQuery.viewer);
        console.log(this.stats);
      });
  }
}
