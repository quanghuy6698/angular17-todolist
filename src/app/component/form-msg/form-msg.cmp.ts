import { CommonModule } from "@angular/common";
import { Component, Input, signal } from "@angular/core";

@Component({
  selector: "form-msg-cmp",
  templateUrl: "./form-msg.cmp.html",
  styleUrls: ["./form-msg.cmp.css"],
  standalone: true,
  imports: [CommonModule],
})
export class FormMsgCmp {
  @Input("type") type: string = "success";
  @Input("msg") msg: string = "";

  constructor() {}
}
