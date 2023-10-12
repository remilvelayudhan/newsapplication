import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './services/news.service';
import { Observable, catchError, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'newsapplication';
  errorMessage = "";
  selectedNewsChannel = "";
  @ViewChild('menu') menu!: MatSidenav;
  private observer = inject(BreakpointObserver);
  private changeDetection = inject(ChangeDetectorRef);
  private newServices = inject(NewsService);
  sources$: Observable<any> | undefined;
  initArticles$: Observable<any> | undefined;
  ngOnInit(): void {
    this.sources$ = this.newServices.sources$.pipe(map((data: any) => data.sources)), catchError((err) => {
      this.errorMessage = err.message;
      return [];
    })

    this.initArticles$ = this.newServices.initArticles$.pipe(map((data: any) => data.articles), catchError((err) => {
      this.errorMessage = err.message;
      return [];
    }))


  }

  ngAfterViewInit(): void {

    this.menu.opened = true;
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.menu.mode = 'over';
        this.menu.close();
      } else {
        this.menu.mode = 'side';
        this.menu.open();
      }
      this.changeDetection.detectChanges();
    })

  }


  searchSource(source: any) {

    this.initArticles$ = this.newServices.getArticlesByID$(source.id).pipe(map((data: any) => data.articles), catchError((err) => {
      this.errorMessage = err.message;
      return [];
    }))
    this.selectedNewsChannel = source.name

  }
}
    
