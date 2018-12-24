import { Component, OnInit } from "@angular/core";
import { GqlQueriesService } from "../../../services/queries/gql-queries.service";
import { ProfileTraitementService } from "../../../services/profile/profile-traitement.service";
import { Apollo } from "apollo-angular";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  gqlQuery: any;

  constructor(
    private apollo: Apollo,
    private gqlQueriesService: GqlQueriesService,
    private profileTraitment: ProfileTraitementService
  ) {}
  userData: any;
  ngOnInit() {
    this.apollo
      .watchQuery({ query: this.gqlQueriesService.GET_USER_INFO })
      .valueChanges.subscribe(({ data, loading }) => {
        if (loading) {
        }

        this.gqlQuery = data;
        this.userData = this.profileTraitment.getAvatarInfo(
          this.gqlQuery.viewer
        );
      });
  }
  // this.userData.sub
}
