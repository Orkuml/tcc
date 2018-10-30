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
                var $box = "MINHA CONTA";

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