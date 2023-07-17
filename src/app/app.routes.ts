//  lazy loading for children based on routes
import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    {
        path : '',
        children : [
            {
                path: 'display',
                loadComponent: () => import('./display/display.component')
                                           .then(c => c.DisplayComponent)

            },
        ]
    }
]