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
      "title": "Example Vega-lite Chart",
      "data": {
        "values": [
          {"Name": "Track 1", "Tempo": 0.23, "Energy": 0.28}, {"Name": "Track 4", "Tempo": 0.11, "Energy": 0.55}, {"Name": "Track 7", "Tempo": 0.31, "Energy": 0.43},
          {"Name": "Track 2", "Tempo": 0.45, "Energy": 0.91}, {"Name": "Track 5", "Tempo": 0.88, "Energy": 0.81}, {"Name": "Track 8", "Tempo": 0.85, "Energy": 0.53},
          {"Name": "Track 3", "Tempo": 0.12, "Energy": 0.19}, {"Name": "Track 6", "Tempo": 0.77, "Energy": 0.87}, {"Name": "Track 9", "Tempo": 0.44, "Energy": 0.52}
        ]
      },
      "mark": "circle",
      "encoding": {
        "x": {"field": "Tempo", "type": "quantitative"},
        "y": {"field": "Energy", "type": "quantitative"},
        "tooltip": {"field": "Name", "type": "nominal"}
      }
    } as const;

    embed("#vis",spec);
  }
}
