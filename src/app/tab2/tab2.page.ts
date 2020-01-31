import { Component } from '@angular/core';
import { GpsService } from '../services/gps.service';
import { Gps } from '../models/gps';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loading = false;
  //users: User[];
  gpsList: Gps[];

 
  constructor(private gpsService: GpsService) {}

  ngOnInit() {
    this.loading = true;
    /*
    this.userService.getAll().pipe(first()).subscribe(users =>{
      this.loading = false;
      this.users = users;
    })
    */
    this.gpsService.getAll().pipe(first()).subscribe(gps => {
      console.log('gps');
      console.log(gps);
      this.loading = false;
      this.gpsList = gps;
    })
    
  }

}
