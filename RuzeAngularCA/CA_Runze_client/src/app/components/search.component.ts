import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, Injectable } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

@Injectable()
export class SearchComponent implements OnInit {

  @Output()
  keyword: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  urls: EventEmitter<string[]> = new EventEmitter<string[]>();


  @ViewChild('searchForm')
  searchFrom: NgForm;

  @ViewChild('showForm')
  showForm: NgForm;

  constructor(private httpClient: HttpClient) {}

  url = [];

  ngOnInit() {
    
  }

  search(){
    
    let keyword = this.searchFrom.value.search;
    this.keyword.next(keyword);
  }

  GetImage(): Promise<any> {
    return (this.httpClient.get(`http://localhost:8080/RuzeAngularCA/getGif/${this.showForm.value.username }`)
      .take(1)
      .toPromise());
  }


  check(){
    this.url = [];
    this.GetImage()
      .then(result => {
        for (let index = 0; index < result.length; index++) {
          const element = result[index]["url"];
          this.url.push(element);
        }  
        this.urls.next(this.url);
        console.log(">>> result = ", this.url);
        console.log(">>> userName", this.showForm.value.username)
      }    
    )
      .catch(error => {
        console.log(">>> error = ", error);
      })
    
  }
}
