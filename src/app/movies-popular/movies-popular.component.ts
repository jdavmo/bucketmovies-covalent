import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import {Observable} from 'rxjs/Observable';

@Component({
  	selector: 'app-movies-popular',
  	templateUrl: './movies-popular.component.html',
  	styleUrls: ['./movies-popular.component.scss']
})
export class MoviesPopularComponent implements OnInit {

	private movies: any[];
	private movie: any[];
	private position: number;
	private observableTime: any;
	private page: number;
	private pages: number;

  	constructor(private tmdb: TmdbService) {
  		this.page  = 0;
  		this.pages = 0;
  	}

  	ngOnInit() {

  		this.getPopular();

  	}

  	getPopular() {

  		this.tmdb.tmdbGetV3('movie/popular', '&language=en-US&page='+this.nextPage())
		.subscribe((result) => {
			if (result) {
				this.movies = result.results;
				this.pages  = result.total_pages;
				this.slide();
				this.observableInterval();
			}
		});

  	}

  	nextPage() {

  		if(this.page === this.pages) {
  			this.page = 1;
  		} else {
  			this.page = this.page + 1;
  		}
  		return this.page;

  	}

  	slide() {

  		let count = this.movies.length;

  		if (!this.movie) {
  			this.position = 0;
  			this.movie = [this.movies[this.position]];
  		} else {
  			if(this.position == count-1) {
  				this.position = 0;
  				this.observableTime.unsubscribe();
  				this.getPopular();
  			} else {
  				this.position++;
  			}
  			this.movie = [this.movies[this.position]];
  		}

  		if(!this.movie[0]['backdrop_path']) {
  			this.position++;
  			this.movie = [this.movies[this.position]];
  		}

  	}

  	observableInterval() {

  		this.observableTime = Observable.interval(10000).subscribe(() => {
			this.slide();
		});

  	}

}
