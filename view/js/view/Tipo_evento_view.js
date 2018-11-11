var $TIPO_EVENTO;

function Tipo_evento_view()
{
    var $this  = this,
        $LOCAL = false,
        $fn = {
            monta : function()
            {
                $View.lista();
            },
            verifica_values : function()
            {
                var $result = true,
                    $nome   = $('#nome').val(),

                    $tmp = {
                        nome : $nome
                    };

                $.each($tmp, function($k, $v)
                {
                    if( !is_valid($v) && $k !== 'dt_nascimento' )
                    {
                        $result = false;

                        $('#'+$k+'_erro').css('display','table').text('Campo obrigatório!');
                        $('#'+$k).css('border-color','#ffb3b3');
                    }
                });

                if( $result )
                {
                    $.each($tmp, function($k, $v)
                    {
                        $PARAMS+= $k+'='+$v+'&';
                    });
                    
                    $PARAMS.substr(0, -1);
                }

                return $result;
            }
        },
        $View = {
            formulario : function()
            {
                var $box = "<div class=\"erro_form\" id=\"nome_erro\"></div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-top:5px;\">";
                        $box+= "<label class=\"label_style\">*Nome:</label>";
                        $box+= "<input class=\"input_style\" type=\"text\" id=\"nome\" name=\"nome\" value=\"\" />";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"margin:10px 0;\">";
                        $box+= "<label class=\"label_style\">Descrição:</label>";
                        $box+= "<textarea class=\"input_style\" style=\"width:calc(100% - 120px);resize:vertical;\" id=\"descricao\" name=\"descricao\" value=\"\" /></<textarea>";
                    $box+= "</div>";
                $box+= "<div class=\"btCadastrar\" style=\"margin-left:calc(50% - 70px);\" onclick=\"$TIPO_EVENTO.salvar_tipo_evento();\">Adicionar</div>";

                return $box;
            },
            lista : function()
            {
                var $LIST   = new List("listaTipoEvento", $LOCAL);

                $LIST.set_checkbox(true);
                $LIST.set_url('http://localhost/tcc/application/controller/Evento_controller.php');
                $LIST.set_param('action=get_lista_tipo_evento');
                $LIST.define_id('id_tipo_evento');
                $LIST.define_ajax_on(false);
                $LIST.set_paginacao(false);
                $LIST.set_checkbox_head_style("margin:10px 0 10px 10px;");
                $LIST.set_checkbox_style("margin:10px 0 10px 10px;");
                
                $LIST.set_head("#"         , "width:5%;");
                $LIST.set_head("NOME"      , "width:25%;");
                $LIST.set_head("DESCRIÇÃO" , "width:60%;");
                
                $LIST.set_coluna( { id: "id_tipo_evento" }, "width:5%;text-align:center;");
                $LIST.set_coluna({ id : "nome" }, "width:25%;text-align:center;");
                $LIST.set_coluna( { id: "descricao" }, "width:60%;text-align:center;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-transform:capitalize;");
                
                $LIST.set_botao("adicionar", {
                                            color : "branco",
                                            texto : "Adicionar",
                                            icone : $ICONE.adicionar("#777",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$TIPO_EVENTO.adicionar_tipo();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                },true);
                $LIST.set_botao("editar", {
                                            color : "branco",
                                            texto : "Editar",
                                            icone : $ICONE.editar("#777",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$TIPO_EVENTO.editar_tipo();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });
                $LIST.set_botao("excluir", {
                                            color : "excluir",
                                            texto : "Excluir",
                                            icone : $ICONE.lixeira("#FFF",17,"float:left;margin:2px 5px 0 0;"),
                                            action : $LIST.action.onclick("$TIPO_EVENTO.excluir_tipo();"),
                                            attr  : {style:"float:left;margin-right:5px;padding:5px 10px;"}
                });

                $LIST.show();
            }
        };

    this.adicionar_tipo = function()
    {
        WA_box({
            id             : "boxTipoEventoForm",
            skin           : "DROBox"         ,
            width          : "380px"          ,
            height         : "auto"           ,
            fixed          : true             ,
            local          : "#CONTEUDO_boxTipoEvento",
            position_left  : "36%"            ,
            transparent    : false            ,
            titulo         : "Adicionar tipo de evento",
            conteudo       : $View.formulario()
        });
    };
    
    this.salvar_tipo_evento = function()
    {
        var $nome      = $('#nome').val(),
            $descricao = $('#descricao').val();

        if( is_valid($nome) )
        {
            $.ajax({
                url      : 'http://localhost/tcc/application/controller/Evento_controller.php',
                type     : 'POST',
                dataType : 'json',
                data     : 'action=cadastrar_tipo_evento&nome='+$nome+'&descricao='+$descricao+"&id_usuario="+$USUARIO['usuario']['id_usuario'],
                async    : false,
                success  : function(data)
                {
                    if(data.result)
                    {
                        mensagem_top('ok','Tipo de evento cadastrado realizado com sucesso!');
                        WA_box_closed('boxTipoEventoForm');
                        $this.show();
                    }
                    else
                    {
                        mensagem_top('erro','Erro ao cadastrar tipo de evento!');
                    }
                }
            });
        }
        else
        {
            $('#nome_erro').css('display','table').text('Campo obrigatório!');
            $('#nome').css('border-color','#ffb3b3');
        }
    };
    
    this.editar_tipo = function()
    {
        
    };

    this.excluir_tipo = function()
    {
        
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