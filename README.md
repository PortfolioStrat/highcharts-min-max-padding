# Highcharts: min-max padding

Highcharts extension that adds padding to the min-max axes scales.

## Description

Handy Highcharts extension that wraps an existing chart with extra internal padding. 

Consider the example below:

**Original Chart**

![highcharts chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-min-max-padding/master/snapshots/original.png "Original Chart")

**Extended Chart with padding enabled**

![highcharts extended chart](https://raw.githubusercontent.com/PortfolioStrat/highcharts-min-max-padding/master/snapshots/extended.png "Extended Chart")

## Usage/Demo

Padding is specified as a percentage of the dataMin and dataMax axis values. Highcharts and jQuery have to be loaded before adding this extension. See working [plunker](http://plnkr.co/edit/06XGcU0Y9ESALbueCJOI?p=preview "Plunker Demo") for a live demo. You may adjust the padding by changing the variable *AutoMinMax.padding*.

## Compatibility

Compatible with Highcharts 4.1.7 and earlier.

## License

MIT
