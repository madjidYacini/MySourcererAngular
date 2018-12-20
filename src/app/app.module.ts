import { ProfileComponent } from "./profile/profile.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { AppComponent } from "./app.component";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { CommitsViewComponent } from './commits-view/commits-view.component';
@NgModule({
  declarations: [AppComponent, ProfileComponent, CommitsViewComponent],
  imports: [BrowserModule, HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const http = httpLink.create({
      uri: "https://api.github.com/graphql"
    });
    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = "0c19a28a750a7fd2f0fae95300b1658a810866c1";

      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
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
