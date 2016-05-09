/**
 * http://bl.ocks.org/aaizemberg/03f518eee62b22d7f4c5
 */

/**
 * Chart
 */
var chartStyle = {
    defaultColor: '#F1AF4A',
    starredColor: '#4DAF4A',
    xLabelPosition: 'outer-center',
    yLabelPosition: 'outer-middle',
    xAxisType: 'timeseries',
    xLabelName: 'Fecha',
    dataType: 'bar'
};

/**
 * Input
 */
var inputMeta = {
    xColumn: 'startDate',
    yColumn: 'value',
    dateFormat: '%Y-%m-%d'
};

/**
 * Localization
 */
var locale = {
    date: "%d/%m/%Y",
    days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
};
var dateFormat = d3.time.format(locale.date);

function decimalFormat(n) {
    return d3.format(",.2f")(n).replace('.', ' ').replace(/,/g, '.').replace(' ', ',');
}

function intFormat(n) {
    return d3.format(",.0f")(n).replace('.', ' ').replace(/,/g, '.');
}

/**
 * Kms recorridos
 */
var distanceunit = 'Kms';

c3.generate({
    bindto: '#distanceChart',
    data: {
        url: 'data/Distance15-16.csv',
        x: inputMeta.xColumn,
        y: inputMeta.yColumn,
        xFormat: inputMeta.dateFormat,
        names: {
            value: 'Caminata y trote'
        },
        type: chartStyle.dataType,
        //TODO Encontar la manera de ubicar el array de data.
        color: function(inColor, data) {
            return highlightVal(data, 12.007120840000004);
        }
    },
    axis: {
        x: {
            type: chartStyle.xAxisType,
            tick: {
                format: locale.date
            },
            label: {
                text: chartStyle.xLabelName,
                position: chartStyle.xLabelPosition
            }
        },
        y: {
            label: {
                text: distanceunit,
                position: chartStyle.yLabelPosition
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
                return dateFormat(d);
            },
            value: function (value) {
                return decimalFormat(value) + ' ' + distanceunit;
            }
        }
    }
});

/**
 * Kms por día de la semana.
 */
var avgByDay = [3.44, 3.37, 3.59, 3.78, 3.88, 3.47, 3.40];

c3.generate({
    bindto: '#distanceChartByDay',
    data: {
        x: 'x',
        columns: [
            ['x'].concat(locale.days),
            ['value'].concat(avgByDay)
        ],
        type: chartStyle.dataType,
        labels: {
            format: {
                value: function(value) {
                    return decimalFormat(value)
                }
            }
        },
        color: function(inColor, data) {
            if(data.index === indexOfMax(avgByDay)) {
                return chartStyle.starredColor;
            }
            return chartStyle.defaultColor;
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

c3.generate({
    bindto: '#distanceChartByMoment',
    data: {
        x: 'x',
        columns: [
            ['x'].concat(partsOfDay),
            ['value'].concat(avgByPartOfDay)
        ],
        type: chartStyle.dataType,
        labels: {
            format: {
                value: function(value) {
                    return decimalFormat(value)
                }
            }
        },
        color: function(inColor, data) {
            if(data.index === indexOfMax(avgByPartOfDay)) {
                return chartStyle.starredColor;
            }
            return chartStyle.defaultColor;
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
var stepUnit = 'Pasos';

c3.generate({
    bindto: '#stepCountChart',
    data: {
        url: 'data/stepCount15-16.csv',
        x: inputMeta.xColumn,
        y: inputMeta.yColumn,
        xFormat: inputMeta.dateFormat,
        names: {
            value: stepUnit
        },
        type: chartStyle.dataType,
        color: function(inColor, data) {
            return highlightVal(data, 16873);
        }    },
    axis: {
        x: {
            type: chartStyle.xAxisType,
            tick: {
                format: locale.date
            },
            label: {
                text: chartStyle.xLabelName,
                position: chartStyle.xLabelPosition
            }
        },
        y: {
            label: {
                text: stepUnit,
                position: chartStyle.yLabelPosition
            },
            tick: {
                format: function (data) {
                    return intFormat(data);
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
            title: function (d) {
                return dateFormat(d);
            },
            value: function (value) {
                return intFormat(value);
            }
        }
    }
});

/**
 * Pisos Subidos
 */
var flightsUnit = 'Pisos subidos';

c3.generate({
    bindto: '#flightsClimbedChart',
    data: {
        url: 'data/flightsClimbed15-16.csv',
        x: inputMeta.xColumn,
        y: inputMeta.yColumn,
        xFormat: inputMeta.dateFormat,
        names: {
            value: flightsUnit
        },
        type: chartStyle.dataType,
        color: function(inColor, data) {
            return highlightVal(data, 28);
        }
    },
    axis: {
        x: {
            type: chartStyle.xAxisType,
            tick: {
                format: locale.date
            },
            label: {
                text: chartStyle.xLabelName,
                position: chartStyle.xLabelPosition
            }
        },
        y: {
            label: {
                text: flightsUnit,
                position: chartStyle.yLabelPosition
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
            title: function (d) {
                return dateFormat(d);
            },
            value: function (value) {
                return intFormat(value);
            }
        }
    }
});

function highlightVal(data, val) {
    if(data.value === val) {
        return chartStyle.starredColor;
    }
    return chartStyle.defaultColor;
}

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