function Cadastrar_evento_form()
{
    var $LOCAL  = false,
        $VALUES = {
                'width'  : '800',
                'height' : '230'
        },
        $fn = {
            config : function()
            {
                $('#cep').mask('99999-999');
                $fn.config_cep();

                var $date  = new Date(),
                    $year  = $date.getFullYear(),
                    $M     = parseInt($date.getMonth()+1),
                    $month = ($M < 10) ? "0" + $M : $M,
                    $D     = parseInt($date.getDate()),
                    $day   = ($D < 10) ? "0" + $D : $D,
                    $min   = $day+'/'+$month+'/'+$year,
                    $max   = $day+'/'+$month+'/'+($year+1);

                $('#data_evento').datepicker({
                                        dateFormat     : 'dd/mm/yy',
                                        dayNames       : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
                                        dayNamesMin    : ['D','S','T','Q','Q','S','S','D'],
                                        dayNamesShort  : ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
                                        monthNames     : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                                        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                                        changeYear     : true,
                                        changeMonth    : true,
                                        minDate        : $min,
                                        maxDate        : $max
                });

                $('div.ui-datepicker').css('font-size','17px');
            },
            config_cep : function()
            {
                $("#cep").blur(function()
                {
                    var $cep = $(this).val().replace(/\D/g, '');

                    if( $cep !== '')
                    {
                        var validacep = /^[0-9]{8}$/;
                        if( validacep.test($cep) )
                        {
                            $.getJSON("https://viacep.com.br/ws/"+ $cep +"/json/?callback=?", function(dados)
                            {
                                if( !("erro" in dados) )
                                {
                                    $("#logradouro").val(dados.logradouro);
                                    $("#bairro").val(dados.bairro);
                                    $("#cidade").val(dados.localidade);
                                    $("#uf").val(dados.uf);
                                    $("#ibge").val(dados.ibge);
                                } //end if.
                                else {
                                    //CEP pesquisado não foi encontrado.
                                    limpa_formulário_cep();
                                    alert("CEP não encontrado.");
                                }
                            });
                        } //end if.
                        else {
                            //cep é inválido.
                            limpa_formulário_cep();
                            alert("Formato de CEP inválido.");
                        }
                    } //end if.
                    else {
                        //cep sem valor, limpa formulário.
                        limpa_formulário_cep();
                    }
                });
            },
            get_tipo_evento : function()
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=get_options"),
                    $tmp    = {};
                
                if($action['result'])
                {
                    $tmp = $action['cache'];
                }
                
                return $tmp;
            },
            monta : function()
            {
                var $box = $View.image();
                    $box+= $View.formulario();

                $($LOCAL).html($box);

                $fn.upload();
                $fn.config();
            },
            upload : function()
            {
                var $width     = $VALUES['width'],
                    $height    = $VALUES['height'];

                $('#BtAddImagem').fileUpload({
                                        id           : "AddImagem",
                                        url          : 'http://localhost/tcc/application/controller/Evento_controller.php',
                                        params       : {action:"set_upload", width:$width,height:$height},
                                        file_types   : 'png|PNG|jpg|jpeg|JPG|JPEG|gif|GIF',
                                        max_file_size: size_bytes('MB', 20),
                                        botao: {
                                                color: "transparent_branco",
                                                icone: $ICONE.imagem('#777',58,'margin:-5px 0 -5px 0;')
                                        },
                                        fn_return: function(data)
                                        {
                                            var $_FILE  = data.file,
                                                $imagem = $_FILE['name'],
                                                $src    = 'http://localhost/tcc/view/images/banner/'+$imagem,
                                                $box    = "<img src=\""+$src+"\" width=\"150px\" height=\"100px\"/>";

                                            $('.Evento_thumb').css('display','table');
                                            $('#thumbImagem').html($box);
                                            $('#formularioEvento').css('display','table');
                                        },
                                        fn_erro: function(data)
                                        {
                                            mensagem_top('erro', 'Imagem menor do que o suportado!');
                                        }
                });
            }
        },
        $View = {
            image : function()
            {
                var $box = "<div class=\"Evento_add\">";
                        $box+= "<div class=\"box_linha\" id=\"erro\" style=\"width:calc(100% - 20px);padding:5px 0;margin-left:10px;color:#000;display:none;\"></div>";
                        $box+= "<div class=\"box_upload\">";
                            $box+= "<div class=\"col1\">";
                                $box+= "<div class=\"box\" style=\"width:180px;color:#555;\">Upload do computador:</div>";
                                $box+= "<div class=\"box\" style=\"width:180px;margin-top:5px;font-style:italic;\">Dimensão ideal: "+$VALUES['width']+" x "+$VALUES['height']+"</div>";
                            $box+= "</div>";
                            $box+= "<div class=\"col2\">";
                                $box+= "<div class=\"box\" id=\"BtAddImagem\" style=\"float:right;cursor:pointer;\">&nbsp;</div>";
                            $box+= "</div>";
                        $box+= "</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"Evento_thumb\">";
                        $box+= "<div class=\"thumb\" id=\"thumbImagem\">&nbsp;</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\">";
                        $box+= "<div class=\"box_linha\" id=\"AddForm\">&nbsp;</div>";
                    $box+= "</div>";

                return $box;
            },
            formulario : function()
            {
                var $tipo = $fn.get_tipo_evento(),
                    $box = "<div class=\"box_linha\" id=\"formularioEvento\" style=\"display:none;\">";
                        $box+= "<div class=\"erro_form\" id=\"descricao_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-top:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*Descrição:</label>";
                            $box+= "<textarea class=\"input_style\" sytle=\"resize:vertical;\" type=\"text\" id=\"descricao\" name=\"descricao\" value=\"\" /></textarea>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"data_evento_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-top:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*Data do evento:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" readonly=\"true\" id=\"data_evento\" name=\"data_evento\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<label class=\"label_style\" style=\"width:120px;\">*Tipo de evento:</label>";
                        $box+= "<div class=\"box_linha\" style=\"width:calc(100% - 140px);margin-top:10px;\">";
                            $box+= "<select class=\"select\" id=\"tipo_evento\" style=\"margin:0;margin-bottom:10px;width:100%;\">";
                                $.each($tipo, function($k, $v)
                                {
                                    $box+= "<option value=\""+$k+"\">"+$v+"</option>";
                                });
                            $box+= "</select>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"cep_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*CEP:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" id=\"cep\" name=\"cep\" value=\"\"/>";
                        $box+= "</div>";
                        
                        $box+= "<div class=\"erro_form\" id=\"logradouro_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*CEP:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" id=\"cep\" name=\"cep\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"cep_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*CEP:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" id=\"cep\" name=\"cep\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"cep_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*CEP:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" id=\"cep\" name=\"cep\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"cep_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*CEP:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" id=\"cep\" name=\"cep\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"cep_erro\"></div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-bottom:10px;\">";
                            $box+= "<label class=\"label_style\" style=\"width:120px;\">*CEP:</label>";
                            $box+= "<input class=\"input_style\" type=\"text\" id=\"cep\" name=\"cep\" value=\"\"/>";
                        $box+= "</div>";
                        
                        
                        $box+= "<div class=\"btCadastrar\" style=\"margin-left:calc(50% - 70px);\" onclick=\"$.salvar_evento();\">Adicionar</div>";
                    $box+= "</div>";

                return $box;
            }
        };

    $.salvar_evento = function()
    {
        if( $fn.verifica_values() )
        {
            $.ajax({
                url      : 'http://localhost/tcc/application/controller/Usuario_controller.php',
                type     : 'POST',
                dataType : 'json',
                data     : $PARAMS+'&action=cadastrar_usuario',
                async    : false,
                success  : function(data)
                {
                    if(data.result)
                    {
                        if( is_valid($_BOX) )
                        {
                            WA_box_closed('boxAdicionar');
                            $USUARIOS_VIEW.show();
                        }
                        else
                        {
                            hashtag_set({pag:false});
                        }
                        mensagem_top('ok','Cadastro realizado com sucesso!');
                    }
                    else
                    {
                        mensagem_top('erro','Erro ao cadastrar usuário, tente novamente!');
                    }
                }
            });
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