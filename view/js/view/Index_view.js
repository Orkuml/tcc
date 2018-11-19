/**
 * Description of index_view
 *
 * @author Ranniere Farias
 */
var $INDEX_VIEW;

function Index_view()
{
    var $LOCAL    = false,
        $EVENTOS  = false,
        $SELECIONADO = false,
        $_BANNERS = [],
        $Get = {
            usuario : function($id_usuario)
            {
                var $action = action_url('http://localhost/tcc/application/controller/Usuario_controller.php',"action=get_usuario&id_usuario="+$id_usuario);

                return $action['result'];
            },
            eventos : function()
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=lista_eventos");

                if($action['result'])
                {
                    $EVENTOS = $action['cache'];
                }
            },
            total : function($id_evento)
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=get_total&id_evento="+$id_evento);

                return $action['result'];
            },
            vinculo : function($id_usuario, $id_evento)
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=get_vinculo&id_usuario="+$id_usuario+"&id_evento="+$id_evento);

                return $action['result'];
            }
        },
        $fn = {
            banner : function()
            {
                var $k = 0;

                setInterval(function()
                {
                    if( $k < 5 )
                    {
                        if( is_valid($_BANNERS[$k]) )
                        {
                            $('#box_banner > img').css('display','none');
                            $('#banner_'+$_BANNERS[$k]).css('display', 'table');
                        }
                        $k++;
                    }
                    else
                    {
                        $k = 0;

                        if( is_valid($_BANNERS[$k]) )
                        {
                            $('#box_banner > img').css('display','none');
                            $('#banner_'+$_BANNERS[$k]).css('display', 'table');
                        }
                    }
                },3000);
            },
            monta : function()
            {
                $Get.eventos();
                $View.conteudo();
                $fn.banner();
                initMap();
            }
    },
    $View = {
        banner : function()
        {
            var $box = '',
                $n = 0;

            $box+= "<div class=\"banner ini\" id=\"box_banner\">";
            if( is_object($EVENTOS) )
            {
                $.each($EVENTOS, function($k, $v)
                {
                    if( $n < 5)
                    {
                        var $id_evento = $v['id_evento'],
                            $display   = ($n === 0) ? "display:table" : "display:none;";

                        $_BANNERS[$n] = $id_evento;

                        $box+= "<img src=\"view/images/banner/"+$v['banner']+"\" id=\"banner_"+$id_evento+"\" style=\""+$display+"\" onclick=\"view_evento('"+json_encode($v)+"');\">";
                    }
                    $n++;
                });
            }
            else
            {
                $box+= "<div class=\"box_linha\" >Não existe banner cadastrado!</div>";
            }
            $box+= "</div>";

            return $box;
        },
        bottom : function()
        {
            var $box = $View.denuncie();
                $box+= "<div class=\"block\">";
                    $box+= "<div class=\"title\">Deseja ajudar?</div>";
                    $box+= "<div class=\"texto\">Junte-se a nós, se torne um colaborador, participe dos eventos e ajude outras pessoas.</div>";
                    $box+= "<div class=\"texto\" onclick=\"SetPage('cadastrar_usuario');\" style=\"cursor:pointer;\"><i>Clique aqui e cadastre-se.</i></div>";
                $box+= "</div>";
                $box+= "<div class=\"block\">";
                    $box+= "<div class=\"title\">Cadastre o abuso.</div>";
                    $box+= "<div class=\"texto\">Não tenha medo, você não está sozinha. Cadastre o fato ocorrido e poderemos ajudar mais vítimas.</div>";
                    $box+= "<div class=\"texto\" onclick=\"SetPage('ocorrencias');\" style=\"cursor:pointer;\"><i>Clique aqui e cadastre.</i></div>";
                $box+= "</div>";
                $box+= "<div class=\"block\">";
                    $box+= "<div class=\"title\">Compartilhe</div>";
                    $box+= "<div class=\"texto\">Selecione um evento e compartilhe, assim pode-se aumentar a rede positiva, conscientizando mais pessoas.</div>";
                    $box+= "<div>&nbsp;</div>";
                $box+= "</div>";

            return $box;
        },
        box_evento : function($obj)
        {
            var $array   = json_decode($obj),
                $idUser  = $array['id_usuario'],
                $idEvento= $array['id_evento'],
                $usuario = $Get.usuario($idUser),
                $total   = $Get.total($idEvento),
                $vinculo = $Get.vinculo($idUser, $idEvento),
                $nome    = (is_object($usuario)) ? $usuario[$idUser]['nome']   : false,
                $email   = (is_object($usuario) && is_valid($usuario[$idUser]['email'])) ? $ICONE.email('#555',19,'float:left;margin:2px 5px 0 0;')+$usuario[$idUser]['email']  : "",
                $tel     = (is_object($usuario) && is_valid($usuario[$idUser]['numero'])) ? " / "+$ICONE.telefone('#555',19,'float:left;margin:2px 5px 0 0;')+$usuario[$idUser]['numero'] : "",
                $local   = $array['logradouro']+", "+$array['numero'],
                $cidade  = $array['cidade']+" - "+$array['estado'],
                $search  = 'https://google.com.br/maps/search/'+$local;

            var $box = "<div class=\"box_eventos\">";
                    $box+= "<div class=\"box_banner\">";
                        $box+= "<img src=\"view/images/banner/"+$array['banner']+"\">";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"padding-bottom:10px;\">";
                        $box+= "<div class=\"box\" style=\"margin-right:10px;font-style:italic;\">Compartilhe: </div>";
                        $box+= "<div class=\"box\" onclick=\"$.share('https://facebook.com/share.php?u=google.com.br');\">"+$ICONE.facebook('#475993',19,'float:left;margin-right:12px;cursor:pointer;')+"</div>";
                        $box+= "<div class=\"box\" onclick=\"$.share('https://web.whatsapp.com/');\">"+$ICONE.whatsapp('#4CAF50',19,'float:left;margin-right:12px;cursor:pointer;')+"</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"informacoes\">";
                        $box+= "<div class=\"tipo\">PALESTRA</div>";
                        $box+= "<div class=\"descricao\">"+$array['descricao']+" </div>";
                        if($nome)
                        {
                            $box+= "<div class=\"label\">Responsável:</div>";
                            $box+= "<div class=\"val\">"+$nome+"</div>";
                            $box+= "<div class=\"label\">Contato:</div>";
                            $box+= "<div class=\"val\">"+$email+$tel+"</div>";
                        }
                        $box+= "<div class=\"label\">Data:</div>";
                        $box+= "<div class=\"val\">"+data_br($array['data_evento'])+"</div>";
                        $box+= "<div class=\"label\">Hora:</div>";
                        $box+= "<div class=\"val\">"+$array['hora']+"</div>";
                        $box+= "<div class=\"label\">Local:</div>";
                        $box+= "<div class=\"val\">"+$local+"<div class=\"box\" title=\"LOCALIZAR\" onclick=\"$.share('"+$search+"');\">"+$ICONE.lupa('#555',19,'float:right;cursor:pointer;margin:2px 10px 0 0;')+"</div>"+"</div>";
                        $box+= "<div class=\"label\">Cidade:</div>";
                        $box+= "<div class=\"val\">"+$cidade+"</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"participar\">";
                        $box+= "<div class=\"title\">Deseja participar?</div>";
                        console.log($vinculo);
                        if( is_valid($vinculo) )
                        {
                            $box+= $View.bt_evento($vinculo, $idUser, $idEvento);
                        }
                        else
                        {
                            $box+= $View.bt_evento('S', $idUser, $idEvento, true);
                            $box+= $View.bt_evento('N', $idUser, $idEvento, true);
                            $box+= $View.bt_evento('T', $idUser, $idEvento, true);
                        }
                        $box+= "<div class=\"box_linha\" style=\"position:absolute;bottom:10px;left:81%;\">";
                            $box+= "<div class=\"box\">"+$ICONE.acept2('#70db70',17,'float:left;margin:0 10px;')+$total['S']+"</div>";
                            $box+= "<div class=\"box\">"+$ICONE.cancelar2('#ff6666',17,'float:left;margin:0 10px;')+$total['N']+"</div>";
                            $box+= "<div class=\"box\">"+$ICONE.borracha('#ffc266',17,'float:left;margin:0 10px;')+$total['T']+"</div>";
                        $box+= "</div>";
                    $box+= "</div>";
                $box+= "</div>";

            return $box;
        },
        bt_evento : function($tipo, $id_usuario, $id_evento, $click)
        {
            var $box     = '',
                $onclick = '';
            
            switch($tipo)
            {
                case 'S':
                    $onclick = is_valid($click) ? "$.opcao_evento('S','"+$id_usuario+"','"+$id_evento+"');" : "";
                    $box+= "<div class=\"options\" onclick=\""+$onclick+"\">"+$ICONE.acept('#70db70',17,'float:left;margin:0 5px;')+"SIM</div>";
                    break;
                case 'N':
                    $onclick = is_valid($click) ? "$.opcao_evento('N','"+$id_usuario+"','"+$id_evento+"');" : "";
                    $box+= "<div class=\"options\" onclick=\""+$onclick+"\">"+$ICONE.cancelar('#ff6666',17,'float:left;margin:0 5px;')+"NÃO</div>";
                    break;
                case 'T':
                    $onclick = is_valid($click) ? "$.opcao_evento('T','"+$id_usuario+"','"+$id_evento+"');" : "";
                    $box+= "<div class=\"options\" onclick=\""+$onclick+"\");\">"+$ICONE.borracha('#ffc266',17,'float:left;margin:0 5px;')+"TALVEZ</div>";
                    break;
            }
            
            return $box;
        },
        conteudo : function()
        {
            var $box = $View.div();
                $box+= "<div class=\"index\">";
                    $box+= "<div class=\"col1\">";
                        $box+= $View.banner();
                        $box+= $View.mapa();
                        $box+= $View.bottom();
                    $box+= "</div>";
                    $box+= "<div class=\"col2\">";
                        $box+= $View.noticias();
                    $box+= "</div>";
                $box+= "</div>";

            $('#'+$LOCAL).html($box);
        },
        div : function()
        {
            var $box = "<div id=\"box_menu_horizontal\" style=\"width:calc(100% - 10px); height: 30px; float: left;\">";
                    $box+= "<div class=\"menu_horizontal\">";
                        $box+=" <div class=\"menu_horizontal_bt_select\" id=\"menu_h_banner\" onclick=\"$.select_conteudo('banner');\">";
                            $box+= "<div class=\"box\">"+$ICONE.bottom('#666',17,'float:left;margin:2px 5px 0 0;')+'Banner'+"</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"menu_horizontal_bt\" id=\"menu_h_mapa\" onclick=\"$.select_conteudo('mapa');\">";
                            $box+= "<div class=\"box\" >"+$ICONE.map_pin('#666',17,'float:left;margin:2px 5px 0 0;')+'Mapa'+"</div>";
                        $box+= "</div>";
                    $box+= "</div>";
                $box+= "</div>";

            return $box;
        },
        denuncie : function()
        {
            var $box = "<div class=\"denuncie\">";
                    $box+= $ICONE.alert2('#fc3535',29,'float:left;margin:2px 10px 0 5%;');
                    $box+= "<h3 style=\"margin:5px 0;color:#fc3535;\">SE SUSPEITAR DE UM ABUSO, NÃO SE OMITA, LIGUE 180 E DENUNCIE</h3>";
                $box+= "</div>";
                
            return $box;
        },
        mapa : function()
        {
            var $box = "<div class=\"delegacia ini\" id=\"box_mapa\" style=\"display:none;\">";
                    $box+= "<div class=\"box\" style=\"margin-bottom:10px;\">Ache a delegacia mais próxima de você.</div>";
                    $box+= "<div class=\"box_linha\" id=\"map\"></div>";
                $box+= "</div>";

            return $box;
        },
        noticias : function()
        {
            var $box = "",
                $n   = 0;

            if( is_object($EVENTOS) )
            {
                $.each($EVENTOS, function($k, $v)
                {
                    if( $n > 5)
                    {
                        $box+= "<div class=\"box_linha\">a</div>";

//                        $box+= "<img src=\"view/images/banner/"+$v['banner']+"\" id=\"banner_"+$id_evento+"\" style=\""+$display+"\" onclick=\"view_evento('"+json_encode($v)+"');\">";
                    }
                    $n++;
                });
            }
            else
            {
                $box+= "<div class=\"box_linha\" >Não existe banner cadastrado!</div>";
            }

            return $box;
        }
    };
    
    $.opcao_evento = function($tipo, $id_usuario, $id_evento)
    {
        var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=set_vinculo&id_usuario="+$id_usuario+"&id_evento="+$id_evento+"&tipo="+$tipo);

        if( $action['result'] )
        {
            mensagem_top('ok', 'Usuário vinculado com sucesso!');
            
            $('#CONTEUDO_boxEvento').html($View.box_evento($SELECIONADO));
        }
        else
        {
            mensagem_top('erro','Erro ao vincular usuário ao evento!');
        }
    };

    $.share = function($url)
    {
        window.open($url);
    };

    $.select_conteudo = function($id)
    {
        $('.ini').css('display','none');
        $('#box_'+$id).css('display','block');
        $('.menu_horizontal_bt_select').removeClass('menu_horizontal_bt_select').addClass('menu_horizontal_bt');
        $('#menu_h_'+$id).addClass('menu_horizontal_bt_select');
    };
    
    view_evento = function($obj)
    {
        var $box = $View.box_evento($obj);
        
        WA_box({
                id             : "boxEvento",
                skin           : "DROBox"   ,
                width          : "800px"    ,
                height         : "auto"     ,
                fixed          : true       ,
                transparent    : false      ,
                titulo         : "Evento"   ,
                conteudo       : $box
        });
        
        $SELECIONADO = $obj;
    };
    
    this.set_local = function($local)
    {
        $LOCAL = $local;
    };
    
    this.show = function()
    {
        $fn.monta();
    };
};