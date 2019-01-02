export class LineConfig {
  MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  config: any;
  data: any;
  options: any;
  _seed: any;

  constructor(type = 'line', title) {
    this._seed = Date.now();
    this.initConfig(title, type);
    console.log('this is a data format', this.randomScalingFactor(), type);
  }

  addDataSet(data: number[], label) {
    data = data.length !== 0 ? data : this.generateRandomData();
    const dataSet = {
      label: label,
      backgroundColor: this.getRandomColor(),
      borderColor: this.getRandomColor(),
      data: data,
      fill: false,
    };
    this.getConfig().data.datasets.push(dataSet);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
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
