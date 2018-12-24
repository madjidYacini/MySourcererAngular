import { Component, OnInit } from "@angular/core";
// import { Component, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import "rxjs";

import { PaginationService } from "../../../services/pager/pagination.service";
@Component({
  selector: "app-repositories",
  templateUrl: "./repositories.component.html",
  styleUrls: ["./repositories.component.css"]
})
export class RepositoriesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private pagerService: PaginationService
  ) {}

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    let json = "";

    this.http
      .get("https://jsonplaceholder.typicode.com/todos/1")
      // .map((response: Response) => response.json())
      .subscribe(data => {
        // set items to json response
        // initialize to page 1
        this.setPage(1);
      });
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
