import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home';
import { QuestionsComponent } from './modules/questions';
import { PagesComponent, PageComponent } from './modules/pages';
import { SurveysComponent, SurveyComponent } from './modules/surveys';
import { SolutionsComponent, SolutionComponent } from './modules/solutions';
import { ResultsComponent } from './modules/results';
import { TemplatesComponent } from './modules/templates';
import { AuthFilter, TokenRefreshFilter } from './auth';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'login', component: HomeComponent, canActivate: [TokenRefreshFilter] },
            { path: 'home', component: HomeComponent, canActivate: [AuthFilter] },
            {
                path: 'surveys', canActivate: [AuthFilter], children: [
                    { path: 'question/list', component: QuestionsComponent, },
                    { path: 'page/list', component: PagesComponent, },
                    { path: 'page/:id', component: PageComponent, },
                    { path: 'page', component: PageComponent },
                    { path: 'survey/list', component: SurveysComponent },
                    { path: 'survey/:id', component: SurveyComponent },
                    { path: 'survey', component: SurveyComponent }
                ]
            },
            {
                path: 'solutions', canActivate: [AuthFilter], children: [
                    { path: 'result/list', component: ResultsComponent },
                    { path: 'solution/list', component: SolutionsComponent },
                    { path: 'solution/:id', component: SolutionComponent },
                    { path: 'solution', component: SolutionComponent }
                ]
            },
            {
                path: 'mail', canActivate: [AuthFilter], children: [
                    { path: 'template/list', component: TemplatesComponent }
                ]
            },
            { path: '**', redirectTo: '/home' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
