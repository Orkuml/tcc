<?php
/**
 * Description of Ocorrencia_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Ocorrencia_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('ocorrencia');
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
    
    public function get_lista_left($campos = NULL, $where = NULL, $left_join = NULL, $order_by = NULL, $limit=NULL)
    {
        return parent::get_lista_left($campos, $where, $left_join, $order_by, $limit);
    }
    
    public function set_ocorrencia($array)
    {
        return parent::insert($array);
    }
}
