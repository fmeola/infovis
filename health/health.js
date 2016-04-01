/**
 * http://bl.ocks.org/aaizemberg/03f518eee62b22d7f4c5
 */
var distanceChart = c3.generate({
    bindto: '#distanceChart',
    data: {
        url: 'data/distanceWalkingRunning.csv',
        x: 'date',
        y: 'value',
        xFormat: '%Y-%m-%d %H:%M:%S %Z',
        names: {
            value: 'Kms de caminata y trote'
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
                format: '%d/%m/%Y %H:%M'
            },
            label: {
                text: 'Fecha'
            }
        },
        y: {
            label: {
                text: 'Kms de caminata y trote'
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
    }
});

var flightsClimbedChart = c3.generate({
    bindto: '#flightsClimbedChart',
    data: {
        url: 'data/flightsClimbed.csv',
        x: 'date',
        y: 'value',
        xFormat: '%Y-%m-%d %H:%M:%S %Z',
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
                format: '%d/%m/%Y %H:%M'
            },
            label: {
                text: 'Fecha'
            }
        },
        y: {
            tick: {
                culling: true,
                values: [0,1,2,3,4,5]
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
        xFormat: '%Y-%m-%d %H:%M:%S %Z',
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
                format: '%d/%m/%Y %H:%M'
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