function Cadastrar_usuario_form()
{
    var $LOCAL  = false,
        $_BOX   = false,
        $PARAMS = '',
        $VALUES = false,
        $fn = {
            config_form : function()
            {
                $('#cpf').mask('999.999.999-99');
                
                $('.input_form').focus(function()
                {
                    var $name = $(this).prop('name');

                    $(this).css('border-color','#CCC');
                    $('#'+$name+'_erro').css('display','none');
                });
                
                $('#politica').click(function()
                {
                    if( $(this).is(':checked') )
                    {
                        $('#politica_erro').css('display','none');
                    }
                });

                var $year  = new Date().getFullYear(),
                    $to    = $year - 10,
                    $from  = $year - 90,
                    $range = $from+':'+$to;

                $('#dt_nascimento').datepicker({
                                        dateFormat     : 'dd/mm/yy',
                                        dayNames       : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
                                        dayNamesMin    : ['D','S','T','Q','Q','S','S','D'],
                                        dayNamesShort  : ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
                                        monthNames     : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
                                        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
                                        changeYear     : true,
                                        changeMonth    : true,
                                        yearRange      : $range
                });

                $('div.ui-datepicker').css('font-size','17px');
            },
            monta : function()
            {
                var $style = (is_valid($_BOX)) ? 'width:100%;border:none;' : '',
                    $box = "<div class=\"coluna1 scroll_transparent\" style=\""+$style+"\">";
                        if( is_object($VALUES) )
                        {
                            $box+= $View.formulario_editar();
                        }
                        else
                        {
                            $box+= $View.formulario();
                        }
                        
                    $box+= "</div>";
                    if( !is_valid($_BOX))
                    {
                        $box+= "<div class=\"coluna2 scroll\">";
                            $box+= $View.termos();
                        $box+= "</div>";
                    }

                $('#'+$LOCAL).html($box);
                $fn.config_form();
            },
            verifica_values : function()
            {
                var $result   = true,
                    $tipo     = $('input[name=\"tipo_usuario\"]:checked').val(),
                    $nome     = $('#nome').val(),
                    $cpf      = $('#cpf').val(),
                    $sexo     = $('input[name=\"sexo\"]:checked').val(),
                    $dt_nasc  = $('#dt_nascimento').val(),
                    $email    = $('#email').val(),
                    $login    = $('#login').val(),
                    $senha    = $('#senha').val(),
                    $politica = ( $('#politica').is(':checked') ) ? true : false,
                    $tmp = {
                        tipo_usuario : $tipo,
                        cpf          : $cpf,
                        sexo         : $sexo,
                        nome         : $nome,
                        dt_nascimento: $dt_nasc,
                        email        : $email,
                        login        : $login,
                        senha        : $senha,
                        politica     : $politica
                    };

                if($_BOX){  delete $tmp.politica; }

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
                var $style     = (is_valid($_BOX)) ? 'width:100%;' : 'width:50%',
                    $style_box = (is_valid($_BOX)) ? 'margin-top:10px;' : '',
                    $styleBT   = (is_valid($_BOX)) ? 'margin-left:calc(36% - 10px);' : 'margin-left:calc(50% - 10px);',
                    $box = "<div class=\"box_linha\" style=\""+$style+"position:absolute; top:0; z-index:10;background-color:#FFF;\">";
                        $box+= "<div class=\"line\"></div>";
                    if( !is_valid($_BOX) )
                    {
                        $box+= "<div class=\"name\">Cadastro de usuário</div>";
                    }
                    $box+= "</div>";
                    $box+= "<div class=\"form_box_login\" style=\""+$style_box+"\">";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>Tipo de usuário:</label>";
                            $box+= "<input type=\"radio\" name=\"tipo_usuario\" value=\"2\" checked required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 0;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Vítima</div>";
                            $box+= "<input type=\"radio\" name=\"tipo_usuario\" value=\"3\" required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 10px;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Colaborador</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>Sexo:</label>";
                            $box+= "<input type=\"radio\" name=\"sexo\" value=\"F\" checked required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 0;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Feminino</div>";
                            $box+= "<input type=\"radio\" name=\"sexo\" value=\"M\" required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 10px;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Masculino</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"cpf_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*CPF:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" id=\"cpf\" name=\"cpf\" value=\"\" />";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"nome_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*Nome:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" maxlength=\"45\" id=\"nome\" name=\"nome\" value=\"\" />";
                        $box+= "</div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>Data de nascimento:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" readonly=\"true\" id=\"dt_nascimento\" name=\"dt_nascimento\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"email_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*Email:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" maxlength=\"45\" name=\"email\" id=\"email\" value=\"\" />";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"login_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*Login:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" maxlength=\"45\" name=\"login\" id=\"login\" value=\"\" />";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"senha_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*Senha:</label>";
                            $box+= "<input class=\"input_form\" type=\"password\" maxlength=\"45\" name=\"senha\" id=\"senha\" value=\"\" />";
                            $box+= "<div class=\"box\" onclick=\"$.show_pass();\">"+$ICONE.olho('#333', 15, 'float:left;margin:8px 0 0 -18px;cursor:pointer')+"</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"btCadastrar\" style=\""+$styleBT+"\" onclick=\"$.salvar_usuario();\">Cadastrar</div>";
                    $box+= "</div>";

                return $box;
            },
            formulario_editar : function()
            {
                var $box = "<div class=\"box_linha\" style=\position:absolute; top:0; z-index:10;background-color:#FFF;\">";
                        $box+= "<div class=\"line\"></div>";
                    $box+= "</div>";
                    $box+= "<div class=\"form_box_login\" style=\"margin-top:10px;\">";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>Tipo de usuário:</label>";
                            $box+= "<input type=\"radio\" name=\"tipo_usuario\" value=\"2\" checked required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 0;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Vítima</div>";
                            $box+= "<input type=\"radio\" name=\"tipo_usuario\" value=\"3\" required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 10px;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Colaborador</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>Sexo:</label>";
                            $box+= "<input type=\"radio\" name=\"sexo\" value=\"F\" checked required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 0;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Feminino</div>";
                            $box+= "<input type=\"radio\" name=\"sexo\" value=\"M\" required=\"required\" style=\"float:left;width:18px;height:18px;margin:4px 10px 0 10px;\">";
                            $box+= "<div class=\"box\" style=\"margin-top:4px;\">Masculino</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"nome_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*Nome:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" maxlength=\"45\" id=\"nome\" name=\"nome\" value=\"\" />";
                        $box+= "</div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>Data de nascimento:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" readonly=\"true\" id=\"dt_nascimento\" name=\"dt_nascimento\" value=\"\"/>";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"email_erro\"></div>";
                        $box+= "<div class=\"box_linha\">";
                            $box+= "<label>*Email:</label>";
                            $box+= "<input class=\"input_form\" type=\"text\" maxlength=\"45\" name=\"email\" id=\"email\" value=\"\" />";
                        $box+= "</div>";
                        $box+= "<div class=\"erro_form\" id=\"login_erro\"></div>";
                        $box+= "<div class=\"btCadastrar\" style=\"\" onclick=\"$.salvar_usuario();\">Cadastrar</div>";
                    $box+= "</div>";

                return $box;
            },
            termos : function()
            {
                var $box = "<div class=\"box_politica\">";
                        $box+= "<input id=\"politica\" type=\"checkbox\" name=\"politica\" required=\"required\">";
                        $box+= "<div class=\"box\" style=\"margin-top:4px;\">Li e concordo com os termos da politica de privacidade</div>";
                        $box+= "<div class=\"erro_form\" id=\"politica_erro\" style=\"margin-left:20px;\"></div>";
                    $box+= "</div>";
                    $box+= "<div class=\"box_termos\">";
                        $box+= "<div class=\"box_linha\"><b>Política de privacidade</b></br></br></div>";
                        $box+= "<div class=\"box\">A CEDACOM adota uma postura extremamente confiável em relação aos dados pessoais fornecidos pelos usuários cadastrados e associados. \n\
                                São adotadas diversas normas de privacidade, baseadas em direito consuetudinário consagrado e difundido entre usuários da Internet no mundo todo. \n\
                                Este documento mostra como a CEDACOM administra os dados que coleta dos usuários e como você interfere neste processo. Mediante este aviso, a CEDACOM \n\
                                informa aos seus usuários sua política de proteção de dados de caráter pessoal para que os usuários determinem livre e voluntariamente se desejam fornecer \n\
                                a CEDACOM seus dados pessoais, os quais são requeridos no cadastramento do Portal ou através dele.</br></br></div>";
                        $box+= "<div class=\"box_linha\"><b>Alterações e Atualizações</b></br></br></div>";
                        $box+= "<div class=\"box\">A CEDACOM reserva-se o direito de modificar a presente política para adaptá-la a alterações legislativas ou jurisprudenciais. Em qualquer \n\
                                caso, a CEDACOM anunciará no Portal, por meio desta página, as mudanças introduzidas com uma antecedência razoável à sua colocação em prática. Certos serviços\n\
                                prestados no Portal podem conter condições particulares específicas em relação à proteção de dados pessoais.</br></br></div>";
                        $box+= "<div class=\"box_linha\"><b>Destino das Informações</b></br></br></div>";
                        $box+= "<div class=\"box\">Os dados pessoais recolhidos pela CEDACOM serão objeto de tratamento automatizado, sendo incorporados aos correspondentes registros eletrônicos \n\
                                de dados pessoais, dos quais a CEDACOM será titular e responsável.";
                        $box+= "<div class=\"box\">A CEDACOM proporcionará aos usuários os recursos técnicos adequados para que estes possam, com caráter prévio, aquiescer com esta política de \n\
                                proteção de dados ou com qualquer outra informação relevante antes de prestarem seu consentimento sobre o armazenamento dos respectivos dados pessoais. Salvo nos \n\
                                campos em que se indique o contrário, as respostas às perguntas sobre dados pessoais são voluntárias, sem que sua falta implique em diminuição da qualidade ou \n\
                                quantidade dos serviços correspondentes, a menos que se indique outra coisa. O usuário garante que os dados pessoais fornecidos a CEDACOM são verdadeiros, bem como \n\
                                que comunicará qualquer modificação nos mesmos. O registro e a utilização eletrônica dos dados pessoais do usuário pela CEDACOM têm como finalidade o estabelecimento \n\
                                de vínculo não contratual ou, se for o caso, a gestão, administração, prestação, ampliação e melhoramento dos serviços aos usuários, incluindo a adequação dos serviços \n\
                                às preferências e gostos dos usuários, a criação de novos serviços relacionados a estes serviços, o envio de atualizações dos serviços, o envio, por meios tradicionais \n\
                                e/ou eletrônicos, de informações técnicas, operacionais e a serviços oferecidos no Portal (ou através dele) e por terceiros, atualmente existentes ou a serem criados no futuro.</br></br></div>";
                        $box+= "<div class=\"box_linha\"><b>Segurança</b></br></br></div>";
                        $box+= "<div class=\"box\">A CEDACOM tem adotado os níveis legalmente requeridos quanto à segurança na proteção de dados e procura instalar todos os meios e medidas adicionais \n\
                                para evitar a perda, mau uso, alteração, acesso não autorizado ou subtração indevida dos dados pessoais recolhidos. Procurando garantir a integridade e a confidencialidade \n\
                                dos dados pessoais durante a transmissão dos mesmos. Não obstante, o usuário deve estar ciente de que as medidas de segurança relativas à Internet não são integralmente \n\
                                infalíveis. Os 'cookies' que podem ser utilizados nos sites e páginas web do Portal associam-se unicamente com o navegador de um determinado computador, não proporcionando \n\
                                referências que permitam deduzir o nome e sobrenomes do usuário. Em razão dos 'cookies', é possível que a CEDACOM reconheça os usuários que tenham se registrado em uma \n\
                                utilização anterior das páginas, o que permite que não tenham que se registrar a cada nova visita. O usuário tem a possibilidade de configurar seu navegador para ser avisado, \n\
                                na tela do computador, sobre a recepção dos 'cookies' e para impedir a sua instalação no disco rígido. As informações pertinentes a esta configuração estão disponíveis em \n\
                                instruções e manuais do próprio navegador. Para utilizar o Portal, é necessário que o usuário permita a recepção de 'cookies' enviados pela CEDACOM. Os 'cookies' que são \n\
                                utilizados nas páginas web do Portal podem ser instalados pela CEDACOM, os quais são originados dos distintos servidores operados por este Portal, ou a partir dos servidores \n\
                                de terceiros que prestam serviços e instalam 'cookies' pela CEDACOM. Um exemplo disso são os cookies empregados para prover serviços de publicidade ou certos conteúdos através \n\
                                dos quais o usuário visualiza a publicidade ou conteúdos em tempo, número de vezes e forma pré-determinados.</br></br></div>";
                        $box+= "";
                        $box+= "<div class=\"box_linha\"><b>Condições de Uso</b></br></br></div>";
                        $box+= "<div class=\"box\">O usuário assegura a CEDACOM e a seus afiliados o direito de publicar seu nome de usuário em áreas de utilidade pública como fóruns, chats, pesquisas, \n\
                                garantindo a isenção perpétua e irrevogável de pagamento sobre royalties e licença de uso, reprodução, modificação, adaptação, publicação, tradução, distribuição e trabalhos \n\
                                derivados, tanto no Brasil como no exterior, em qualquer forma de mídia ou tecnologia. Com exceção da hipótese de uma notificação clara e imediata a CEDACOM que solicite a \n\
                                não identificação do usuário que está provendo o conteúdo, fica expressamente permitido ao site identificar o usuário que venha a contribuir de alguma forma com algum tipo \n\
                                de conteúdo. Os dados que compartilhamos com terceiros são apenas estatísticas gerais, provenientes das interações dos usuários com o site, através do perfil da maioria que \n\
                                navega constantemente na CEDACOM. Nas ocasiões em que realizamos pesquisas ou promoções em conjunto com algum anunciante, informaremos que suas respostas serão compartilhadas com essa empresa.</br></br></div>";
                    $box+= "</div>";

                return $box;
            }
        };
    
    $.salvar_usuario = function()
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
    
    $.show_pass = function()
    {
        var $type = $('#senha').prop('type');

        if( $type === 'text' )
        {
            $('#senha').prop('type','password');
        }
        else
        {
            $('#senha').prop('type','text');
        }
    };
    
    this.set_box = function($box)
    {
        $_BOX = $box;
    };
    
    this.set_values = function($values)
    {
        $VALUES = $values;
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