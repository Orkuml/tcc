/**
 * Description of ocorrencias_view
 *
 * @author Ranniere Farias
 */
var $OCORRENCIA_VIEW;

function Ocorrencias_view()
{
    var $LOCAL = false,
        $_STATUS = {
            A: {
                nome_tipo  : "Ativada",
                background : "#008C23",
                color      : "#FFF"
            },
            D: {
                nome_tipo  : "Desativada",
                background : "#B20000",
                color      : "#FFF"
            }
        },
        $fn = {
            monta : function()
            {
                var $box = $View.div();

                $('#'+$LOCAL).html($box);

                $View.grafico();
            },
            options_categoria : function()
            {
                var $tmp = {},
                    $action = action_url('http://localhost/tcc/application/controller/Categoria_controller.php',"action=get_options");

                if( $action['result'] )
                {
                    $tmp = $action['cache'];
                }

                return $tmp;
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
                var $box = "<div id=\"box_menu_horizontal\" style=\"width:calc(100% - 10px); float: left;\">";
                        $box+= "<div class=\"menu_horizontal\">";
                            $box+= "<div class=\"menu_horizontal_bt_select\" id=\"menu_h_grafico\" onclick=\"select_conteudo('grafico');\">";
                                $box+= "<div class=\"box\">"+$ICONE.grafico('#666',17,'float:left;margin:2px 5px 0 0;')+'Gráficos'+"</div>";
                            $box+= "</div>";
                            $box+=" <div class=\"menu_horizontal_bt\" id=\"menu_h_adicionar\" onclick=\"$adicionar_ocorrencia();\">";
                                $box+= "<div class=\"box\">"+$ICONE.adicionar('#666',17,'float:left;margin:2px 5px 0 0;')+'Adicionar'+"</div>";
                            $box+= "</div>";
                            if( is_object($USUARIO) && is_object($USUARIO['usuario']) && ($USUARIO['usuario']['tipo'] === '1') )
                            {
                                $box+=" <div class=\"menu_horizontal_bt\" id=\"menu_h_lista\" onclick=\"select_conteudo('lista');\">";
                                    $box+= "<div class=\"box\">"+$ICONE.cancelar('#666',17,'float:left;margin:2px 5px 0 0;')+'Lista'+"</div>";
                                $box+= "</div>";
                            }
                        $box+= "</div>";
                    $box+= "</div>";

                $box+= "<div class=\"box_linha scroll_transparent\" id=\"box_conteudo\" style=\"height:100%; overflow-y:auto;\"></div>";

                return $box;
            },
            grafico : function()
            {
                include('view/js/view/Ocorrencia_grafico_view.js');

                var $GRAFICO = new Ocorrencia_grafico_view();
                    $GRAFICO.set_local('#box_conteudo');
                    $GRAFICO.show();
            },
            lista : function()
            {
                var $LIST   = new List("listaEventos",'#box_conteudo');

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Ocorrencia_controller.php');
                $LIST.set_param('action=get_lista');
                $LIST.define_id('id_ocorrencia');
                $LIST.define_ajax_on(false);
                $LIST.menu_suspenso(true);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:10px 0 10px 10px;");

                $LIST.set_head("#"         , "width:6%;");
                $LIST.set_head("CATEGORIA" , "width:20%;");
                $LIST.set_head("DATA"      , "width:10%;");
                $LIST.set_head("DESCRIÇÃO" , "width:50%;");
                $LIST.set_head("STATUS"    , "width:10%;");

                $LIST.set_coluna( { id: "id_ocorrencia" }, "width:6%;text-align:center;");
                $LIST.set_coluna( { id: 'id_categoria',
                                        config: { formata : 'case', 
                                                  case    : $fn.options_categoria()}
                },"width:20%;text-align:center;" );
                $LIST.set_coluna({ id: "data_ocorrencia",
                                        config: {
                                                formata : 'date_br'
                }}, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: "descricao" }, "width:50%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna( { id: 'status',
                                        config: { formata : 'case', 
                                                  case    : $View.box_status()}
                },"width:10%;" );

                $LIST.set_botao("excluir", {
                                            color : "vermelho",
                                            texto : "Excluir",
                                            icone : $ICONE.adicionar("#FFF",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$excluir_ocorrencia();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });

                $LIST.show();
            }
        };

    $adicionar_ocorrencia = function()
    {
        WA_box({
            id             : "boxAddOcorrencia"  ,
            skin           : "DROBox"            ,
            width          : "430px"             ,
            height         : "calc(100% - 160px)",
            fixed          : true                ,
            transparent    : false               ,
            titulo         : "Cadastrar ocorrência"
        });

        include('view/js/form/Cadastrar_ocorrencia_form.js');

        var $FORM = new Cadastrar_ocorrencia_form();
            $FORM.set_local('#CONTEUDO_boxAddOcorrencia');
            $FORM.show();
    };

    $excluir_ocorrencia = function()
    {
        alert('excluir');
    };

    select_conteudo = function($id)
    {
        $('.menu_horizontal_bt_select').removeClass('menu_horizontal_bt_select').addClass('menu_horizontal_bt');
        $('#menu_h_'+$id).addClass('menu_horizontal_bt_select');
        
        switch($id)
        {
            case 'lista':
                $View.lista();
                break;
            case 'grafico':
                $View.grafico();
                break;
            default:
                $INDEX_VIEW.show();
                break;
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
};