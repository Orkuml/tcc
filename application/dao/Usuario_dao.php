<?php
/**
 * Description of usuario_dao
 * 
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Usuario_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('usuario');
    }
    
    public function get_id()
    {
        return parent::get_id();
    }
    
    public function delete_usuario($where)
    {
        return parent::delete($where);
    }
    
    public function get_usuario($campos, $where, $inner_join)
    {
        return parent::get($campos, $where, $inner_join);
    }
    
    public function set_usuario($array)
    {
        return parent::insert($array);
    }
    
    public function update_usuario($campos, $where)
    {
        return parent::update($campos, $where);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}
