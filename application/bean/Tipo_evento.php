<?php
/**
 * Description of Tipo_evento
 * 
 * @author Ranniere Farias
 */
class Tipo_evento
{
    private $idTipoEvento;
    private $nome;
    private $descricao;
    private $idUsuario;

    public function get_values()
    {
        $tmp = array(
                    "id_tipo_evento" => $this->getIdTipoEvento(),
                    "nome"           => $this->getNome(),
                    "descricao"      => $this->getDescricao(),
                    "id_usuario"     => $this->getIdUsuario()
        );

        return $tmp;
    }

    public function load_values_insert($values)
    {
        $this->setNome(strtoupper($values['nome']));
        $this->setDescricao(strip_tags($values['descricao']));
        $this->setIdUsuario($values['id_usuario']);
    }
    
    public function __toString()
    {
        return  "id_tipo_evento = {$this->getIdTipoEvento()}".
                "nome           = {$this->getNome()}".
                "descricao      = {$this->getDescricao()}".
                "id_usuario     = {$this->getIdUsuario()}";
    }
    
    public function set_tipo_evento()
    {
        $DAO = $this->Tipo_evento_dao();

        $values = $this->get_values();
        unset($values['id_tipo_evento']);

        $tmp = FALSE;

        if( $DAO->set_tipo_evento($values) )
        {
            $tmp = true;
        }

        return $tmp;
    }

    function getIdTipoEvento() {
        return $this->idTipoEvento;
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

    function setIdTipoEvento($idTipoEvento) {
        $this->idTipoEvento = $idTipoEvento;
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
        
    private function Tipo_evento_dao()
    {
        load_class('dao', 'tipo_evento');
        
        return new Tipo_evento_dao();
    }
}
