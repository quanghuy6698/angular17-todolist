import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppCmp } from "./app/app.cmp";

bootstrapApplication(AppCmp, appConfig).catch((err) => console.error(err));
