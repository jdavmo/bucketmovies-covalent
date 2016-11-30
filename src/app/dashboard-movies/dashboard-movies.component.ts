import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';

@Component({
  selector: 'app-dashboard-movies',
  templateUrl: './dashboard-movies.component.html',
  styleUrls: ['./dashboard-movies.component.scss']
})
export class DashboardMoviesComponent implements OnInit {

  	private movies: any[];

	constructor(private tmdb: TmdbService) {}

	ngOnInit() {
		this.tmdb.tmdbGetV3('movie/popular', '&language=en-US')
		.subscribe((result) => {
			if (result) {
				this.movies = result.results;
			}
		});
	}

}
