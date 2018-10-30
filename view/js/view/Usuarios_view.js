/**
 * Description of usuarios_view
 *
 * @author Ranniere Farias
 */
function Usuarios_view()
{
    var $LOCAL = false,
        $fn = {
            monta : function()
            {
                $View.lista();
            }
        },
        $View = {
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
                $LIST.set_head("NASCIMENTO", "width:15%;");
                $LIST.set_head("SEXO"      , "width:10%;");
                $LIST.set_head("TIPO"      , "width:16%;");
                
                $LIST.set_coluna( { id: "id_usuario" }, "width:5%;text-align:center;");
                
                $LIST.set_coluna({ id : "nome" }, "width:20%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna( { id: "cpf" }, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: "email" }, "width:20%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;");
                $LIST.set_coluna({ id: "dt_nascimento",
                                        config: {
                                                formata : 'date_br'
                }}, "width:15%;text-align:center;");
                $LIST.set_coluna({ id : "sexo",
                                        config : {
                                                formata : 'case',
                                                case    : {"F":"Feminino","M":"Masculino"}
                }}, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: "tipo_usuario" }, "width:16%;text-align:center;text-transform:capitalize;");
                
                $LIST.filtro("nome","buscador",{
                                            attr: {
                                                  placeholder:"Digite o nome",
                                                  style:"float:left;"
                                            }
                });
                $LIST.set_botao("adicionar", {
                                            color : "branco",
                                            texto : "Adicionar",
                                            icone : $ICONE.adicionar("#777",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$adicionar_usuario();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);
                $LIST.set_botao("editar", {
                                            color : "branco",
                                            texto : "Editar",
                                            icone : $ICONE.editar("#777",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$editar_usuario();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });
                $LIST.set_botao("especialidade", {
                                            color : "azul",
                                            texto : "Especialidade",
                                            icone : $ICONE.grupo("#FFF",15,"float:left;margin-right:5px;"),
                                            action : $LIST.action.onclick("$adicionar_especialidade();"),
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

function $adicionar_especialidade()
{
    alert('adicionar especialidade');
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