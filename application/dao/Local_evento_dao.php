<?php
/**
 * Description of Local_evento_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Local_evento_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('local_evento');
    }
    
    public function set_local_evento($array)
    {
        return parent::insert($array);
    }
}
