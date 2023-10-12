import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  env = environment;


  sources$ = this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.env.apiKey);
  initArticles$ = this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.env.apiKey);
  getArticlesByID$ = (source: string) => this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.env.apiKey);

}
