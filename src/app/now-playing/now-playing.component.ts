import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { PageTmdb } from '../models/page-tmdb';
import { MovieTmdb } from '../models/movie-tmdb';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss'],
  animations: [
      trigger('visibilityNowPlayingChanged', [
        state('shown' , style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('.5s'))
      ])
    ]
})
export class NowPlayingComponent implements OnInit {

  /*
   * visibilityNowPlaying is for show and hide the backdrop_path image
   * with a small animation
   */
  visibilityNowPlaying = 'shown';

  /*
   * Private variables
   */
  private pageRes: PageTmdb;
  private nowPlaying: MovieTmdb[];
  private position: number = -1;
  private observableTime: any;
  private playingActive: number;

  constructor(private tmdb: TmdbService) {
    this.visibilityNowPlaying = 'shown';
  }

  ngOnInit() {
    this.moviesNowPlaying(1);
  }

  /*
   * Getting data about movies popular
   * the pageRes first is set with one interface
   */
  moviesNowPlaying(page: number) {
    this.tmdb.getNowPlayingMovies( page )
    .subscribe( res => {
      this.pageRes = res;
      this.nowPlaying = this.pageRes.results;
      this.slide();
      this.observableInterval();
    });
  }

  /*
   * slide allow change the current movies visible by another movie
   * if the movie is the last movie to show, it call the next page in moviesNowPlaying
   */
  slide() {
    Observable.timer(500).subscribe(() => {
      let count = this.pageRes.results.length - 1;
      if (this.nowPlaying) {
        /*
         * if slide already ran all the nowPlaying
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
          this.moviesNowPlaying(this.tmdb.nextPage(this.pageRes.page, this.pageRes.total_pages));
        } else {
          this.position++;
        }
        if(!this.nowPlaying['backdrop_path']) {
          this.position++;
        }
        /*
         * show the movie
         */
        this.playingActive = this.nowPlaying[this.position]['id'];
        this.visibilityNowPlaying = 'shown';
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
      this.visibilityNowPlaying = 'hidden';
      this.slide();
    });
  }

}
