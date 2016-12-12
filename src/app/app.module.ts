import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { CovalentCoreModule, TD_LOADING_ENTRY_COMPONENTS } from '@covalent/core';
import { CovalentChipsModule } from '@covalent/chips';
import { CovalentFileModule } from '@covalent/file-upload';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentJsonFormatterModule } from '@covalent/json-formatter';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentChartsModule } from '@covalent/charts';
import { CovalentDataTableModule } from '@covalent/data-table';
import { CovalentPagingModule } from '@covalent/paging';
import { CovalentSearchModule } from '@covalent/search';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/+form/form.component';
import { LogsComponent } from './logs/logs.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
import { FeaturesFormComponent } from './dashboard-product/features/+form/form.component';
import { appRoutes, appRoutingProviders } from './app.routes';

import { ChartComponent } from '../components/chart/chart.component';
import { ButtonDisableFix } from '../directives/button-disable-fix.directive';
import { TmdbService } from '../services/tmdb/tmdb.service';

import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { DashboardMoviesComponent } from './dashboard-movies/dashboard-movies.component';
import { MoviesPopularComponent } from './movies-popular/movies-popular.component';
import { TvPopularComponent } from './tv-popular/tv-popular.component';
import { PeoplePopularComponent } from './people-popular/people-popular.component';
import { MoviesLatestComponent } from './movies-latest/movies-latest.component';
import { TvLatestComponent } from './tv-latest/tv-latest.component';
import { AuthorsLatestComponent } from './authors-latest/authors-latest.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { SearchComponent } from './search/search.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { TvPageComponent } from './tv-page/tv-page.component';
import { PersonPageComponent } from './person-page/person-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    DashboardProductComponent,
    ProductOverviewComponent,
    ProductStatsComponent,
    ProductFeaturesComponent,
    FeaturesFormComponent,
    UsersComponent,
    UsersFormComponent,
    LogsComponent,
    FormComponent,
    DetailComponent,
    LoginComponent,
    ChartComponent,
    // Bugfix for disabled anchor button in material.alpha-10 (remove in alpha-11)
    ButtonDisableFix,
    DashboardMoviesComponent,
    MoviesPopularComponent,
    TvPopularComponent,
    PeoplePopularComponent,
    MoviesLatestComponent,
    TvLatestComponent,
    AuthorsLatestComponent,
    NowPlayingComponent,
    SearchComponent,
    MoviePageComponent,
    TvPageComponent,
    PersonPageComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    CovalentCoreModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentChipsModule.forRoot(),
    CovalentDataTableModule.forRoot(),
    CovalentFileModule.forRoot(),
    CovalentHttpModule.forRoot([RequestInterceptor]),
    CovalentHighlightModule.forRoot(),
    CovalentJsonFormatterModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
    CovalentPagingModule.forRoot(),
    CovalentSearchModule.forRoot(),
    appRoutes,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    Title,
    TmdbService,
  ], // additional providers needed for this module
  entryComponents: [ TD_LOADING_ENTRY_COMPONENTS ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
