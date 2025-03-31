import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // ✅ Check the correct path
import { appRouting } from './app/app.routes'; // ✅ Ensure path is correct

bootstrapApplication(AppComponent, {
  providers: [appRouting]
}).catch(err => console.error(err));
