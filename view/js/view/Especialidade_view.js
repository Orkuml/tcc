/**
 * Description of usuarios_view
 *
 * @author Ranniere Farias
 */

var $ESPECIALIDADE;

function Especialidade_view()
{
    var $LOCAL = false,
        $_ID   = false,
        $fn = {
            monta : function()
            {
                $View.lista();
            }
        },
        $View = {
            lista : function()
            {
                var $LIST   = new List("listaEspecialista", $LOCAL);

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Especialidade_controller.php');
                $LIST.set_param('action=get_lista&id_usuario='+$_ID);
                $LIST.define_id('id_especialista');
                $LIST.define_ajax_on(false);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:10px 0 10px 10px;");
                
                $LIST.set_head("NOME"      , "width:30%;");
                $LIST.set_head("DESCRICAO" , "width:62%;");
                
                $LIST.set_coluna({ id : "nome" }, "width:30%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_coluna( { id: "descricao" }, "width:62%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                $LIST.set_botao("Adicionar", {
                                            color : "branco",
                                            texto : "Adiconar",
                                            icone : $ICONE.adicionar("#777",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$adicionar_especialidade('"+$_ID+"');"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);
                $LIST.set_botao("Excluir", {
                                            color : "excluir",
                                            texto : "Excluir",
                                            icone : $ICONE.lixeira("#777",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$excluir_especialidade();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });

                $LIST.show();
            }
        };
        
    this.set_id = function($id)
    {
        $_ID = $id;
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

function $form_especialidade($id)
{
    var $box    = "",
        $action = action_url('http://localhost/tcc/application/controller/Especialidade_controller.php',"action=get_options"),
        $SELECT = {};

    if( $action['result'] )
    {
        $SELECT = $action['cache'];
    }

    $box+= "<div class=\"erro_form\" style=\"margin-left:10px;\" id=\"erro_especialidade\"></div>";
    $box+= "<div class=\"box_linha\" style=\"width:calc(100% - 20px);\">";
        $box+= "<select class=\"select\" id=\"especialidade\" style:\"margin-bottom:20px;\">";
            $.each($SELECT, function($k, $v)
            {
                $box+= "<option value=\""+$k+"\">"+$v+"</option>";
            });
        $box+= "</select>";
    $box+= "</div>";
    $box+= "<div class=\"btCadastrar\" style=\"margin-left:calc(50% - 70px);\" onclick=\"$salvar_especialidade('"+$id+"');\">Adicionar</div>";

    return $box;
};

function $adicionar_especialidade($id)
{
    WA_box({
            id             : "boxEspecialidade",
            skin           : "DROBox"         ,
            width          : "300px"          ,
            height         : "auto"           ,
            fixed          : true             ,
            local          : "#conteudo_especialidade",
            position_left  : "40%"            ,
            transparent    : false            ,
            titulo         : "Adicionar especialidade",
            conteudo       : $form_especialidade($id)
    });
};

function $excluir_especialidade()
{
    var $json  = $WAList_get_itens('listaEspecialista', true, true),
        $array = json_decode($json),
        $params = "action=excluir_especialidade&id_especialista="+$array['id_especialista'],
        $action = action_url('http://localhost/tcc/application/controller/Especialidade_controller.php', $params);

    if( $action['result'] )
    {
        mensagem_top('ok','Especialidade excluída com sucesso!');
        $ESPECIALIDADE.show();
    }
    else
    {
        mensagem_top('ok','Erro ao excluir a especialidade!');
    }

};

function $salvar_especialidade($id)
{
    var $id_especialidade = $('#especialidade').val(),
        $params = "action=set_especialidade&id_usuario="+$id+"&id_especialidade="+$id_especialidade,
        $action = action_url('http://localhost/tcc/application/controller/Especialidade_controller.php', $params);

    if($action.result)
    {
        WA_box_closed('boxEspecialidade');
        $ESPECIALIDADE.show();
        mensagem_top('ok','Cadastro realizado com sucesso!');
    }
    else
    {
        $('#erro_especialidade').css('display','table').html('Especialidade já cadastrada!');
    }
};