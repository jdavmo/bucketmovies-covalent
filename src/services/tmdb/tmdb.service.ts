import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptorService, RESTService } from '@covalent/http';
import { MOCK_API_V3, MOCK_API_KEY_V3, MOCK_API_V4, MOCK_API_KEY_V4 } from '../../config/apiTmdb.config';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TmdbService {

	constructor(private http: Http) {}

	tmdbGetV3(url: string, params: string): any{

		let headers = new Headers();

		return this.http
			.get(
				MOCK_API_V3+'/'+url+'?api_key='+MOCK_API_KEY_V3+params,
				{ headers }
			)
			.map(res => res.json())
			.map((res) => {
				return res;
			});
	};

}
