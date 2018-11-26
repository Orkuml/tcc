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
                    $box+= "<div class=\"box_linha\" id=\"mapa_ocorrencia\" style=\"margin-bottom:10px;height:calc(50% - 10px);\"></div>";
                    $box+= "<div class=\"box_linha\" id=\"grafico_ocorrencia\"></div>";
                
                $($LOCAL).html($box);
                
                $Get.lista();
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
                var $manaus = {
                    lat: -3.05189,
                    lng: -59.9776707
                    },
                    $mapOptions = {
                        zoom: 12,
                        center: $manaus,
                        disableDefaultUI: true
                    },
                    $mapa = new google.maps.Map(document.getElementById('mapa_ocorrencia'), $mapOptions);
            

                    $.each($LISTA, function($id, $obj)
                    {
                        var infowindow = new google.maps.InfoWindow({
                                content  : "<center><div style=\"float:left;font-weight:bold;\">"+$obj['nome'].toUpperCase()+"</div></center>"
                                                        +"<div style=\"float:left;width:100%;\"><div style=\"float:left;margin:10px 5px 0 0;\">Data:</div>"
                                    +"<div style=\"float:left;margin:10px 5px 0 0;\">"+data_br($obj['data_ocorrencia'])+"</div></div>"
                                });

                        var $marker = new google.maps.Marker({
                            title    : $obj['nome'].toUpperCase(),
                            position : {lat:parseFloat($obj['latitude']),lng:parseFloat($obj['longitude'])},
                            map      : $mapa
                        });

                        $marker.addListener('click', function() {
                            infowindow.open($mapa, $marker);
                        });

                        $mapa.addListener('click',function() {
                            infowindow.close();
                        });
                });
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