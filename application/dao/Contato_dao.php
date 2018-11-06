<?php
/**
 * Description of Contato_dao
 *
 * @author Ranniere Farias
 */
load_class('system', 'conexao');
class Contato_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('contato');
    }
    
    public function set_contato($array)
    {
        return parent::insert($array);
    }
    
    public function update_contato($campos, $where)
    {
        return parent::update($campos, $where);
    }
}
