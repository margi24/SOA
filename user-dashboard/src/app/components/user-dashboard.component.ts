import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityBreaks } from '../models/city-break.model';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  city = "";
  date = "";
  cost = "";
  email = "";
  cityBreaks: CityBreaks[] = []

  constructor(
    private router: Router,
    private service: DashboardService) {
  }

  ngOnInit() {
    this.fetchCityBreaks();
  }

  fetchCityBreaks() {
    this.service.getCityBreaksForUser().subscribe(
      resp => {
        this.cityBreaks = resp;
      },
      error => { console.log(error) });
  }

  onAdd() {
    this.service.addCityBreak(this.city, this.date, Number(this.cost)).subscribe(
      resp => {
        console.log("in fetch")
        this.city = "";
        this.cost = "";
        this.date = "";
        this.fetchCityBreaks();
      },
      error => {
        console.log("error")
      }
    )
  }

  onSend() {
    this.service.sendEmail(this.email).subscribe(
      resp => {
        this.email = ""
      },
      error => {

      }
    )
  }
}