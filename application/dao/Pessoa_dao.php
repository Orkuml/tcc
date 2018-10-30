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
}
