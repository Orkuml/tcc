<?php
/**
 * Description of Tipo_evento_helper
 *
 * @author Ranniere Farias
 */
class Tipo_evento_helper
{
    /**
    * Retornar a lista de tipo de evento
    * 
    * @author Ranniere Farias
    * 
    * @return Array
    **/
    public function get_lista()
    {
        $DAO = $this->Tipo_evento_dao();
        
        $tmp    = FALSE;
        $campos = "id_tipo_evento,nome,descricao";

        $LISTA = $DAO->get_lista($campos);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }
        
        return $tmp;
    }
    
    public function get_options()
    {
        $DAO = $this->Tipo_evento_dao();
        
        $LISTA = $DAO->get_lista();
        
        $tmp = FALSE;
        
        if( $LISTA )
        {
            $tmp = array();
            
            foreach($LISTA as $OBJ)
            {
                $tmp[$OBJ->id_tipo_evento] = $OBJ->nome;
            }
        }
        
        return $tmp;
    }
    
    public function set_tipo_evento($values)
    {
        $tmp = FALSE;
        
        $TIPO_EVENTO = $this->Tipo_evento_bean();

        $TIPO_EVENTO->load_values_insert($values);
        if( $TIPO_EVENTO->set_tipo_evento() )
        {
            $tmp = TRUE;
        }

        return $tmp;
    }
    
    private function prepara_lista($LISTA)
    {
        $tmp= array('lista'=>array());

        foreach($LISTA as $OBJ)
        {
            $tmp['lista'][$OBJ->id_tipo_evento] = (array) $OBJ;
        }

        return $tmp;
    }
    
    /* O B J E C T S*/
    
    private function Tipo_evento_bean()
    {
        load_class("bean", "tipo_evento");
        
        return new Tipo_evento();
    }
    
    private function Tipo_evento_dao()
    {
        load_class("dao", "tipo_evento");
        
        return new Tipo_evento_dao();
    }
}
