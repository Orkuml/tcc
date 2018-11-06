<?php
/**
 * Description of Especialidade_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Especialidade_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('especialidade');
    }
    
    public function get_especialidade($campos, $where=NULL)
    {
        return parent::get_lista($campos, $where);
    }
    
    public function get_lista($campos = NULL, $where = NULL, $inner_join = NULL, $order_by = NULL)
    {
        return parent::get_lista($campos, $where, $inner_join, $order_by);
    }
}
