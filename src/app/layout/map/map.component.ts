import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  lat = 51.509865;
  long = -0.118092;
  type = 'satellite';

  constructor() {}

  ngOnInit(): void {}
}
