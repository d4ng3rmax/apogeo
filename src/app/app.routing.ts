import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthFilter } from './auth';
import { HomeComponent } from './modules/home';

import { QuestionsComponent } from './modules/questions';
import { PagesComponent, PageComponent } from './modules/pages';
import { SurveysComponent, SurveyComponent } from './modules/surveys';

import { SolutionsComponent, SolutionComponent } from './modules/solutions';
import { ResultsComponent } from './modules/results';

import { TemplatesComponent } from './modules/templates';

import { JobPositionsComponent, JobPositionComponent } from './modules/jobPositions';
import { DepartmentsComponent } from './modules/departments';
import { IndustriesComponent } from './modules/industries';

import { DistributorComponent, DistributorsComponent } from './modules/register';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        canActivate: [AuthFilter],
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'login', component: HomeComponent },
            {
                // path: 'settings', component: HomeComponent, children: [
                // {
                path: 'surveys', children: [
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
                path: 'solutions', children: [
                    { path: 'result/list', component: ResultsComponent },
                    { path: 'solution/list', component: SolutionsComponent },
                    { path: 'solution/:id', component: SolutionComponent },
                    { path: 'solution', component: SolutionComponent }
                ]
            },
            {
                path: 'mail', children: [
                    { path: 'template/list', component: TemplatesComponent }
                ]
            },
            {
                path: 'jobs', children: [
                  { path: 'jobPosition/list', component: JobPositionsComponent },
                  { path: 'jobPosition/:id', component: JobPositionComponent },
                  { path: 'jobPosition', component: JobPositionComponent },
                  { path: 'department/list', component: DepartmentsComponent },
                  { path: 'industry/list', component: IndustriesComponent }
                  // { path: 'department/:id', component: DepartmentComponent },
                  // { path: 'department', component: DepartmentComponent }
                ]
            },
            {
                path: 'register', children: [
                  { path: 'distributor/list', component: DistributorsComponent },
                  { path: 'distributor/:id', component: DistributorComponent },
                  { path: 'distributor', component: DistributorsComponent }
                ]
            },
            // ]
            // },
            { path: '**', redirectTo: '' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
