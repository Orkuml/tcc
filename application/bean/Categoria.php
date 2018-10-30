<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Categoria
 *
 * @author mauri
 */
class Categoria 
{
    private $nome;
    private $descricao;
    
    public function set_categoria()
    {
        $Dao   = $this->Categoria_dao();
        $tmp   = FALSE;
        $array = $this->get_values();
        
        if($Dao->set_categoria($array))
        {
            $tmp = TRUE;
        }
        
        return $tmp;
    }
    
    public function get_values()
    {
        return array(
            'nome'     => $this->getNome(),
            'descricao'=> $this->getDescricao()
        );
    }
    
    function getNome() {
        return $this->nome;
    }

    function getDescricao() {
        return $this->descricao;
    }

    function setNome($nome) {
        $this->nome = $nome;
    }

    function setDescricao($descricao) {
        $this->descricao = $descricao;
    }
    
    /*O B J E C T S*/
    
    private function Categoria_dao()
    {
        load_class("dao", "Categoria");
        
        return new Categoria_dao();
    }
}
