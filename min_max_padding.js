;(function (Highcharts) {
    var isFixedMinMax = {};

    var AutoMinMax = function(chart) {
        this.padding = 0.5;
        this.chart = chart;
        chart.axes.map(function (axis) {
            isFixedMinMax[axis.options.index] = 
                (!isNaN(axis.options.min) && typeof(axis.options.min) !== 'object') ||
                (!isNaN(axis.options.max) && typeof(axis.options.max) !== 'object');
        });
        chart.redraw();
    };
    
    AutoMinMax.prototype.renderAxes = function() {
        var chart = this.chart;
        var padding = this.padding;
        chart.axes.map(function (axis) {
            if (axis.options.isDatetimeAxis || isFixedMinMax[axis.index]) {
                return;
            }
            
            var min = axis.dataMin - Math.abs(axis.dataMin * padding);
            var max = axis.dataMax + Math.abs(axis.dataMax * padding);
            
            axis.update({
              min: min,
              max: max
            }, false);
        });
    };

    var RedrawExtensions = function() {
        this.extensions = [];
        this.redrawTimeout;
    };
    
    RedrawExtensions.prototype.onRedraw = function(proceed, args) {
        this.extensions.map(function(extension) {
            proceed.apply(extension.chart, Array.prototype.slice.call(args, 1));
            extension.run();
            proceed.apply(extension.chart, Array.prototype.slice.call(args, 1));
        });
    };
    
    Highcharts.Chart.prototype.callbacks.push(function (chart) {
        chart.redrawExtensions = chart.redrawExtensions || new RedrawExtensions();
        var extension = new AutoMinMax(chart);
        extension.run = extension.renderAxes;
        chart.redrawExtensions.extensions.push(extension);
        chart.axes[0].update({}, false);
    });
    
    Highcharts.wrap(Highcharts.Chart.prototype, 'redraw', function (proceed) {
        if (this.redrawExtensions) {
            var chart = this;
            clearTimeout(chart.redrawExtensions.redrawTimeout);
            chart.redrawExtensions.redrawTimeout = setTimeout(function () {
                chart.redrawExtensions.onRedraw(proceed, arguments);
            }, 50);
        } else {
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });
    
}(Highcharts));
