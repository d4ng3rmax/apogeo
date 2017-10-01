import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

// Shared
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header';
import { HomeComponent } from './modules/home'
import { AlertComponent, AutofocusDirective, CheckboxComponent, DisabledCheckboxComponent, PersistNavigationComponent, FilterControlsComponent } from './components';
import { AuthFilter, AuthService } from './auth';

// Survey
import { QuestionsComponent, QuestionsDataGridComponent, QuestionModalComponent } from './modules/questions';
import { PagesComponent, PageComponent, PagesDataGridComponent } from './modules/pages';
import { SurveysComponent, SurveyComponent, SurveysDataGridComponent } from './modules/surveys';

// Solution
import { SolutionsComponent, SolutionComponent, SolutionsDataGridComponent } from './modules/solutions';
import { ResultsComponent, ResultsDataGridComponent, ResultModalComponent } from './modules/results';

// Mail
import { TemplatesComponent, TemplatesDataGridComponent, TemplateModalComponent } from './modules/templates';

// Job Positions
import { JobPositionsComponent, JobPositionModalComponent, JobPositionsDataGridComponent } from './modules/jobPositions';

@NgModule({
    declarations: [
        // Shared
        AppComponent, HeaderComponent, HomeComponent,
        AlertComponent, FilterControlsComponent, CheckboxComponent, DisabledCheckboxComponent, PersistNavigationComponent,

        // Directives
        AutofocusDirective,

        // Survey
        QuestionsComponent, QuestionsDataGridComponent, QuestionModalComponent,
        PagesComponent, PageComponent, PagesDataGridComponent,
        SurveysComponent, SurveyComponent, SurveysDataGridComponent,

        // Solution
        SolutionsComponent, SolutionComponent, SolutionsDataGridComponent,
        ResultsComponent, ResultsDataGridComponent, ResultModalComponent,

        // Mail
        TemplatesComponent, TemplatesDataGridComponent, TemplateModalComponent,

        // Job Positions
        JobPositionsComponent, JobPositionModalComponent, JobPositionsDataGridComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NgxPaginationModule,
        Ng2SmartTableModule,
        AppRoutingModule,
        Ng2Bs3ModalModule,
    ],
    providers: [AuthService, AuthFilter],
    bootstrap: [AppComponent],
    entryComponents: [CheckboxComponent, DisabledCheckboxComponent]
})
export class AppModule { }
