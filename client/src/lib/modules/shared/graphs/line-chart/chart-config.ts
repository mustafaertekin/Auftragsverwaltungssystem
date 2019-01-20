export class LineConfig {
  MONTHS = [];
  COLORS = [];
  colors: string [];
  config: any;
  data: any;
  options: any;
  _seed: any;

  constructor(type = 'line', title) {
    this.COLORS = [ 
      '#ea5569',
      '#58b666',
      '#00d3ec',
      '#ff7835',
      '#5a3076',
      '#e6323c',
      '#af35c0',
      '#ff9f34',
      '#ac457b',
      '#4eaa5a',
      '#2f73b7'
      
    ];
    this.colors = this.COLORS;
    this._seed = Date.now();
    this.initConfig(title, type);
  }

  addDataSet(data: number[], label) {
    data = data.length !== 0 ? data : this.generateRandomData();
    const dataSet = {
      label: label,
      backgroundColor: data.map(() => {
        return this.getSpecificColors();
      }),
      borderColor: data.map(() => {
        return this.getSpecificColors();
      }),
      data: data,
      fill: false,
    };
    this.getConfig().data.datasets.push(dataSet);
  }

  getSpecificColors () {
    const color = this.colors.pop();
    if (this.colors.length === 0) {
      this.colors = this.COLORS;
    }
    return color;
  }

  getConfig() {
    return this.config;
  }

  initConfig(title, type) {
    this.config = {
      type: type, // line, bar, pie
      data: {
        labels: this.MONTHS,
        datasets: []
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: title
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    };
  }

  generateRandomData() {
    return  [
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
      this.randomScalingFactor (),
    ];
  }

  randomScalingFactor () {
    return Math.round(this.rand(0, 100));
  }

  rand (min, max) {
    const seed = this._seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  srand(seed) {
    this._seed = seed;
  }
}


//  (((1546380411014 * 9301) + 49297) % 233280) / 233280;
