/**
 * Description of ocorrencias_view
 *
 * @author Ranniere Farias
 */
function Ocorrencias_view()
{
    var $LOCAL = false,
        $fn = {
            monta : function()
            {
                var $box = "OCORRÊNCIAS";

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