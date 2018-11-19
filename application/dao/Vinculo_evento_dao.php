<?php
/**
 * Description of Vinculo_evento_dao
 * 
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Vinculo_evento_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('vinculo_evento');
    }
    
    public function set_vinculo($array)
    {
        return parent::insert($array);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}