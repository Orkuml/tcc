/**
 * Description of index_view
 *
 * @author Ranniere Farias
 */
function Index_view()
{
    var $LOCAL = false,
        $fn = {
            banner : function()
            {
                var $k = 1;

                setInterval(function()
                {
                    if( $k < 5 )
                    {
                        $('#banner_img').effect('fadeOut', null, 500, function()
                        {
                            var $img = 'view/images/banner/banner'+$k+'.png';

                            $('#banner_img').attr('src', $img);
                        });
                    }
                    else
                    {
                        $k = 1;
                    }
                    $k++;
                }, 5000);
            },
            monta : function()
            {
                $View.conteudo();
                $fn.banner();
                initMap();
            }
    },
    $View = {
        banner : function()
        {
            var $box = "<div class=\"banner ini\" id=\"box_banner\">";
                    $box+= "<img src=\"view/images/banner/banner1.png\" id=\"banner_img\" onclick=\"$.view_evento(this);\">";
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
        box_evento : function()
        {
            var $box = "<div class=\"box_eventos\">";
                    $box+= "<div class=\"box_banner\">";
                        $box+= "<img src=\"view/images/banner/banner1.png\">";
                    $box+= "</div>";
                    $box+= "<div class=\"informacoes\">";
                        $box+= "<div class=\"tipo\">PALESTRA</div>";
                        $box+= "<div class=\"descricao\">Palestra com intuito de reunir e conscientizar pessoas contra o assédio sexual nas instituições privadas.</div>";
                        $box+= "<div class=\"label\">Responsável:</div>";
                        $box+= "<div class=\"val\">Ranniere Farias Carneiro</div>";
                        $box+= "<div class=\"label\">Data:</div>";
                        $box+= "<div class=\"val\">25/11/2018</div>";
                        $box+= "<div class=\"label\">Hora:</div>";
                        $box+= "<div class=\"val\">19:00</div>";
                        $box+= "<div class=\"label\">Local:</div>";
                        $box+= "<div class=\"val\">Av. Djalma Batista, 565</div>";
                        $box+= "<div class=\"label\">Cidade:</div>";
                        $box+= "<div class=\"val\">Manaus - AM</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"participar\">";
                        $box+= "<div class=\"title\">Deseja participar?</div>";
                        $box+= "<div class=\"options\" onclick=\"$.opcao_evento('S');\">"+$ICONE.acept('#70db70',17,'float:left;margin:0 5px;')+"SIM</div>";
                        $box+= "<div class=\"options\" onclick=\"$.opcao_evento('N');\">"+$ICONE.cancelar('#ff6666',17,'float:left;margin:0 5px;')+"NÃO</div>";
                        $box+= "<div class=\"options\" onclick=\"$.opcao_evento('T');\">"+$ICONE.borracha('#ffc266',17,'float:left;margin:0 5px;')+"TALVEZ</div>";
                        $box+= "<div class=\"box_linha\" style=\"margin-top:15px;\">";
                            $box+= "<div class=\"box\">"+$ICONE.acept2('#70db70',17,'float:left;margin:0 10px;')+"19</div>";
                            $box+= "<div class=\"box\">"+$ICONE.cancelar2('#ff6666',17,'float:left;margin:0 10px;')+"2 </div>";
                            $box+= "<div class=\"box\">"+$ICONE.borracha('#ffc266',17,'float:left;margin:0 10px;')+"4 </div>";
                        $box+= "</div>";
                    $box+= "</div>";
                $box+= "</div>";

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
                        $box+= $View.noticias();
                    $box+= "</div>";
                $box+= "</div>";

            $('#'+$LOCAL).html($box);
        },
        div : function()
        {
            var $box = "<div id=\"box_menu_horizontal\" style=\"width:calc(100% - 10px); height: 30px; float: left;\">";
                    $box+= "<div class=\"menu_horizontal\">";
                        $box+=" <div class=\"menu_horizontal_bt_select\" id=\"menu_h_banner\" onclick=\"$.select_conteudo('banner');\">";
                            $box+= "<div class=\"box\">"+$ICONE.home('#666',17,'float:left;margin:0 10px;')+'Banner'+"</div>";
                        $box+= "</div>";
                        $box+= "<div class=\"menu_horizontal_bt\" id=\"menu_h_mapa\" onclick=\"$.select_conteudo('mapa');\">";
                            $box+= "<div class=\"box\" >"+$ICONE.home('#666',17,'float:left;margin:0 10px;')+'Mapa'+"</div>";
                        $box+= "</div>";
                    $box+= "</div>";
                $box+= "</div>";

                $box+= "<div id=\"box_conteudo\" style=\"width:100%; float:left;margin-top:30px;\"></div>";

            return $box;
        },
        denuncie : function()
        {
            var $box = "<div class=\"denuncie\">";
                    $box+= $ICONE.alert2('#fc3535',29,'float:left;margin:2px 10px 0 5%;');
                    $box+= "<h3 style=\"margin:5px 0;color:#fc3535;\">SE SOUBER DE UM ABUSO, NÃO SE OMITA, LIGUE 180 E DENUNCIE</h3>";
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
            var $box = "<div class=\"box_linha\">";
                    $box+= "<div>noticia 1</div>";
                $box+= "</div>";
                $box+= "<div class=\"box_linha\">";
                    $box+= "<div>noticia 2</div>";
                $box+= "</div>";

            return $box;
        }
    };
    
    $.opcao_evento = function($opcao)
    {
        alert($opcao);
    };
    
    $.select_conteudo = function($id)
    {
        $('.ini').css('display','none');
        $('#box_'+$id).css('display','block');
        $('.menu_horizontal_bt_select').removeClass('menu_horizontal_bt_select').addClass('menu_horizontal_bt');
        $('#menu_h_'+$id).addClass('menu_horizontal_bt_select');
    };
    
    $.view_evento = function($obj)
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