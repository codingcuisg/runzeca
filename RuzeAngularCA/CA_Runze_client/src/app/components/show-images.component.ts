import { Component, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css']
})
export class ShowImagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input()
  img = "";

  @ViewChild('addForm')
  addForm: NgForm;


  @Output()
  imageClicked: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  user: EventEmitter<string> = new EventEmitter<string>();

  passUrl(){
    console.log(">>> image = ", this.img);
    this.imageClicked.next(this.img);
    this.user.next(this.addForm.value.usera);
    console.log("sssss" + this.addForm.value.usera);
  } 
}
