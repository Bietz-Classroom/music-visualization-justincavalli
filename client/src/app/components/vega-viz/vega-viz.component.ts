import { Component, OnInit } from '@angular/core';
import embed from 'vega-embed';

@Component({
  selector: 'app-vega-viz',
  templateUrl: './vega-viz.component.html',
  styleUrls: ['./vega-viz.component.css']
})
export class VegaVizComponent implements OnInit {
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
      "data": {
        "values": [
          {"Name": "Track 1", "Tempo": 2.3, "Energy": 2.8}, {"Name": "Track 4", "Tempo": 1.1, "Energy": 5.5}, {"Name": "Track 7", "Tempo": 3.1, "Energy": 4.3},
          {"Name": "Track 2", "Tempo": 4.5, "Energy": 9.1}, {"Name": "Track 5", "Tempo": 8.8, "Energy": 8.1}, {"Name": "Track 8", "Tempo": 8.5, "Energy": 5.3},
          {"Name": "Track 3", "Tempo": 1.2, "Energy": 1.9}, {"Name": "Track 6", "Tempo": 7.7, "Energy": 8.7}, {"Name": "Track 9", "Tempo": 9.4, "Energy": 5.2}
        ]
      },
      "mark": {
        "type": "circle",
        "color": "#1db954",
        "size": 100
      },
      "encoding": {
        "x": {"field": "Tempo", "type": "quantitative", "axis": {"grid": false}},
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
