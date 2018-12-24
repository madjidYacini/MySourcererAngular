import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  scrollTo(value: string) {
    if (value === "commitView") {
      window.scroll(0, 1400);
    } else {
      var offsetHeight = document.getElementById(value).clientHeight;
      window.scroll(0, offsetHeight);
    }
  }
}
