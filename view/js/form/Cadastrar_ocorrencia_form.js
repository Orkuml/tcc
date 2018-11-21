function Cadastrar_ocorrencia_form()
{
    var $LOCAL  = false,
        $PARAMS = '',
        $Get = {
            categoria : function()
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
        $fn = {
            buscar_cpf : function()
            {
                $('#cpf').blur(function()
                {
                    var $cpf  = $(this).val(),
                        $size = $cpf.length;

                        if( $size === 14)
                        {
                            var $pessoa = $fn.get_pessoa($cpf);
                            
                            if( is_object($pessoa) )
                            {
                                $('#nome').val($pessoa[$cpf]['nome']);
                                $("input:radio[name=\"sexo\"][value=\""+$pessoa[$cpf]['sexo']+"\"]").prop('checked', true);
                                $('#cpf_erro').css('display','none');
                                $('#cpf').css('border-color','#CCC');
                            }
                        }
                        else
                        {
                            $('#cpf_erro').css('display','table').text('CPF inválido!');
                            $('#cpf').css('border-color','#ffb3b3');
                        }
                });
            },
            buscar_local : function()
            {
                $('#tipo_busca').blur(function()
                {
                    var $val = $(this).val();
                    
                    if( is_valid($val) )
                    {
                        consultar_local($val);
                    }
                });
            },
            config : function()
            {
                $('#cpf').mask('999.999.999-99');
                $('#tipo_busca').mask('99999-999');
                $fn.buscar_cpf();
                $fn.buscar_local();
                
                var $DATE  = new Date(),
                    $year  = $DATE.getFullYear(),
                    $mes   = $DATE.getMonth() + 1,
                    $month = ($mes < 10) ? "0"+$mes : $mes,
                    $day   = $DATE.getDate(),
                    $max   = $day+"/"+$month+"/"+$year;

                $('#data_ocorrencia').datepicker({
                                        dateFormat     : 'dd/mm/yy',
                                        dayNames       : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
                                        dayNamesMin    : ['D','S','T','Q','Q','S','S','D'],
                                        dayNamesShort  : ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
                                        monthNames     : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                                        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                                        maxDate        : $max
                });

                $('div.ui-datepicker').css('font-size','17px');
            },
            get_pessoa : function($cpf)
            {
                var $action = action_url('http://localhost/tcc/application/controller/Usuario_controller.php',"action=get_pessoa&cpf="+$cpf);

                return $action['result'];
            },
            monta : function()
            {
                $View.formulario();
                $fn.config();
            },
            verifica_values : function()
            {
                var $result    = true,
                    $cpf       = $('#cpf').val(),
                    $nome      = $('#nome').val(),
                    $sexo      = $('input[name=\"sexo\"]:checked').val(),
                    $data      = $('#data_ocorrencia').val(),
                    $categoria = $('#categoria').val(),
                    $longitude = $('#longitude').val(),
                    $latitude  = $('#latitude').val(),
                    $descricao = $('#descricao').val(),
                    $tmp = {
                        cpf             : $cpf,
                        nome            : $nome,
                        sexo            : $sexo,
                        data_ocorrencia : $data,
                        descricao       : $descricao,
                        longitude       : $longitude,
                        latitude        : $latitude,
                        categoria       : $categoria
                    };

                var $anonimo = $("#anonimo").is(":checked");

                $.each($tmp, function($k, $v)
                {
                    $('#'+$k+'_erro').css('display','none');
                    $('#'+$k).css('border-color','#CCC');

                    if( $anonimo )
                    {
                        if( $k !== 'cpf' && $k !== 'nome' && $k !== 'sexo' )
                        {
                            if( !is_valid($v) )
                            {
                                $result = false;

                                $('#'+$k+'_erro').css('display','table').text('Campo obrigatório!');
                                $('#'+$k).css('border-color','#ffb3b3');
                            }
                        }
                    }
                    else
                    {
                        if( !is_valid($v) )
                        {
                            $result = false;

                            $('#'+$k+'_erro').css('display','table').text('Campo obrigatório!');
                            $('#'+$k).css('border-color','#ffb3b3');
                        }
                    }
                    $PARAMS+= $k+'='+$v+'&';
                });

                $PARAMS.substr(0, -1);
                
                if( !$result )
                {
                    $PARAMS = '';
                }

                return $result;
            }
        },
        $View = {
        formulario : function()
        {
            var $categoria = $Get.categoria(),
                $box = "<div class=\"form_box_login scroll_transparent\" style=\"width:420px;height:450px;overflow-y:auto;\">";
                    $box+= "<div class=\"box_linha\" style=\"width:calc(100% - 10px);padding:10px 0;border-bottom:1px dotted #CCC;\">";
                        $box+= "<div class=\"box\" style=\"margin-left:10px;font-size:16px;font-style:italic;\" >Se deseja manter-se anônima(o), clique aqui</div>";
                        $box+= "<div class=\"box\">"+$ICONE.seta_right("#333",17,"float:left;margin:3px 0 0 8px;")+"</div>";
                        $box+= "<div class=\"box\"><input type=\"checkbox\" id=\"anonimo\" style=\"width:20px;margin-top:2px;margin-left:10px;height:20px;cursor:pointer;\" onclick=\"$.anonimo();\"></div>";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"cpf_erro\"></div>";
                    $box+= "<div class=\"box_linha\" id=\"box_cpf\" style=\"margin-bottom:10px;\">";
                        $box+= "<label>CPF:</label>";
                        $box+= "<input class=\"input_form\" type=\"text\" id=\"cpf\" name=\"cpf\" value=\"\" />";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"nome_erro\"></div>";
                    $box+= "<div class=\"box_linha\" id=\"box_nome\" style=\"margin-bottom:10px;\">";
                        $box+= "<label >Nome:</label>";
                        $box+= "<input class=\"input_form\" type=\"text\" maxlength=\"45\" id=\"nome\" name=\"nome\" value=\"\" />";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" id=\"box_sexo\" style=\"margin-bottom:10px;\">";
                        $box+= "<label >Sexo:</label>";
                        $box+= "<input type=\"radio\" name=\"sexo\" value=\"F\" checked required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 0;\">";
                        $box+= "<div class=\"box\" style=\"margin-top:4px;\">Feminino</div>";
                        $box+= "<input type=\"radio\" name=\"sexo\" value=\"M\" required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 10px;\">";
                        $box+= "<div class=\"box\" style=\"margin-top:4px;\">Masculino</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"data_ocorrencia_erro\"></div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                        $box+= "<label >*Data da ocorrência:</label>";
                        $box+= "<input class=\"input_form\" type=\"text\" readonly=\"true\" id=\"data_ocorrencia\" name=\"data_ocorrencia\" value=\"\"/>";
                    $box+= "</div>";
                    $box+= "<label class=\"label_style\" style=\"width:150px;\">*Categoria:</label>";
                    $box+= "<div class=\"box_linha\" style=\"width:250px;margin-bottom:10px;\">";
                        $box+= "<select class=\"select\" id=\"categoria\" style=\"margin:0;width:100%;\">";
                            $.each($categoria, function($k, $v)
                            {
                                $box+= "<option value=\""+$k+"\">"+$v+"</option>";
                            });
                        $box+= "</select>";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"tipo_busca_erro\"></div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                        $box+= "<label >Buscar local:</label>";
                        $box+= "<input type=\"radio\" name=\"tipo\" value=\"CEP\" checked required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 0;\" onclick=\"$.set_tipo_busca('CEP');\">";
                        $box+= "<div class=\"box\" style=\"margin-top:4px;\">CEP</div>";
                        $box+= "<input type=\"radio\" name=\"tipo\" value=\"RUA\" required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 10px;\" onclick=\"$.set_tipo_busca('RUA');\">";
                        $box+= "<div class=\"box\" style=\"margin-top:4px;\">Logradouro</div>";
                        $box+= "<input class=\"input_form\" style=\"margin-top:10px;\" type=\"text\" id=\"tipo_busca\" name=\"tipo_busca\" value=\"\"/>";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"latitude_erro\"></div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                        $box+= "<label >*Latitude:</label>";
                        $box+= "<input class=\"input_form\" type=\"text\" readonly=\"true\" id=\"latitude\" name=\"latitude\" value=\"\" />";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"longitude_erro\"></div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                        $box+= "<label >*Longitude:</label>";
                        $box+= "<input class=\"input_form\" type=\"text\" readonly=\"true\" id=\"longitude\" name=\"longitude\" value=\"\" />";
                    $box+= "</div>";
                    $box+= "<div class=\"erro_form\" id=\"descricao_erro\"></div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                        $box+= "<label class=\"label_style\">*Descrição:</label>";
                        $box+= "<textarea class=\"input_style textarea\" placeholder=\"Descreva o ocorrido.\" style=\"min-height:60px;\" id=\"descricao\" name=\"descricao\" value=\"\"></textarea>";
                    $box+= "</div>";
                    $box+= "<div class=\"btCadastrar\" style=\"margin-left:calc(50% - 60px);margin-top:10px;\" onclick=\"$.salvar_ocorrencia();\">Cadastrar</div>";
                $box+= "</div>";

            $($LOCAL).html($box);
        }
    };

    $.anonimo = function()
    {
        var $cpf  = $('#box_cpf'),
            $nome = $('#box_nome'),
            $sexo = $('#box_sexo');

        if( $cpf.is(":visible") ){ $cpf.css('display','none'); $('#cpf_erro').css('display','none'); $('#cpf').val('');}
        else{ $cpf.css('display','table'); }
        if( $nome.is(":visible") ){ $nome.css('display','none'); $('#nome_erro').css('display','none'); $('#nome').val(''); }
        else{ $nome.css('display','table'); }
        if( $sexo.is(":visible") ){ $sexo.css('display','none'); }else{ $sexo.css('display','table'); }
    };

    $.salvar_ocorrencia = function()
    {
        if( $fn.verifica_values() )
        {
            $.ajax({
                url      : 'http://localhost/tcc/application/controller/Ocorrencia_controller.php',
                type     : 'POST',
                dataType : 'json',
                data     : $PARAMS+'&action=cadastrar_ocorrencia',
                async    : false,
                success  : function(data)
                {
                    if(data.result)
                    {
                        WA_box_closed('boxAddOcorrencia');
                        mensagem_top('ok','Obrigado por contriuir, sua ocorrência foi salva com sucesso!');
                        
                        var $tipo = $('.menu_horizontal_bt_select').attr('id');
                        
                        $OCORRENCIA_VIEW.select_conteudo($tipo);
                    }
                    else
                    {
                        mensagem_top('erro','Erro ao cadastrar ocorrência, tente novamente!');
                    }
                }
            });
        }
    };

    $.set_tipo_busca = function($tipo)
    {
        var $El = $('#tipo_busca');
        
        $El.val('');
        
        if($tipo === 'CEP')
        {
            $El.mask('99999-999');
        }
        else
        {
            var $mascara = $El.data('mask');

            $mascara.remove();
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