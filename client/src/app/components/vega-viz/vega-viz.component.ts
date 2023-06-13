import { Component, Input, OnInit } from '@angular/core';
import embed from 'vega-embed';

@Component({
  selector: 'app-vega-viz',
  templateUrl: './vega-viz.component.html',
  styleUrls: ['./vega-viz.component.css']
})
export class VegaVizComponent implements OnInit {
  @Input() features: object[];

  ngOnInit() {
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A scatterplot showing each track's tempo and energy level.",
      "title": {
        "text": "Tracks Energy and Tempo",
        "color": "white",
        "fontSize": 22
      },
      "width": 400,
      "height": 325,
      "data": { "values": this.features },
      "mark": {
        "type": "circle",
        "color": "#1db954",
        "size": 100
      },
      "encoding": {
        "x": {"field": "Tempo (BPM)", "type": "quantitative", "axis": {"grid": false}},
        "y": {"field": "Energy", "type": "quantitative", "axis": {"grid": false}},
        "tooltip": {"field": "Name", "type": "nominal"}
      },
      "config": {
        "background": "#212121",
        "axis": {
          "titleColor": "white",
          "titleFontSize": 18,
          "titlePadding": 8,
          "labelColor": "white",
        }
      }
    } as const;

    embed("#vis",spec);
  }
}
