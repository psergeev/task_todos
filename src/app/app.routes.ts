import { ClientRoutes } from './client/client.routes';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { Route } from '@angular/router';

export const routes: Route[] = [{
  path: '',
  component: LayoutComponent,
  children: [
    ...ClientRoutes,
  ]
}];
