/**
 * Description of usuarios_view
 *
 * @author Ranniere Farias
 */
function Eventos_view()
{
    var $LOCAL = false,
        $_STATUS = {
            A: {
                nome_tipo  : "Ativada",
                background : "#008C23",
                color      : "#FFF"
            },
            B: {
                nome_tipo  : "Bloqueada",
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
                var $LIST   = new List("listaEventos", '#'+$LOCAL);

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Evento_controller.php');
                $LIST.set_param('action=get_lista');
                $LIST.define_id('id_evento');
                $LIST.define_ajax_on(false);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:10px 0 10px 10px;");
                
                $LIST.set_head("#"         , "width:5%;");
                $LIST.set_head("TIPO"      , "width:15%;");
                $LIST.set_head("DESCRIÇÃO" , "width:54%;");
                $LIST.set_head("DATA"      , "width:10%;");
                $LIST.set_head("STATUS"    , "width:10%;");
                
                $LIST.set_coluna( { id: "id_evento" }, "width:5%;text-align:center;");
                $LIST.set_coluna({ id : "tipo_evento" }, "width:15%;text-align:center;");
                $LIST.set_coluna( { id: "descricao" }, "width:54%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna({ id: "data_evento",
                                        config: {
                                                formata : 'date_br'
                }}, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: 'status',
                                        config: { formata : 'case', 
                                                  case    : $View.box_status()}
                },"width:10%;height:35px" );
                
                $LIST.set_botao("adicionar", {
                                            color : "branco",
                                            texto : "Adicionar",
                                            icone : $ICONE.adicionar("#777",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$adicionar_evento();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);
//                console.log($USUARIO);
//                if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['eventos']) && is_valid($USUARIO['permissao']['visualizar']['eventos']['tipo_evento']) )
//                {
                    $LIST.set_botao("tipo_evento", {
                                                color : "branco",
                                                texto : "Tipo de evento",
                                                icone : $ICONE.checklist("#777",15,"float:left;margin-right:5px;"),
                                                action : $LIST.action.onclick("$box_tipo_evento();"),
                                                attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                    },true);
//                }
                $LIST.set_botao("editar", {
                                            color : "branco",
                                            texto : "Editar",
                                            icone : $ICONE.editar("#FFF",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$editar_evento();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });
                $LIST.set_botao("excluir", {
                                            color : "excluir",
                                            texto : "Excluir",
                                            icone : $ICONE.lixeira("#FFF",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$excluir_evento();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });

                $LIST.show();
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

function $adicionar_evento()
{
    WA_box({
            id             : "boxAddEvento",
            skin           : "DROBox"       ,
            width          : "400px"        ,
            fixed          : true            ,
            transparent    : false           ,
            titulo         : "Adicionar evento"
    });
    
    include('view/js/form/Cadastrar_evento_form.js');
    
    var $FORM = new Cadastrar_evento_form();
        $FORM.set_local('#CONTEUDO_boxAddEvento');
        $FORM.show();
};

function $editar_evento()
{
    
};

function excluir_evento()
{
    
};