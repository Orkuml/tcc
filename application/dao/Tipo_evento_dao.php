<?php
/**
 * Description of Tipo_evento_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Tipo_evento_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('tipo_evento');
    }
    
    public function delete_tipo_evento($where)
    {
        return parent::delete($where);
    }
    
    public function get_tipo_evento($campos, $where, $inner_join)
    {
        return parent::get($campos, $where, $inner_join);
    }
    
    public function set_tipo_evento($array)
    {
        return parent::insert($array);
    }
    
    public function update_tipo_evento($campos, $where)
    {
        return parent::update($campos, $where);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}
