import { ProfileComponent } from "./components/profile/profile.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { AppComponent } from "./app.component";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { CommitsViewComponent } from "./components/commits-view/commits-view.component";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatCardModule
} from "@angular/material";
import { MatGridListModule } from "@angular/material/grid-list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PieChartComponent } from "./components/pie-chart/pie-chart.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  exports: [MatExpansionModule, FlexLayoutModule, MatGridListModule],
  declarations: [
    AppComponent,
    ProfileComponent,
    CommitsViewComponent,
    PieChartComponent,
    RepositoriesComponent,
    OverviewComponent
  ],
  imports: [
    MatGridListModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({
      uri: "https://api.github.com/graphql"
    });
    const auth = setContext((_, { headers }) => {
      const token = environment.REACT_APP_GITHUB_TOKEN;
      if (!token) {
        return {};
      } else {
        return {
          headers: { Authorization: `Bearer ${token}` }
        };
      }
    });
    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}
