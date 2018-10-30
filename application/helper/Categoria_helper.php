<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Categoria_helper
 *
 * @author Mauricio Soares
 */
class Categoria_helper 
{
    public function get_lista_categoria()
    {
        $TMP    = array();

        $CatDao = $this->Categoria_dao();
        
        $LISTA  = $CatDao->get_lista_categoria("*", NULL, NULL);

        foreach ($LISTA as $value)
        {
            $TMP[$value->id_categoria] = (array) $value;
        }

        return $TMP;
    }
    
    public function set_categoria($nome, $descricao)
    {
        $Bean = $this->Categoria();
        
        $Bean->setNome($nome);
        $Bean->setDescricao($descricao);
        
        return $Bean->set_categoria();
    }
    
    private function Categoria()
    {
        load_class("bean", "Categoria");
        
        return new Categoria();
    }
    
    private function Categoria_dao()
    {
        load_class("dao", "Categoria");

        return new Categoria_dao();
    }
}
