/**
 * http://bl.ocks.org/aaizemberg/03f518eee62b22d7f4c5
 */
var distanceChart = c3.generate({
    bindto: '#distanceChart',
    data: {
        url: 'data/distanceWalkingRunning.csv',
        x: 'date',
        y: 'value',
        xFormat: '%Y-%m-%d',
        names: {
            value: 'Caminata y trote'
        },
        type: 'bar'
    },
    color: {
        pattern: ['#377eb8']
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                culling: true,
                format: '%d/%m'
            },
            label: {
                text: 'Fecha'
            }
        },
        y: {
            label: {
                text: 'Kms'
            }
        }
    },
    grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    },
    zoom: {
        enabled: true
    },
    subchart: {
        show: true
    },
    tooltip: {
        format: {
            value: function (value, ratio, id) {
                return d3.format('.2f')(value) + ' Kms';
            }
        }
    }
});

var distanceChartByDay = c3.generate({
    bindto: '#distanceChartByDay',
    data: {
        x: 'x',
        columns: [
            ['x', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            ['value', 187.19, 162.37, 177.62, 217.12, 251.79, 203.64, 191.20]
        ],
        type: 'bar'
    },
    axis: {
        rotated: true,
        x: {
            type: 'category'
        }
    },
    tooltip: {
        grouped: false
    },
    legend: {
        show: false
    }
});

var flightsClimbedChartByDay = c3.generate({
    bindto: '#flightsClimbedChartByDay',
    data: {
        x: 'x',
        columns: [
            ['x', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            ['value', 204, 179, 184, 192, 233, 241, 147]
        ],
        type: 'bar'
    },
    axis: {
        rotated: true,
        x: {
            type: 'category'
        }
    },
    tooltip: {
        grouped: false
    },
    legend: {
        show: false
    }
});

var flightsClimbedChart = c3.generate({
    bindto: '#flightsClimbedChart',
    data: {
        url: 'data/flightsClimbed.csv',
        x: 'date',
        y: 'value',
        xFormat: '%Y-%m-%d',
        names: {
            value: 'Pisos Subidos'
        },
        type: 'bar'
    },
    color: {
        pattern: ['#4daf4a']
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                culling: true,
                format: '%d/%m'
            },
            label: {
                text: 'Fecha'
            }
        },
        y: {
            tick: {
                culling: true
            },
            label: {
                text: 'Pisos Subidos'
            }
        }
    },
    grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    },
    zoom: {
        enabled: true
    },
    subchart: {
        show: false
    },
    size: {
        height: 240,
        width: 480
    }
});

var stepCountChart = c3.generate({
    bindto: '#stepCountChart',
    data: {
        url: 'data/stepCount.csv',
        x: 'date',
        y: 'value',
        xFormat: '%Y-%m-%d',
        names: {
            value: 'Pasos'
        },
        type: 'bar'
    },
    color: {
        pattern: ['#e41a1c']
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                culling: true,
                format: '%d/%m'
            },
            label: {
                text: 'Fecha'
            }
        },
        y: {
            label: {
                text: 'Pasos'
            }
        }
    },
    grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    },
    zoom: {
        enabled: true
    },
    subchart: {
        show: false
    },
    size: {
        height: 240,
        width: 480
    }
});