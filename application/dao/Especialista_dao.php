<?php
/**
 * Description of Especialista_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Especialista_dao extends Conexao
{
     public function __construct()
    {
        parent::__construct('especialista');
    }
    
    public function excluir_especialista($where)
    {
        return parent::delete($where);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
    
    public function set_especialista($array)
    {
        return parent::insert($array);
    }
}
