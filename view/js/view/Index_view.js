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
            var $box = "<div class=\"banner\">";
                    $box+= "<img src=\"view/images/banner/banner1.png\" id=\"banner_img\">";
                $box+= "</div>";
                
            return $box;
        },
        bottom : function()
        {
            var $box = "<div class=\"delegacia\">";
                    $box+= "<div class=\"box\" style=\"margin-bottom:10px;\">Ache a delegacia mais próxima de você.</div>";
                    $box+= "<div class=\"box_linha\" id=\"map\"></div>";
                $box+= "</div>";
                $box+= $View.denuncie();

            return $box;
        },
        conteudo : function()
        {
            var $box = "<div class=\"index\">";
                    $box+= "<div class=\"scroll_transparent col1\">";
                        $box+= $View.banner();
                        $box+= $View.bottom();
                    $box+= "</div>";
                    $box+= "<div class=\"col2\">";
                        $box+= $View.noticias();
                    $box+= "</div>";
                $box+= "</div>";

            $('#'+$LOCAL).html($box);
        },
        denuncie : function()
        {
            var $box = "<div class=\"denuncie\">";
                    $box+= $ICONE.alert2('#555',35,'float:left;');
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
    
    this.set_local = function($local)
    {
        $LOCAL = $local;
    };
    
    this.show = function()
    {
        $fn.monta();
    };
};