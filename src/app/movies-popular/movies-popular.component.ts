import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { PageTmdb } from '../models/page-tmdb';
import { MovieTmdb } from '../models/movie-tmdb';

@Component({
    selector: 'app-movies-popular',
    templateUrl: './movies-popular.component.html',
    styleUrls: ['./movies-popular.component.scss'],
    animations: [
      trigger('visibilityMovieChanged', [
        state('shown' , style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('.5s'))
      ])
    ]
})
export class MoviesPopularComponent implements OnInit {

  /*
   * visibilityMovie is for show and hide the backdrop_path image
   * with a small animation
   */
  visibilityMovie = 'shown';

  /*
   * Private variables
   */
  private pageRes: PageTmdb;
  private movies: MovieTmdb[];
  private position: number = -1;
  private observableTime: any;
  private movieActive: number;

  constructor(private tmdb: TmdbService) {
    this.visibilityMovie = 'shown';
  }

  ngOnInit() {
    this.moviesPopular(1);
  }

  /*
   * Getting data about movies popular
   * the pageRes first is set with one interface
   */
  moviesPopular(page: number) {
    this.tmdb.getPopularMovies( page )
    .subscribe( res => {
      this.pageRes = res;
      this.movies = this.pageRes.results;
      this.slide();
      this.observableInterval();
    });
  }

  /*
   * slide allow change the current movies visible by another movie
   * if the movie is the last movie to show, it call the next page in moviesPopular
   */
  slide() {
    Observable.timer(500).subscribe(() => {
      let count = this.pageRes.results.length - 1;
      if (this.movies) {
        /*
         * if slide already ran all the movies
         * it call the next page
         */
        if(this.position == count) {
          this.position = 0;
          /*
           * Stop observable interval
           */
          this.observableTime.unsubscribe();
          /*
           * Call the next page and start again
           */
          this.moviesPopular(this.tmdb.nextPage(this.pageRes.page, this.pageRes.total_pages));
        } else {
          this.position++;
        }
        if(!this.movies['backdrop_path']) {
          this.position++;
        }
        /*
         * show the movie
         */
        this.movieActive = this.movies[this.position]['id'];
        this.visibilityMovie = 'shown';
      }
    });
  }

  /*
   * observableInterval allow call the next movie to show,
   * every movie is showed by 10sec, after that the interval -
   * call the function slide to show the next movie.
   */
  observableInterval() {
    this.observableTime = Observable.interval(10000).subscribe(() => {
      this.visibilityMovie = 'hidden';
      this.slide();
    });
  }

}
