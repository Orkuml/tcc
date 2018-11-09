<?php
/**
 * Description of pessoa
 * 
 * @author Maurício Soares
 */
class Categoria 
{
    private $nome;
    private $descricao;
    private $idUsuario;
    
    public function set_categoria()
    {
        $DAO   = $this->Categoria_dao();
        $tmp   = FALSE;
        $array = $this->get_values();
        
        if($DAO->set_categoria($array))
        {
            $tmp = TRUE;
        }
        
        return $tmp;
    }
    
    public function get_values()
    {
        return array(
            'nome'       => $this->getNome(),
            'descricao'  => $this->getDescricao(),
            'id_usuario' => $this->getIdUsuario()
        );
    }
    
    function getNome() {
        return $this->nome;
    }

    function getDescricao() {
        return $this->descricao;
    }

    function getIdUsuario() {
        return $this->idUsuario;
    }

    function setNome($nome) {
        $this->nome = $nome;
    }

    function setDescricao($descricao) {
        $this->descricao = $descricao;
    }

    function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    /*O B J E C T S*/
    
    private function Categoria_dao()
    {
        load_class("dao", "Categoria");
        
        return new Categoria_dao();
    }
}
