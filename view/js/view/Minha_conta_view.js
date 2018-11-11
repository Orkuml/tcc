/**
 * Description of minha_conta_view
 *
 * @author Ranniere Farias
 */
function Minha_conta_view()
{
    var $LOCAL = false,
        $fn = {
            monta : function()
            {
                var $box = "<div class=\"box_linha\">"+$USUARIO['usuario']['nome']+"</div>";
                    $box+= "<div class=\"box_linha\">"+$USUARIO['usuario']['cpf']+"</div>";

                $('#'+$LOCAL).html($box);
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