function Ocorrencia_grafico_view()
{
    var $LOCAL = false,
        $LISTA = false,
        $_ANO  = false,
        $_MES  = false,
        $_CAT  = false,
        $Get = {
            lista : function()
            {
                var $action = action_url('http://localhost/tcc/application/controller/Ocorrencia_controller.php',"action=get_lista_mapa&ano="+$_ANO+"&mes"+$_MES+"&cat"+$_CAT);

                if( $action['result'] )
                {
                    $LISTA = $action['cache'];
                }
            }
        },
        $fn = {
            monta : function()
            {
                var $box = $View.filtros();
                    $box+= "<div class=\"box_linha\" id=\"mapa_ocorrencia\" style=\"margin-bottom:10px;\"></div>";
                    $box+= "<div class=\"box_linha\" id=\"grafico_ocorrencia\"></div>";
                
                $($LOCAL).html($box);
                
                $Get.lista();
                $View.grafico();
                $View.mapa();
                
                console.log($LISTA);
            }
        },
        $View = {
            filtros : function()
            {
                return "filtros aki";
            },
            grafico : function()
            {
//                Highcharts.chart('#grafico_ocorrencia', {
//                        chart: {
//                            type: 'column',
//                            marginTop : 30,
//                            width     : '100%'
//                        },
//                        credits: {
//                                enabled : false
//                        },
//                        exporting :{
//                                enabled : false
//                        },
//                        title: {
//                            text: ''
//                        },
//                        xAxis: {
//                            labels : {
//                                useHTML : true
//                            },
//                            categories: []
//                        },
//                        yAxis: {
//                            allowDecimals: false,
//                            min: 0,
//                            title: {
//                                text: 'xxx'
//                            }
//                        },
//                        legend: {
//                               enabled : false
//                        },
//                        tooltip: {
//                            useHTML: false
//                        },
//                        plotOptions: {
//                            column: {
//                                stacking : 'normal'
//                            },
//                            series: {
//                                    pointWidth   : 30
//                            }
//                        },
//                        series: [{
//                            id   : 'util',
//                            name : 'Útil',
//                            data : []
//                        }, {
//                            id   : 'morta',
//                            name : 'Morta',
//                            data : []
//                        }]
//                });
            },
            mapa : function()
            {
                var $box = "mapa aki";
                
                
                
                
                $("#mapa_ocorrencia").html($box);
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