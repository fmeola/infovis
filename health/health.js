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