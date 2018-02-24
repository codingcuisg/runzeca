import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private httpClient: HttpClient) {}
  isNew: boolean;
  images = [];
  urllist = [];
  total = 0;
  totalpage = [];
  item = "";
  totalnumber = 0;
  perPage: number;
  user = "";

  changePage(l : any){
    this.urllist = [];
    this.images = [];
    this.totalpage = [];
    var url = `https://api.giphy.com/v1/gifs/search?api_key=SS4Mp2ZLDBE8spR3Cj1WBgXaM2JAu2Zf&q=${this.item}&limit=25&offset=${l*25}&rating=Y&lang=zh-CN`;
    this.httpClient.get(url).subscribe((data => {
      for (let index = 0; index < data["data"].length; index++) {
        this.total = Math.ceil(parseInt(data["pagination"]["total_count"])/25);
        const element = data["data"][index];
        this.images.push(element.images.original.url);
      }
      for (let index = 1; index < this.total; index++) {
        this.totalpage.push(index);     
      }
    }))
    console.log(this.totalpage);
  }


  getImages(item : string){
    this.urllist = [];
    this.images = [];
    this.item = item;
    this.totalpage = [];
    var url = `https://api.giphy.com/v1/gifs/search?api_key=SS4Mp2ZLDBE8spR3Cj1WBgXaM2JAu2Zf&q=${this.item}&limit=25&offset=0&rating=Y&lang=zh-CN`;
    this.httpClient.get(url).subscribe((data => {
      for (let index = 0; index < data["data"].length; index++) {
        this.total = data["pagination"]["total_count"]/25;
        this.totalnumber=data["pagination"]["total_count"];
        const element = data["data"][index];
        this.images.push(element.images.original.url);
      }
      for (let index = 1; index < this.total; index++) {
        this.totalpage.push(index);     
      }
    }))
    console.log(this.totalpage);
  }

  SaveImage(url: string){
    this.httpClient.get(`http://localhost:8080/RuzeAngularCA/save/${url}/${this.user}`).take(1).toPromise();
  }

  saveImg(url : string){
    console.log("url>>>>>>>" + url);
    this.SaveImage(url);
    
  }

  saveUserName(username : string){
    this.user = username;
    console.log("username>>>>>" + this.user);
  }

  checkItem(urls : string[]){
    this.urllist = urls;
    this.images = [];
    this.totalpage = [];
    console.log(this.urllist);
  }
}
