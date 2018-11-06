<?php
/**
 * Description of Evento_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Evento_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('evento');
    }
    
    public function delete_evento($where)
    {
        return parent::delete($where);
    }
    
    public function get_evento($campos, $where, $inner_join)
    {
        return parent::get($campos, $where, $inner_join);
    }
    
    public function set_evento($array)
    {
        return parent::insert($array);
    }
    
    public function update_evento($campos, $where)
    {
        return parent::update($campos, $where);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}
