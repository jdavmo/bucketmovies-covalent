import { Component, OnInit, trigger, state, animate, transition, style } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { PageTmdb } from '../models/page-tmdb';
import { PeopleTmdb } from '../models/people-tmdb';

@Component({
  selector: 'app-people-popular',
  templateUrl: './people-popular.component.html',
  styleUrls: ['./people-popular.component.scss'],
  animations: [
      trigger('visibilityPeopleChanged', [
        state('shown' , style({ opacity: 1 })),
        state('hidden', style({ opacity: 0 })),
        transition('* => *', animate('.5s'))
      ])
    ]
})
export class PeoplePopularComponent implements OnInit {

  /*
   * visibilityAuthor is for show and hide the backdrop_path image
   * with a small animation
   */
  visibilityAuthor = 'shown';

  /*
   * Private variables
   */
  private pageRes: PageTmdb;
  private people: PeopleTmdb[];
  private position: number = -1;
  private observableTime: any;
  private personActive: number;

  constructor(private tmdb: TmdbService) {
    this.visibilityAuthor = 'shown';
  }

  ngOnInit() {
    this.peoplePopular(1);
  }

  /*
   * Getting data about people popular
   * the pageRes first is set with one interface
   */
  peoplePopular(page: number) {
    this.tmdb.getPopularPeople( page )
    .subscribe( res => {
      this.pageRes = res;
      this.people = this.pageRes.results;
      this.slide();
      this.observableInterval();
    });
  }

  /*
   * slide allow change the current people visible by another person
   * if the person is the last person to show, it call the next page in peoplePopular
   */
  slide() {
    Observable.timer(500).subscribe(() => {
      let count = this.pageRes.results.length - 1;
      if (this.people) {
        /*
         * if slide already ran all the people
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
          this.peoplePopular(this.tmdb.nextPage(this.pageRes.page, this.pageRes.total_pages));
        } else {
          this.position++;
        }
        if(!this.people['profile_path']) {
          this.position++;
        }
        /*
         * show the person
         */
        this.personActive = this.people[this.position]['id'];
        this.visibilityAuthor = 'shown';
      }
    });
  }

  /*
   * observableInterval allow call the next person to show,
   * every person is showed by 10sec, after that the interval -
   * call the function slide to show the next person.
   */
  observableInterval() {
    this.observableTime = Observable.interval(10000).subscribe(() => {
      this.visibilityAuthor = 'hidden';
      this.slide();
    });
  }

}
