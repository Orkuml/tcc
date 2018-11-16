/**
 * Description of usuarios_view
 *
 * @author Ranniere Farias
 */
var $EVENTO_VIEW;

function Eventos_view()
{
    var $this  = this,
        $LOCAL = false,
        $_PARAMS = 'G',
        $_STATUS = {
            A: {
                nome_tipo  : "Ativado",
                background : "#008C23",
                color      : "#FFF"
            },
            F: {
                nome_tipo  : "Finalizado",
                background : "#B20000",
                color      : "#FFF"
            },
            G : {
                nome_tipo  : "Aprovação",
                background : "#ffe43f",
                color      : "#555"
            }
        },
        $fn = {
            monta : function()
            {
                var $box = $View.div();

                $('#'+$LOCAL).html($box);

                $View.lista();
            }
        },
        $View = {
            box_status : function($item)
            {
                var $tmp = {};

                $.each($_STATUS, function($id, $obj)
                {
                    $tmp[$id] = "<div style=\"width:calc(100% - 10px);height:22px;margin:8px 0 0 5px;line-height:22px;text-align:center;color:"+$obj['color']+";background-color:"+$obj['background']+";border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;-ms-border-radius:3px;\">"+$obj['nome_tipo']+"</div>";
                });

                if( is_valid($tmp[$item]) )
                {
                    return $tmp[$item];
                }
                return $tmp;
            },
            div : function()
            {
                var $box = '';

                $box = "<div id=\"box_menu_horizontal\" style=\"width:calc(100% - 10px); height: 30px; float: left; margin-bottom:10px;\">";
                    $box+= "<div class=\"menu_horizontal\">";
                    console.log($USUARIO);
                    if( is_object($USUARIO) && is_object($USUARIO['usuario']) && ($USUARIO['usuario']['tipo'] === '1' || $USUARIO['usuario']['tipo'] === '2') )
                    {
                        $box+=" <div class=\"menu_horizontal_bt_select\" id=\"menu_h_aprovacao\" onclick=\"$.select_conteudo('aprovacao','G');\">";
                            $box+= "<div class=\"box\">"+$ICONE.home('#666',17,'float:left;margin:2px 5px 0 0;')+'Aprovação'+"</div>";
                        $box+= "</div>";
                        $box+=" <div class=\"menu_horizontal_bt\" id=\"menu_h_ativados\" onclick=\"$.select_conteudo('ativados','A');\">";
                            $box+= "<div class=\"box\">"+$ICONE.acept('#666',17,'float:left;margin:2px 5px 0 0;')+'Ativados'+"</div>";
                        $box+= "</div>";
                        $box+=" <div class=\"menu_horizontal_bt\" id=\"menu_h_finalizados\" onclick=\"$.select_conteudo('finalizados','F');\">";
                            $box+= "<div class=\"box\">"+$ICONE.cancelar('#666',17,'float:left;margin:2px 5px 0 0;')+'Finalizados'+"</div>";
                        $box+= "</div>";
                    }
                    else
                    {
                        $box+= "<div class=\"menu_horizontal_bt\" id=\"menu_h_adicionar\" onclick=\"$adicionar_evento();\">";
                            $box+= "<div class=\"box\" >"+$ICONE.adicionar('#666',17,'float:left;margin:2px 5px 0 0;')+'Adicionar'+"</div>";
                        $box+= "</div>";
                    }
                    $box+= "</div>";
                $box+= "</div>";

                $box+= "<div class=\"box_linha scroll_transparent\" id=\"box_conteudo\" style=\"height:100%; overflow-y:auto;\"></div>";

                return $box;
            },
            lista : function()
            {
                var $LIST   = new List("listaEventos",'#box_conteudo');

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Evento_controller.php');
                $LIST.set_param('action=get_lista&status='+$_PARAMS);
                $LIST.define_id('id_evento');
                $LIST.define_ajax_on(false);
                $LIST.menu_suspenso(true);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:50px 0 55px 10px;");
                
                $LIST.set_head("#"         , "width:5%;");
                $LIST.set_head("BANNER"    , "width:15%;");
                $LIST.set_head("TIPO"      , "width:15%;");
                $LIST.set_head("DESCRIÇÃO" , "width:40%;");
                $LIST.set_head("DATA"      , "width:10%;");
                $LIST.set_head("STATUS"    , "width:10%;");
                
                $LIST.set_coluna( { id: "id_evento" }, "width:5%;height:120px;line-height:120px;text-align:center;");
                $LIST.set_coluna( {
                                    id : 'banner',
                                    config: {
                                            formata : 'img',
                                            url          : 'http://localhost/tcc/view/images/banner/',
                                            style        : 'float:left;width:150px;height:100px;padding:10px 10px;'}
                },"width:15%;");
                $LIST.set_coluna({ id : "nome" }, "width:15%;height:120px;text-align:center;line-height:120px;");
                $LIST.set_coluna( { id: "descricao" }, "width:40%;height:120px;line-height:120px;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna({ id: "data_evento",
                                        config: {
                                                formata : 'date_br'
                }}, "width:10%;height:120px;line-height:120px;text-align:center;");
                $LIST.set_coluna( { id: 'status',
                                        config: { formata : 'case', 
                                                  case    : $View.box_status()}
                },"width:10%;position:relative;top:40px;" );
                
                $LIST.set_botao("adicionar", {
                                            color : "branco",
                                            texto : "Adicionar",
                                            icone : $ICONE.adicionar("#777",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$adicionar_evento();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);

                if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['eventos']) && in_array('tipo_evento', $USUARIO['permissao']['visualizar']['eventos']) )
                {
                    $LIST.set_botao("tipo_evento", {
                                                color : "branco",
                                                texto : "Tipo de evento",
                                                icone : $ICONE.checklist("#777",17,"float:left;margin:2px 5px 0 0;"),
                                                action : $LIST.action.onclick("$box_tipo_evento();"),
                                                attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                    },true);
                }
                if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['eventos']) && in_array('ativar', $USUARIO['permissao']['visualizar']['eventos']) )
                {
                    $LIST.set_botao("ativar_evento", {
                                                color : "azul2",
                                                texto : "Aprovar",
                                                icone : $ICONE.acept("#FFF",17,"float:left;margin:2px 5px 0 0;"),
                                                action : $LIST.action.onclick("$ativar_evento();"),
                                                attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                    });
                }
                if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['eventos']) && in_array('editar', $USUARIO['permissao']['visualizar']['eventos']) )
                {
                    $LIST.set_botao("editar", {
                                                color : "branco",
                                                texto : "Editar",
                                                icone : $ICONE.editar("#777",17,"float:left;margin:2px 5px 0 0;"),
                                                action : $LIST.action.onclick("$editar_evento();"),
                                                attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                    });
                }
                $LIST.set_botao("excluir", {
                                            color : "excluir",
                                            texto : "Excluir",
                                            icone : $ICONE.lixeira("#FFF",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$excluir_evento();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });

                $LIST.show();
            }
        };
            
    $.select_conteudo = function($id, $status)
    {
        $_PARAMS = $status;
        
        $this.show();

        $('.menu_horizontal_bt_select').removeClass('menu_horizontal_bt_select').addClass('menu_horizontal_bt');
        $('#menu_h_'+$id).addClass('menu_horizontal_bt_select');
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

function $box_tipo_evento()
{
    WA_box({
            id             : "boxTipoEvento",
            skin           : "DROBox"       ,
            width          : "500px"        ,
            height         : "calc(100% - 180px)",
            fixed          : true            ,
            transparent    : false           ,
            titulo         : "Tipo de evento"
    });

    include('view/js/view/Tipo_evento_view.js');

    $WAList_deselect("listaEventos", "WA_check_preto");

    $TIPO_EVENTO = new Tipo_evento_view();
    $TIPO_EVENTO.set_local('#CONTEUDO_boxTipoEvento');
    $TIPO_EVENTO.show();
};

function $adicionar_evento($type)
{
    WA_box({
            id             : "boxAddEvento",
            skin           : "DROBox"      ,
            width          : "400px"       ,
            height         : "calc(100% - 140px)",
            transparent    : false         ,
            titulo         : "Adicionar evento",
            fn_fechar : function()
            {
                WA_box_closed('boxAddEvento');
                $('.WA_fileUpload_status').remove();
            }
    });

    include('view/js/form/Cadastrar_evento_form.js');

    var $FORM = new Cadastrar_evento_form();
        $FORM.set_local('#CONTEUDO_boxAddEvento');
        if( is_valid($type) )
        {
            $FORM.active_box(false);
        }
        $FORM.show();
};

function $ativar_evento()
{
    alert('FUNÇÃO ATIVAR EVENTO!');
};

function $editar_evento()
{
    alert('FUNÇÃO EDITAR EVENTO');
};

function $excluir_evento()
{
    alert('FUNÇÃO EXCLUIR EVENTO');
};