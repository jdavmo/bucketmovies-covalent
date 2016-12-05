import { Component, OnInit, Input, trigger, state, animate, transition, style } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { PageTmdb } from '../models/page-tmdb';
import { MovieTmdb } from '../models/movie-tmdb';


@Component({
  	selector: 'app-movies-popular',
  	templateUrl: './movies-popular.component.html',
  	styleUrls: ['./movies-popular.component.scss'],
    animations: [
      trigger('visibilityChanged', [
        state('shown' , style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('.5s'))
      ])
    ]
})
export class MoviesPopularComponent implements OnInit {

  visibility = 'shown';

	private pageRes: PageTmdb;
	private movies: MovieTmdb[];
	private position: number;
	private observableTime: any;
	private page: number;
	private pages: number;
  private movieActive: number;

  	constructor(private tmdb: TmdbService) {
  		this.page  = 0;
  		this.pages = 0;
      this.visibility = 'shown';
  	}

  	ngOnInit() {

      this.tmdb.getPopular( this.nextPage() )
        .subscribe( res => {
          this.pageRes = res;
          this.slide();
          this.observableInterval();
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

      Observable.timer(500).subscribe(() => {

    		let count = this.pageRes.results.length;

    		if (!this.movies) {
    			this.position = 0;
    			//this.movies = [this.pageRes.results[this.position]];
          this.movies = this.pageRes.results;
          this.movieActive = this.movies[this.position]['id'];
    		} else {
    			if(this.position == count-1) {
    				this.position = 0;
    				this.observableTime.unsubscribe();
    				this.ngOnInit();
    			} else {
    				this.position++;
    			}
    			this.movies = this.pageRes.results;
          this.movieActive = this.movies[this.position]['id'];
    		}

    		if(!this.movies['backdrop_path']) {
    			this.position++;
    			this.movies = this.pageRes.results;
          this.movieActive = this.movies[this.position]['id'];
    		}

        this.visibility = 'shown';

      });

  	}

  	observableInterval() {

  		this.observableTime = Observable.interval(10000).subscribe(() => {
          this.visibility = 'hidden';
          this.slide();
  		});

  	}

}
