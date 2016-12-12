import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptorService, RESTService } from '@covalent/http';
import { API_TMDB, APITMDB_ITFC } from '../../config/apiTmdb.config';
import { PageTmdb } from '../../app/models/page-tmdb';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TmdbService {

    private api: APITMDB_ITFC = API_TMDB;

    constructor(private http: Http) {}

    tmdbGetV3(url: string, params: string): any {

        let headers = new Headers();

        return this.http
            .get(
                this.api.API_URL_V3+'/'+url+'?api_key='+this.api.API_KEY_V3+params,
                { headers }
            )
            .map(res => res.json())
            .map((res) => {
            return res;
        });
    };

    nextPage(page: number, pages: number) :number {
      if(page === pages) {
        return 1;
      } else {
        return page + 1;
      }
    }

    getPopularMovies(page: number) :any {
        return this.tmdbGetV3('movie/popular', '&language=en-US&page='+page);
    }

    getPopularTvShows(page: number) :any {
        return this.tmdbGetV3('tv/popular', '&language=en-US&page='+page);
    }

    getPopularPeople(page: number) :any {
        return this.tmdbGetV3('person/popular', '&language=en-US&page='+page);
    }

    getNowPlayingMovies(page: number) :any {
        return this.tmdbGetV3('movie/now_playing', '&language=en-US&page='+page);
    }

    searchMulti(query: string) :any {
        return this.tmdbGetV3('search/multi', '&language=en-US&query='+query);
    }

}
