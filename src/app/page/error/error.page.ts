import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "error-page",
  templateUrl: "./error.page.html",
  styleUrls: ["./error.page.css"],
  standalone: true,
  imports: [RouterModule],
})
export class ErrorPage {}
