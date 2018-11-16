/**
 * Description of ocorrencias_view
 *
 * @author Ranniere Farias
 */
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
            lista : function()
            {
                var $LIST   = new List("listaEventos",'#'+$LOCAL);

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Ocorrencia_controller.php');
                $LIST.set_param('action=get_lista');
                $LIST.define_id('id_evento');
                $LIST.define_ajax_on(false);
                $LIST.menu_suspenso(true);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:50px 0 55px 10px;");

                $LIST.set_head("#"         , "width:5%;");
                $LIST.set_head("CATEGORIA" , "width:15%;");
                $LIST.set_head("DATA"      , "width:15%;");
                $LIST.set_head("DESCRIÇÃO" , "width:40%;");
                $LIST.set_head("LOCAL"     , "width:10%;");
                $LIST.set_head("STATUS"    , "width:10%;");

                $LIST.set_coluna( { id: "id_ocorrencia" }, "width:5%;height:120px;line-height:120px;text-align:center;");
                $LIST.set_coluna( { id: "nome_categoria" }, "width:5%;height:120px;line-height:120px;text-align:center;");
                $LIST.set_coluna({ id : "data_ocorrencia" }, "width:15%;height:120px;text-align:center;line-height:120px;");
                $LIST.set_coluna( { id: "descricao" }, "width:40%;height:120px;line-height:120px;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna({ id: "local"}, "width:10%;height:120px;line-height:120px;text-align:center;");
                $LIST.set_coluna( { id: 'status',
                                        config: { formata : 'case', 
                                                  case    : $View.box_status()}
                },"width:10%;position:relative;top:40px;" );

                $LIST.set_botao("adicionar", {
                                            color : "branco",
                                            texto : "Adicionar",
                                            icone : $ICONE.adicionar("#777",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$adicionar_ocorrencia();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);

                $LIST.show();
            }
        };

    $adicionar_ocorrencia = function()
    {
        alert('add');
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