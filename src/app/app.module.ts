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
import { AlertComponent, AutofocusDirective, InfoModalComponent, CheckboxComponent, DisabledCheckboxComponent, PersistNavigationComponent, FilterControlsComponent } from './components';
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
import { JobPositionsComponent, JobPositionComponent, JobPositionsDataGridComponent, TemperamentoMapFormComponent, ComportamentoMapFormComponent, MotivacaoFormComponent } from './modules/jobPositions';
import { DepartmentsComponent, DepartmentModalComponent, DepartmentsDataGridComponent } from './modules/departments';
import { IndustriesComponent, IndustriesDataGridComponent, IndustryModalComponent } from './modules/industries';

// Client
// import { ClientComponent } from './modules/clients';

@NgModule({
    declarations: [
        // Shared
        AppComponent,
        HeaderComponent,
        HomeComponent,

        AlertComponent,
        InfoModalComponent,
        FilterControlsComponent,
        CheckboxComponent,
        DisabledCheckboxComponent,
        PersistNavigationComponent,

        // Directives
        AutofocusDirective,

        // Survey
        QuestionsComponent,
        QuestionsDataGridComponent,
        QuestionModalComponent,

        PagesComponent,
        PageComponent,
        PagesDataGridComponent,

        SurveysComponent,
        SurveyComponent,
        SurveysDataGridComponent,

        // Solution
        SolutionsComponent,
        SolutionComponent,
        SolutionsDataGridComponent,
        ResultsComponent,
        ResultsDataGridComponent,
        ResultModalComponent,

        // Mail
        TemplatesComponent,
        TemplatesDataGridComponent,
        TemplateModalComponent,

        // Job Positions
        JobPositionsComponent,
        JobPositionComponent,
        JobPositionsDataGridComponent,
        TemperamentoMapFormComponent,
        ComportamentoMapFormComponent,
        MotivacaoFormComponent,

        DepartmentsComponent,
        DepartmentModalComponent,
        DepartmentsDataGridComponent,

        IndustriesComponent,
        IndustriesDataGridComponent,
        IndustryModalComponent,

        // Clients

        // ClientComponent
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
