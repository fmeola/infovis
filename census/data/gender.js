d3.json("gender.json", function (data) {
    var chart = c3.generate({
        bindto: '#genderChart',
        data: {
            columns: [
                ['Femenino', data.female],
                ['Masculino', data.male]
            ],
            type : 'pie'
        },
        tooltip: {
            format: {
                value: function (value, ratio, id) {
                    /**
                     * https://groups.google.com/forum/#!topic/d3-js/DGjmZSVdaSc
                     */
                    var commaFormat = d3.format(",");
                    var dotFormat = function(num){
                        // The expression /,/g is a regular expression that matches all commas.
                        return commaFormat(num).replace(/,/g, ".");
                    };
                    return dotFormat(value);
                }
            }
        }
    });
});

