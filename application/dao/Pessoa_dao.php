<?php
/**
 * Description of usuario_dao
 * 
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Pessoa_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('pessoa');
    }

    public function set_pessoa($array)
    {
        return parent::insert($array);
    }
    
    public function delete_pessoa($where)
    {
        return parent::delete($where);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}
