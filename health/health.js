/**
 * http://bl.ocks.org/aaizemberg/03f518eee62b22d7f4c5
 */

var defaultColor = '#F1AF4A';
var starredColor = '#4DAF4A';

/**
 * Kms recorridos
 */
var distanceChart = c3.generate({
    bindto: '#distanceChart',
    data: {
        url: 'data/Distance15-16.csv',
        x: 'startDate',
        y: 'value',
        xFormat: '%Y-%m-%d',
        names: {
            value: 'Caminata y trote'
        },
        type: 'bar',
        //TODO Mejorar la manera de ubicar destaques de puntos
        color: function(inColor, data) {
            if(data.value === 12.007120840000004) {
                return starredColor;
            }
            return defaultColor;
        }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d/%m'
            },
            label: {
                text: 'Fecha',
                position: 'outer-center'
            }
        },
        y: {
            label: {
                text: 'Kms',
                position: 'outer-middle'
            }
        }
    },
    zoom: {
        enabled: true
    },
    legend: {
        show: false
    },
    tooltip: {
        format: {
            /**
             * https://github.com/mbostock/d3/wiki/Time-Formatting
             */
            title: function (d) {
                var format = d3.time.format("%d/%m/%Y");
                return format(d);
            },
            value: function (value, ratio, id) {
                return d3.format('.2f')(value) + ' Kms';
            }
        }
    }
});

/**
 * Kms por día de la semana.
 */
var daysOfTheWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
var avgByDay = [3.44, 3.37, 3.59, 3.78, 3.88, 3.47, 3.40];

var distanceChartByDay = c3.generate({
    bindto: '#distanceChartByDay',
    data: {
        x: 'x',
        columns: [
            ['x'].concat(daysOfTheWeek),
            ['value'].concat(avgByDay)
        ],
        type: 'bar',
        labels: {
            format: {
                value: d3.format()
            }
        },
        color: function(inColor, data) {
            if(data.index === indexOfMax(avgByDay)) {
                return starredColor;
            }
            return defaultColor;
        }
    },
    axis: {
        rotated: true,
        x: {
            type: 'category'
        },
        y: {
            show: false
        }
    },
    tooltip: {
        show: false
    },
    legend: {
        show: false
    }
});

/**
 * Kms por parte del día.
 */
var partsOfDay = ['Mañana', 'Tarde', 'Noche'];
var avgByPartOfDay = [1.11, 1.73, 0.74];

var distanceChartByMoment = c3.generate({
    bindto: '#distanceChartByMoment',
    data: {
        x: 'x',
        columns: [
            ['x'].concat(partsOfDay),
            ['value'].concat(avgByPartOfDay)
        ],
        type: 'bar',
        labels: {
            format: {
                value: d3.format()
            }
        },
        color: function(inColor, data) {
            if(data.index === indexOfMax(avgByPartOfDay)) {
                return starredColor;
            }
            return defaultColor;
        }
    },
    axis: {
        rotated: true,
        x: {
            type: 'category'
        },
        y: {
            show: false
        }
    },
    tooltip: {
        show: false
    },
    legend: {
        show: false
    }
});

/**
 * Pasos
 */
var stepCountChart = c3.generate({
    bindto: '#stepCountChart',
    data: {
        url: 'data/stepCount15-16.csv',
        x: 'startDate',
        y: 'value',
        xFormat: '%Y-%m-%d',
        names: {
            value: 'Pasos'
        },
        type: 'bar',
        color: function(inColor, data) {
            if(data.value === 16873) {
                return starredColor;
            }
            return defaultColor;
        }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d/%m'
            },
            label: {
                text: 'Fecha',
                position: 'outer-center'
            }
        },
        y: {
            label: {
                text: 'Pasos',
                position: 'outer-middle'
            },
            tick: {
                format: function (data) {
                    return d3.format(',')(data);
                }
            }
        }
    },
    zoom: {
        enabled: true
    },
    legend: {
        show: false
    },
    tooltip: {
        format: {
            /**
             * https://github.com/mbostock/d3/wiki/Time-Formatting
             */
            title: function (d) {
                var format = d3.time.format("%d/%m/%Y");
                return format(d);
            },
            value: function (value, ratio, id) {
                return d3.format(',')(value);
            }
        }
    }
});

/**
 * Pisos Subidos
 */
var flightsClimbedChart = c3.generate({
    bindto: '#flightsClimbedChart',
    data: {
        url: 'data/flightsClimbed15-16.csv',
        x: 'startDate',
        y: 'value',
        xFormat: '%Y-%m-%d',
        names: {
            value: 'Pisos Subidos'
        },
        type: 'bar',
        //TODO Mejorar la manera de ubicar destaques de puntos
        color: function(inColor, data) {
            if(data.value === 28) {
                return starredColor;
            }
            return defaultColor;
        }
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%d/%m'
            },
            label: {
                text: 'Fecha',
                position: 'outer-center'
            }
        },
        y: {
            label: {
                text: 'Pisos Subidos',
                position: 'outer-middle'
            }
        }
    },
    zoom: {
        enabled: true
    },
    legend: {
        show: false
    },
    tooltip: {
        format: {
            /**
             * https://github.com/mbostock/d3/wiki/Time-Formatting
             */
            title: function (d) {
                var format = d3.time.format("%d/%m/%Y");
                return format(d);
            },
            value: function (value, ratio, id) {
                return d3.format(',')(value);
            }
        }
    }
});

/**
 * http://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
 */
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
