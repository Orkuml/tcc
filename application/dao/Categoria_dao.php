<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Categoria_dao
 *
 * @author mauri
 */

load_class('system', 'conexao');

class Categoria_dao extends Conexao
{
    public function __construct()
    {
        parent::__construct('categoria');
    }
    
    public function get_lista_categoria($campos, $where, $inner_join)
    {
        return parent::get_lista($campos, $where, $inner_join);
    }
    
    public function set_categoria($array)
    {
        return parent::insert($array);
    }
}
