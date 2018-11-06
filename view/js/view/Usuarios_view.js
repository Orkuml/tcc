/**
 * Description of usuarios_view
 *
 * @author Ranniere Farias
 */
var $USUARIOS_VIEW;

function Usuarios_view()
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
                var $LIST   = new List("listaUsuario", '#'+$LOCAL);

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Usuario_controller.php');
                $LIST.set_param('action=get_lista');
                $LIST.define_id('id_usuario');
                $LIST.define_ajax_on(false);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:10px 0 10px 10px;");
                
                $LIST.set_head("#"         , "width:5%;");
                $LIST.set_head("NOME"      , "width:20%;");
                $LIST.set_head("CPF"       , "width:10%;");
                $LIST.set_head("EMAIL"     , "width:20%;");
                $LIST.set_head("NASCIMENTO", "width:10%;");
                $LIST.set_head("SEXO"      , "width:10%;");
                $LIST.set_head("TIPO"      , "width:10%;");
                $LIST.set_head("STATUS"    , "width:10%;");
                
                $LIST.set_coluna( { id: "id_usuario" }, "width:5%;text-align:center;");
                
                $LIST.set_coluna({ id : "nome" }, "width:20%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna( { id: "cpf" }, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: "email" }, "width:20%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;");
                $LIST.set_coluna({ id: "dt_nascimento",
                                        config: {
                                                formata : 'date_br'
                }}, "width:10%;text-align:center;");
                $LIST.set_coluna({ id : "sexo",
                                        config : {
                                                formata : 'case',
                                                case    : {"F":"Feminino","M":"Masculino"}
                }}, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: "tipo_usuario" }, "width:10%;text-align:center;text-transform:capitalize;");
                $LIST.set_coluna( { id: 'status',
                                        config: { formata : 'case', 
                                                  case    : $View.box_status()}
                },"width:10%;height:35px" );
                
                $LIST.set_botao("adicionar", {
                                            color : "branco",
                                            texto : "Adicionar",
                                            icone : $ICONE.adicionar("#777",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$adicionar_usuario();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);
                $LIST.set_botao("status", {
                                            color : "branco",
                                            texto : "Alterar Status",
                                            icone : $ICONE.checklist("#777",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$status_usuario();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });
                $LIST.set_botao("especialidade", {
                                            color : "azul",
                                            texto : "Especialidade",
                                            icone : $ICONE.grupo("#FFF",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$box_especialidade();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });

                $LIST.filtro("nome", "buscador",{
                                                attr: {
                                                       placeholder:"Digite o nome",
                                                       style: "float:left;"
                                                }
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

function $box_especialidade()
{
    var $json  = $WAList_get_itens('listaUsuario', true, true),
        $array = json_decode($json),
        $box   = "<div class=\"box_linha\" style=\"position:relative;top:5px;\" id=\"conteudo_especialidade\"></div>";
    
    WA_box({
            id             : "boxEspecialista",
            skin           : "DROBox"         ,
            width          : "500px"          ,
            height         : "calc(100% - 180px)",
            fixed          : true          ,
            transparent    : false         ,
            titulo         : "Especialidade",
            conteudo       : $box
    });
    
    $WAList_deselect("listaUsuario", "WA_check_preto");
    
    include('view/js/view/Especialidade_view.js');

    $ESPECIALIDADE = new Especialidade_view();
    $ESPECIALIDADE.set_id($array['id_usuario']);
    $ESPECIALIDADE.set_local('#conteudo_especialidade');
    $ESPECIALIDADE.show();
;}

function $adicionar_usuario()
{
    var $box = "<div class=\"box_linha\" style=\"position:relative;top:5px;\" id=\"conteudo_adicionar\"></div>";

    WA_box({
            id             : "boxAdicionar",
            skin           : "DROBox"      ,
            width          : "500px",
            height         : "calc(100% - 180px)",
            fixed          : true          ,
            transparent    : false         ,
            titulo         : "Adicionar usuário",
            conteudo       : $box
    });

    include('view/js/form/Cadastrar_usuario_form.js');

    $VIEW = new Cadastrar_usuario_form();
    $VIEW.set_local('conteudo_adicionar');
    $VIEW.set_box(true);
    $VIEW.show();
};

function $editar_usuario()
{
    var $json  = $WAList_get_itens('listaUsuario', true, true),
        $array = json_decode($json),
        $box   = "<div class=\"box_linha\" style=\"position:relative;top:5px;\" id=\"conteudo_editar\"></div>";

    WA_box({
            id             : "boxEditar",
            skin           : "DROBox"      ,
            width          : "500px",
            height         : "calc(100% - 180px)",
            fixed          : true          ,
            transparent    : false         ,
            titulo         : "Editar usuário",
            conteudo       : $box
    });

    include('view/js/form/Cadastrar_usuario_form.js');
    $VIEW = new Cadastrar_usuario_form();
    $VIEW.set_local('conteudo_editar');
    $VIEW.set_box(true);
    $VIEW.set_values($array);
    $VIEW.show();
};

function $status_usuario()
{
    var $json   = $WAList_get_itens('listaUsuario', true, true),
        $array  = json_decode($json),
        $params = "action=alterar_status&id_usuario="+$array['id_usuario']+"&status="+$array['status'],
        $action = action_url('http://localhost/tcc/application/controller/Usuario_controller.php',$params);

        if( $action['result'] )
        {
            mensagem_top('ok','Status alterado com sucesso!');
            $USUARIOS_VIEW.show();
        }
        else
        {
            mensagem_top('ok','Erro ao alterar status!');
        }
};