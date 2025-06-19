import { Routes } from '@angular/router';
import { PostsComponent } from './page/posts/posts.component';

export const routes: Routes = [
    {
        path:'',
        component:PostsComponent
    },
    {
        path:'**',
        redirectTo:''
    }
];
