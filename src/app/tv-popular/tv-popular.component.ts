import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { PageTmdb } from '../models/page-tmdb';
import { TvTmdb } from '../models/tv-tmdb';

@Component({
  selector: 'app-tv-popular',
  templateUrl: './tv-popular.component.html',
  styleUrls: ['./tv-popular.component.scss'],
  animations: [
      trigger('visibilityTvChanged', [
        state('shown' , style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('.5s'))
      ])
    ]
})
export class TvPopularComponent implements OnInit {

  /*
   * visibilityTv is for show and hide the backdrop_path image
   * with a small animation
   */
  visibilityTv = 'shown';

  /*
   * Private variables
   */
  private pageRes: PageTmdb;
  private tvShows: TvTmdb[];
  private position: number = -1;
  private observableTime: any;
  private tvActive: number;

  constructor(private tmdb: TmdbService) {
    this.visibilityTv = 'shown';
  }

  ngOnInit() {
    this.tvshowsPopular(1);
  }

  /*
   * Getting data about tvShows popular
   * the pageRes first is set with one interface
   */
  tvshowsPopular(page: number) {
    this.tmdb.getPopularTvShows( page )
    .subscribe( res => {
      this.pageRes = res;
      this.tvShows = this.pageRes.results;
      this.slide();
      this.observableInterval();
    });
  }

  /*
   * slide allow change the current tvShows visible by another tvShow
   * if the tvShow is the last tvShow to show, it call the next page in tvshowsPopular
   */
  slide() {
    Observable.timer(500).subscribe(() => {
      let count = this.pageRes.results.length - 1;
      if (this.tvShows) {
        /*
         * if slide already ran all the tvShows
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
          this.tvshowsPopular(this.tmdb.nextPage(this.pageRes.page, this.pageRes.total_pages));
        } else {
          this.position++;
        }
        if(!this.tvShows['backdrop_path']) {
          this.position++;
        }
        /*
         * show the tvShow
         */
        this.tvActive = this.tvShows[this.position]['id'];
        this.visibilityTv = 'shown';
      }
    });
  }

  /*
   * observableInterval allow call the next tvShow to show,
   * every tvShow is showed by 10sec, after that the interval -
   * call the function slide to show the next tvShow.
   */
  observableInterval() {
    this.observableTime = Observable.interval(10000).subscribe(() => {
      this.visibilityTv = 'hidden';
      this.slide();
    });
  }

}
