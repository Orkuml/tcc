<?php
/**
 * Description of Ocorrencia_helper
 *
 * @author Ranniere Farias
 */
class Ocorrencia_helper
{
    function get_lista()
    {
        
    }
    
    /* O B J E C T S */

    private function Ocorrencia_model()
    {
        load_class("dao", "ocorrencia");
        
        return new Ocorrencia_dao();
    }

    private function Ocorrencia()
    {
        load_class("bean", "ocorrencia");
        
        return new Ocorrencia();
    }
}
