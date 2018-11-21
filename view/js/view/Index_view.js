/**
 * Description of index_view
 *
 * @author Ranniere Farias
 */
var $INDEX_VIEW;

function Index_view()
{
    var $LOCAL    = false,
        $EVENTOS  = false,
        $_TIPO    = false,
        $SELECIONADO = false,
        $_BANNERS = [],
        $Get = {
            usuario : function($id_usuario)
            {
                var $action = action_url('http://localhost/tcc/application/controller/Usuario_controller.php',"action=get_usuario&id_usuario="+$id_usuario);

                return $action['result'];
            },
            eventos : function()
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=lista_eventos");

                if($action['result'])
                {
                    $EVENTOS = $action['cache'];
                }
            },
            tipo_evento : function()
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=get_options");

                if($action['result'])
                {
                    $_TIPO = $action['cache'];
                }
            },
            total : function($id_evento)
            {
                var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=get_total&id_evento="+$id_evento);

                return $action['result'];
            },
            vinculo : function($id_evento)
            {
                var $tmp        = false,
                    $id_usuario = (is_object($USUARIO) && is_object($USUARIO['usuario'])) ? $USUARIO['usuario']['id_usuario'] : false;
                
                if( is_valid($id_usuario) )
                {
                    var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=get_vinculo&id_usuario="+$id_usuario+"&id_evento="+$id_evento);

                    $tmp = $action['result'];
                }

                return $tmp;
            }
        },
        $fn = {
            banner : function()
            {
                var $k = 0;

                setInterval(function()
                {
                    if( $k < 5 )
                    {
                        if( is_valid($_BANNERS[$k]) )
                        {
                            $('#box_banner > img').css('display','none');
                            $('#banner_'+$_BANNERS[$k]).css('display', 'table');
                        }
                        $k++;
                    }
                    else
                    {
                        $k = 0;

                        if( is_valid($_BANNERS[$k]) )
                        {
                            $('#box_banner > img').css('display','none');
                            $('#banner_'+$_BANNERS[$k]).css('display', 'table');
                        }
                    }
                },3000);
            },
            monta : function()
            {
                $Get.eventos();
                $Get.tipo_evento();
                $View.conteudo();
                $fn.banner();
                initMap();
            }
    },
    $View = {
        banner : function()
        {
            var $box = '',
                $n = 0;

            $box+= "<div class=\"banner ini\" id=\"box_banner\">";
            if( is_object($EVENTOS) )
            {
                $.each($EVENTOS, function($k, $v)
                {
                    if( $n < 5)
                    {
                        var $id_evento = $v['id_evento'],
                            $display   = ($n === 0) ? "display:table" : "display:none;";

                        $_BANNERS[$n] = $id_evento;

                        $box+= "<img src=\"view/images/banner/"+$v['banner']+"\" id=\"banner_"+$id_evento+"\" style=\""+$display+"\" onclick=\"view_evento('"+json_encode($v)+"');\">";
                    }
                    $n++;
                });
            }
            else
            {
                $box+= "<div class=\"box_linha\" >Não existe banner cadastrado!</div>";
            }
            $box+= "</div>";

            return $box;
        },
        bottom : function()
        {
            var $box = $View.denuncie();
                $box+= "<div class=\"block\">";
                    $box+= "<div class=\"title\">Deseja ajudar?</div>";
                    $box+= "<div class=\"texto\">Junte-se a nós, se torne um colaborador, participe dos eventos e ajude outras pessoas.</div>";
                    $box+= "<div class=\"texto\" onclick=\"SetPage('cadastrar_usuario');\" style=\"cursor:pointer;\"><i>Clique aqui e cadastre-se.</i></div>";
                $box+= "</div>";
                $box+= "<div class=\"block\">";
                    $box+= "<div class=\"title\">Cadastre o abuso.</div>";
                    $box+= "<div class=\"texto\">Não tenha medo, você não está sozinha. Cadastre o fato ocorrido e poderemos ajudar mais vítimas.</div>";
                    $box+= "<div class=\"texto\" onclick=\"SetPage('ocorrencias');\" style=\"cursor:pointer;\"><i>Clique aqui e cadastre.</i></div>";
                $box+= "</div>";
                $box+= "<div class=\"block\">";
                    $box+= "<div class=\"title\">Compartilhe</div>";
                    $box+= "<div class=\"texto\">Selecione um evento e compartilhe, assim pode-se aumentar a rede positiva, conscientizando mais pessoas.</div>";
                    $box+= "<div>&nbsp;</div>";
                $box+= "</div>";

            return $box;
        },
        box_evento : function($obj)
        {
            var $array   = json_decode($obj),
                $idUser  = $array['id_usuario'],
                $idEvento= $array['id_evento'],
                $usuario = $Get.usuario($idUser),
                $total   = $Get.total($idEvento),
                $vinculo = $Get.vinculo($idEvento),
                $nome    = (is_object($usuario)) ? $usuario[$idUser]['nome']   : false,
                $email   = (is_object($usuario) && is_valid($usuario[$idUser]['email'])) ? $ICONE.email('#555',19,'float:left;margin:2px 5px 0 0;')+$usuario[$idUser]['email']  : "",
                $tel     = (is_object($usuario) && is_valid($usuario[$idUser]['numero'])) ? " / "+$ICONE.telefone('#555',19,'float:left;margin:2px 5px 0 0;')+$usuario[$idUser]['numero'] : "",
                $local   = $array['logradouro']+", "+$array['numero'],
                $cidade  = $array['cidade']+" - "+$array['estado'],
                $search  = 'https://google.com.br/maps/search/'+$local;

            var $box = "<div class=\"box_eventos\">";
                    $box+= "<div class=\"box_banner\">";
                        $box+= "<img src=\"view/images/banner/"+$array['banner']+"\">";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"padding-bottom:10px;\">";
                        $box+= "<div class=\"box\" style=\"margin-right:10px;font-style:italic;\">Compartilhe: </div>";
                        $box+= "<div class=\"box\" onclick=\"$.share('https://facebook.com/share.php?u=google.com.br');\">"+$ICONE.facebook('#475993',19,'float:left;margin-right:12px;cursor:pointer;')+"</div>";
                        $box+= "<div class=\"box\" onclick=\"$.share('https://web.whatsapp.com/');\">"+$ICONE.whatsapp('#4CAF50',19,'float:left;margin-right:12px;cursor:pointer;')+"</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"informacoes\">";
                        $box+= "<div class=\"tipo\">"+$_TIPO[$array['id_tipo_evento']]+"</div>";
                        $box+= "<div class=\"descricao\">"+$array['descricao']+" </div>";
                        if($nome)
                        {
                            $box+= "<div class=\"label\">Responsável:</div>";
                            $box+= "<div class=\"val\">"+$nome+"</div>";
                            if( is_object($USUARIO) && is_object($USUARIO['usuario']) )
                            {
                                $box+= "<div class=\"label\">Contato:</div>";
                                $box+= "<div class=\"val\">"+$email+$tel+"</div>";
                            }
                        }
                        $box+= "<div class=\"label\">Data:</div>";
                        $box+= "<div class=\"val\">"+data_br($array['data_evento'])+"</div>";
                        $box+= "<div class=\"label\">Hora:</div>";
                        $box+= "<div class=\"val\">"+$array['hora']+"</div>";
                        $box+= "<div class=\"label\">Local:</div>";
                        $box+= "<div class=\"val\">"+$local+"<div class=\"box\" title=\"LOCALIZAR\" onclick=\"$.share('"+$search+"');\">"+$ICONE.lupa('#555',19,'float:right;cursor:pointer;margin:2px 10px 0 0;')+"</div>"+"</div>";
                        $box+= "<div class=\"label\">Cidade:</div>";
                        $box+= "<div class=\"val\">"+$cidade+"</div>";
                    $box+= "</div>";
                    if( is_object($USUARIO) && is_object($USUARIO['usuario']) )
                    {
                        var $id_usuario = $USUARIO['usuario']['id_usuario'];
                        
                        $box+= "<div class=\"participar\">";
                            $box+= "<div class=\"title\">Deseja participar?</div>";
                                if( is_valid($vinculo) )
                                {
                                    $box+= $View.bt_evento($vinculo, $id_usuario, $idEvento);
                                }
                                else
                                {
                                    $box+= $View.bt_evento('S', $id_usuario, $idEvento, true);
                                    $box+= $View.bt_evento('N', $id_usuario, $idEvento, true);
                                    $box+= $View.bt_evento('T', $id_usuario, $idEvento, true);
                                }
                                $box+= "<div class=\"box_linha\" style=\"position:absolute;bottom:10px;left:81%;\">";
                                    $box+= "<div class=\"box\">"+$ICONE.acept2('#70db70',17,'float:left;margin:0 10px;')+$total['S']+"</div>";
                                    $box+= "<div class=\"box\">"+$ICONE.cancelar2('#ff6666',17,'float:left;margin:0 10px;')+$total['N']+"</div>";
                                    $box+= "<div class=\"box\">"+$ICONE.borracha('#ffc266',17,'float:left;margin:0 10px;')+$total['T']+"</div>";
                                $box+= "</div>";
                            $box+= "</div>";
                        $box+= "</div>";
                    }

            return $box;
        },
        bt_evento : function($tipo, $id_usuario, $id_evento, $click)
        {
            var $box     = '',
                $onclick = '';
            
            switch($tipo)
            {
                case 'S':
                    $onclick = is_valid($click) ? "$.opcao_evento('S','"+$id_usuario+"','"+$id_evento+"');" : "";
                    $box+= "<div class=\"options\" onclick=\""+$onclick+"\">"+$ICONE.acept('#70db70',17,'float:left;margin:0 5px;')+"SIM</div>";
                    break;
                case 'N':
                    $onclick = is_valid($click) ? "$.opcao_evento('N','"+$id_usuario+"','"+$id_evento+"');" : "";
                    $box+= "<div class=\"options\" onclick=\""+$onclick+"\">"+$ICONE.cancelar('#ff6666',17,'float:left;margin:0 5px;')+"NÃO</div>";
                    break;
                case 'T':
                    $onclick = is_valid($click) ? "$.opcao_evento('T','"+$id_usuario+"','"+$id_evento+"');" : "";
                    $box+= "<div class=\"options\" onclick=\""+$onclick+"\");\">"+$ICONE.borracha('#ffc266',17,'float:left;margin:0 5px;')+"TALVEZ</div>";
                    break;
            }
            
            return $box;
        },
        conteudo : function()
        {
            var $box = $View.div();
                $box+= "<div class=\"index\">";
                    $box+= "<div class=\"col1\">";
                        $box+= $View.banner();
                        $box+= $View.mapa();
                        $box+= $View.bottom();
                    $box+= "</div>";
                    $box+= "<div class=\"col2\">";
                        $box+= "<div class=\"title\">Próximos eventos</div>";
                        $box+= $View.noticias();
                    $box+= "</div>";
                $box+= "</div>";

            $('#'+$LOCAL).html($box);
        },
        direitos : function()
        {
            var $box = "<div class=\"box_linha scroll_transparent\" style=\"width:calc(100% - 15px);height:475px;padding:5px 5px;border:2px solid #666;overflow:auto;\">";
                    $box+= "<div class=\"box_linha\" style=\"color:#444;padding-bottom:4px;\">TÍTULO I</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#999;padding-bottom:4px;\">DISPOSIÇÕES PRELIMINARES</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 1o</b> Esta Lei cria mecanismos para coibir e prevenir a violência doméstica e familiar contra a mulher, nos termos do § 8o do art. 226 da Constituição Federal, da Convenção sobre a Eliminação de Todas as Formas de Violência contra a Mulher, da Convenção Interamericana para Prevenir, Punir e Erradicar a Violência contra a Mulher e de outros tratados internacionais ratificados pela República Federativa do Brasil; dispõe sobre a criação dos Juizados de Violência Doméstica e Familiar contra a Mulher; e estabelece medidas de assistência e proteção às mulheres em situação de violência doméstica e familiar.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 2o</b> Toda mulher, independentemente de classe, raça, etnia, orientação sexual, renda, cultura, nível educacional, idade e religião, goza dos direitos fundamentais inerentes à pessoa humana, sendo-lhe asseguradas as oportunidades e facilidades para viver sem violência, preservar sua saúde física e mental e seu aperfeiçoamento moral, intelectual e social.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 3o</b> Serão asseguradas às mulheres as condições para o exercício efetivo dos direitos à vida, à segurança, à saúde, à alimentação, à educação, à cultura, à moradia, ao acesso à justiça, ao esporte, ao lazer, ao trabalho, à cidadania, à liberdade, à dignidade, ao respeito e à convivência familiar e comunitária.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "§ 1o O poder público desenvolverá políticas que visem garantir os direitos humanos das mulheres no âmbito das relações domésticas e familiares no sentido de resguardá-las de toda forma de negligência, discriminação, exploração, violência, crueldade e opressão.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "§ 2o Cabe à família, à sociedade e ao poder público criar as condições necessárias para o efetivo exercício dos direitos enunciados no caput.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 4o</b> Na interpretação desta Lei, serão considerados os fins sociais a que ela se destina e, especialmente, as condições peculiares das mulheres em situação de violência doméstica e familiar.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#444;padding-bottom:4px;\">TÍTULO II</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#999;padding-bottom:4px;\">DA VIOLÊNCIA DOMÉSTICA E FAMILIAR CONTRA A MULHER</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#999;padding-bottom:4px;\">DISPOSIÇÕES GERAIS</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 5o</b> Para os efeitos desta Lei, configura violência doméstica e familiar contra a mulher qualquer ação ou omissão baseada no gênero que lhe cause morte, lesão, sofrimento físico, sexual ou psicológico e dano moral ou patrimonial: (Vide Lei complementar nº 150, de 2015)";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "I - no âmbito da unidade doméstica, compreendida como o espaço de convívio permanente de pessoas, com ou sem vínculo familiar, inclusive as esporadicamente agregadas;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "II - no âmbito da família, compreendida como a comunidade formada por indivíduos que são ou se consideram aparentados, unidos por laços naturais, por afinidade ou por vontade expressa;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "III - em qualquer relação íntima de afeto, na qual o agressor conviva ou tenha convivido com a ofendida, independentemente de coabitação.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "Parágrafo único. As relações pessoais enunciadas neste artigo independem de orientação sexual.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 6o</b> A violência doméstica e familiar contra a mulher constitui uma das formas de violação dos direitos humanos.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#999;padding-bottom:4px;\">DAS FORMAS DE VIOLÊNCIA DOMÉSTICA E FAMILIAR CONTRA A MULHER</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "Art. 7o São formas de violência doméstica e familiar contra a mulher, entre outras:";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "I - a violência física, entendida como qualquer conduta que ofenda sua integridade ou saúde corporal;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "II - a violência psicológica, entendida como qualquer conduta que lhe cause dano emocional e diminuição da auto-estima ou que lhe prejudique e perturbe o pleno desenvolvimento ou que vise degradar ou controlar suas ações, comportamentos, crenças e decisões, mediante ameaça, constrangimento, humilhação, manipulação, isolamento, vigilância constante, perseguição contumaz, insulto, chantagem, ridicularização, exploração e limitação do direito de ir e vir ou qualquer outro meio que lhe cause prejuízo à saúde psicológica e à autodeterminação;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "III - a violência sexual, entendida como qualquer conduta que a constranja a presenciar, a manter ou a participar de relação sexual não desejada, mediante intimidação, ameaça, coação ou uso da força; que a induza a comercializar ou a utilizar, de qualquer modo, a sua sexualidade, que a impeça de usar qualquer método contraceptivo ou que a force ao matrimônio, à gravidez, ao aborto ou à prostituição, mediante coação, chantagem, suborno ou manipulação; ou que limite ou anule o exercício de seus direitos sexuais e reprodutivos;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "IV - a violência patrimonial, entendida como qualquer conduta que configure retenção, subtração, destruição parcial ou total de seus objetos, instrumentos de trabalho, documentos pessoais, bens, valores e direitos ou recursos econômicos, incluindo os destinados a satisfazer suas necessidades;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "V - a violência moral, entendida como qualquer conduta que configure calúnia, difamação ou injúria.";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#444;padding-bottom:4px;\">TÍTULO III</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#999;padding-bottom:4px;\">DA ASSISTÊNCIA À MULHER EM SITUAÇÃO DE VIOLÊNCIA DOMÉSTICA E FAMILIAR</div>";
                    $box+= "<div class=\"box_linha\" style=\"color:#999;padding-bottom:4px;\">DAS MEDIDAS INTEGRADAS DE PREVENÇÃO</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "<b>Art. 8o</b> A política pública que visa coibir a violência doméstica e familiar contra a mulher far-se-á por meio de um conjunto articulado de ações da União, dos Estados, do Distrito Federal e dos Municípios e de ações não-governamentais, tendo por diretrizes:";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "I - a integração operacional do Poder Judiciário, do Ministério Público e da Defensoria Pública com as áreas de segurança pública, assistência social, saúde, educação, trabalho e habitação;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "II - a promoção de estudos e pesquisas, estatísticas e outras informações relevantes, com a perspectiva de gênero e de raça ou etnia, concernentes às causas, às conseqüências e à freqüência da violência doméstica e familiar contra a mulher, para a sistematização de dados, a serem unificados nacionalmente, e a avaliação periódica dos resultados das medidas adotadas;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "III - o respeito, nos meios de comunicação social, dos valores éticos e sociais da pessoa e da família, de forma a coibir os papéis estereotipados que legitimem ou exacerbem a violência doméstica e familiar, de acordo com o estabelecido no inciso III do art. 1o, no inciso IV do art. 3o e no inciso IV do art. 221 da Constituição Federal;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "IV - a implementação de atendimento policial especializado para as mulheres, em particular nas Delegacias de Atendimento à Mulher;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "V - a promoção e a realização de campanhas educativas de prevenção da violência doméstica e familiar contra a mulher, voltadas ao público escolar e à sociedade em geral, e a difusão desta Lei e dos instrumentos de proteção aos direitos humanos das mulheres;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "VI - a celebração de convênios, protocolos, ajustes, termos ou outros instrumentos de promoção de parceria entre órgãos governamentais ou entre estes e entidades não-governamentais, tendo por objetivo a implementação de programas de erradicação da violência doméstica e familiar contra a mulher;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "VII - a capacitação permanente das Polícias Civil e Militar, da Guarda Municipal, do Corpo de Bombeiros e dos profissionais pertencentes aos órgãos e às áreas enunciados no inciso I quanto às questões de gênero e de raça ou etnia;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "VIII - a promoção de programas educacionais que disseminem valores éticos de irrestrito respeito à dignidade da pessoa humana com a perspectiva de gênero e de raça ou etnia;";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"text-align:justify;padding-bottom:4px;\">";
                        $box+= "IX - o destaque, nos currículos escolares de todos os níveis de ensino, para os conteúdos relativos aos direitos humanos, à eqüidade de gênero e de raça ou etnia e ao problema da violência doméstica e familiar contra a mulher.";
                    $box+= "</div>";
                $box+= "</div>";

            return $box;
        },
        div : function()
        {
            var $box = "<div id=\"box_menu_horizontal\" style=\"width:100%; height: 30px; float: left;\">";
                    $box+= "<div class=\"menu_horizontal\">";
                        $box+=" <div class=\"menu_horizontal_bt_select\" id=\"menu_h_banner\" onclick=\"$.select_conteudo('banner');\">";
                            $box+= "<div class=\"box\">"+$ICONE.bottom('#666',17,'float:left;margin:2px 5px 0 0;')+'Evento'+"</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"menu_horizontal_bt\" id=\"menu_h_mapa\" onclick=\"$.select_conteudo('mapa');\">";
                            $box+= "<div class=\"box\" >"+$ICONE.map_pin('#666',17,'float:left;margin:2px 5px 0 0;')+'Mapa'+"</div>";
                        $box+= "</div>";
                    $box+= "</div>";
                $box+= "</div>";

            return $box;
        },
        denuncie : function()
        {
            var $box= "<div class=\"denuncie\">";
                    $box+= "<div class=\"box_linha\">";
                        $box+= "<div class=\"box\" style=\"margin-left:calc(50% - 235px);\">"+$ICONE.doc('#000',19,'float:left;margin-right:10px;')+"Tem dúvidas quanto aos seus direitos perante a lei?</div>";
                        $box+= "<div class=\"box\" style=\"width:80px;margin-left:10px;cursor:pointer;\" onclick=\"$.direitos();\"><i>Clique aqui</i></div>";
                    $box+= "</div>";
                    $box+= "<div class=\"box_linha\" style=\"margin-top:20px;\">";
                        $box+= "<div class=\"box\" style=\"margin-left:calc(50% - 250px);\">"+$ICONE.alert2('#fc3535',25,'float:left;margin-top:4px;')+"</div>";
                        $box+= "<div class=\"box\" style=\"margin:8px 0 0 10px;color:#fc3535;\">SE SUSPEITAR DE UM ABUSO, NÃO SE OMITA, LIGUE 180 E DENUNCIE</div>";
                    $box+= "</div>";
                $box+= "</div>";
                
            return $box;
        },
        mapa : function()
        {
            var $box = "<div class=\"delegacia ini\" id=\"box_mapa\" style=\"display:none;\">";
                    $box+= "<div class=\"box\" style=\"margin-bottom:10px;\">Ache a delegacia mais próxima de você.</div>";
                    $box+= "<div class=\"box_linha\" id=\"map\"></div>";
                $box+= "</div>";

            return $box;
        },
        noticias : function()
        {
            var $box = "",
                $n   = 0;

            if( is_object($EVENTOS) )
            {
                $box+= "<div class=\"box_noticia scroll\">";
                $.each($EVENTOS, function($k, $v)
                {
                    if( $n > 5)
                    {
                        $box+= "<div class=\"noticia\" onclick=\"view_evento('"+json_encode($v)+"');\">";
                            $box+= "<img src=\"view/images/banner/"+$v['banner']+"\">";
                            $box+= "<div class=\"box_linha\" style=\"width:calc(100% - 105px);font-size:12px;\"><b>"+$_TIPO[$v['id_tipo_evento']]+"</b></div>";
                            $box+= "<div class=\"box_linha\" title=\""+$v['descricao']+"\" style=\"width:calc(100% - 105px);max-height:32px;font-size:12px;font-style:italic;overflow:hidden;\">"+$v['descricao']+"</div>";
                        $box+= "</div>";
                    }
                    $n++;
                });
                $box+= "</div>";
            }
            else
            {
                $box+= "<div class=\"box_linha\" >Não existe banner cadastrado!</div>";
            }

            return $box;
        }
    };
    
    $.direitos = function()
    {
        WA_box({
                id             : "boxDireitos",
                skin           : "DROBox"   ,
                width          : "900px"    ,
                height         : "500px"    ,
                fixed          : true       ,
                transparent    : false      ,
                titulo         : "Lei Maria da Penha - Lei 11340/06 | Lei nº 11.340, de 7 de agosto de 2006",
                conteudo       : $View.direitos()
        });
    };
    
    $.opcao_evento = function($tipo, $id_usuario, $id_evento)
    {
        var $action = action_url('http://localhost/tcc/application/controller/Evento_controller.php',"action=set_vinculo&id_usuario="+$id_usuario+"&id_evento="+$id_evento+"&tipo="+$tipo);

        if( $action['result'] )
        {
            mensagem_top('ok', 'Usuário vinculado com sucesso!');
            
            $('#CONTEUDO_boxEvento').html($View.box_evento($SELECIONADO));
        }
        else
        {
            mensagem_top('erro','Erro ao vincular usuário ao evento!');
        }
    };

    $.share = function($url)
    {
        window.open($url);
    };

    $.select_conteudo = function($id)
    {
        $('.ini').css('display','none');
        $('#box_'+$id).css('display','block');
        $('.menu_horizontal_bt_select').removeClass('menu_horizontal_bt_select').addClass('menu_horizontal_bt');
        $('#menu_h_'+$id).addClass('menu_horizontal_bt_select');
    };
    
    view_evento = function($obj)
    {
        var $box = $View.box_evento($obj);
        
        WA_box({
                id             : "boxEvento",
                skin           : "DROBox"   ,
                width          : "800px"    ,
                height         : "auto"     ,
                fixed          : true       ,
                transparent    : false      ,
                titulo         : "Evento"   ,
                conteudo       : $box
        });
        
        $SELECIONADO = $obj;
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