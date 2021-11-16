import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DocsComponent } from './docs/docs.component';
import { ExampleComponent } from './example/example.component';
import { HomeComponent } from './home/home.component';
import { SourceCodeComponent } from './source-code/source-code.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'docs', component: DocsComponent },
    { path: 'example', component: ExampleComponent },
    { path: 'source-code', component: SourceCodeComponent },
    { path: 'about', component: AboutComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
