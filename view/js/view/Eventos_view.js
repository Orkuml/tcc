/**
 * Description of usuarios_view
 *
 * @author Ranniere Farias
 */
function Eventos_view()
{
    var $LOCAL = false,
        $fn = {
            monta : function()
            {
                var $box = "EVENTOS";

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