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
    
    public function get_usuario($campos, $where, $inner_join)
    {
        return parent::get($campos, $where, $inner_join);
    }
    
    public function set_usuario($array)
    {
        return parent::insert($array);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}
