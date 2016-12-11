import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from '../../services/tmdb/tmdb.service';
import { Observable } from 'rxjs/Observable';
import { PageTmdb } from '../models/page-tmdb';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  searchTxt: string;
  timeout: any;
  private pageRes: PageTmdb;
  private resultSearch: any[];
  private observableTime: any;

  constructor(private tmdb: TmdbService) { 
  	this.searchTxt = '';
  }

  ngOnInit() {
  }

  searchTyping(txt: string) {
    if(this.observableTime) this.observableTime.unsubscribe();
    this.observableTime = Observable.timer(1000).subscribe(() => {
        this.multiSearch(encodeURI(txt));
    });
  }

  multiSearch(query: string) {
    if(query.length > 3) {
        this.tmdb.searchMulti( query )
        .subscribe( res => {
          this.pageRes = res;
          this.resultSearch = this.pageRes.results;
        });
    }else {
        this.resultSearch = null;
    }
    
  }

  clearSearch() {
    this.resultSearch = null;
    this.searchTxt = '';
  }

}
