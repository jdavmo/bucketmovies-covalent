import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';

@Component({
  selector: 'app-dashboard-movies',
  templateUrl: './dashboard-movies.component.html',
  styleUrls: ['./dashboard-movies.component.scss']
})
export class DashboardMoviesComponent implements OnInit {

	constructor() {}

	ngOnInit() {
	}

}
