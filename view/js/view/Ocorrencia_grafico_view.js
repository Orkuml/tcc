function Ocorrencia_grafico_view()
{
    var $LOCAL = false,
        $fn = {
            monta : function()
            {
                var $box = $View.filtros();
                    $box+= "<div class=\"box_linha\" id=\"mapa_ocorrencia\" style=\"margin-bottom:10px;\"></div>";
                    $box+= "<div class=\"box_linha\" id=\"grafico_ocorrencia\"></div>";
                
                $($LOCAL).html($box);
                
                $View.grafico();
                $View.mapa();
            }
        },
        $View = {
            filtros : function()
            {
                return "filtros aki";
            },
            grafico : function()
            {
                Highcharts.chart('#grafico_ocorrencia', {
                        chart: {
                            type: 'column',
                            marginTop : 30,
                            width     : '100%'
                        },
                        credits: {
                                enabled : false
                        },
                        exporting :{
                                enabled : false
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            labels : {
                                useHTML : true
                            },
                            categories: []
                        },
                        yAxis: {
                            allowDecimals: false,
                            min: 0,
                            title: {
                                text: 'xxx'
                            }
                        },
                        legend: {
                               enabled : false
                        },
                        tooltip: {
                            useHTML: false
                        },
                        plotOptions: {
                            column: {
                                stacking : 'normal'
                            },
                            series: {
                                    pointWidth   : 30
                            }
                        },
                        series: [{
                            id   : 'util',
                            name : 'Útil',
                            data : []
                        }, {
                            id   : 'morta',
                            name : 'Morta',
                            data : []
                        }]
                });
            },
            mapa : function()
            {
                $("#mapa_ocorrencia").html("mapa aki");
            }
        };

    this.set_local = function($local)
    {
        $LOCAL = $local;
    };
    
    this.show = function()
    {
        $fn.monta();
    };
}