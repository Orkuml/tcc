<?php
/**
 * Description of usuario
 * 
 * @author Ranniere Farias
 */
load_class('bean', 'pessoa');
class Usuario extends Pessoa
{
    private $idUsuario;
    private $login;
    private $senha;
    private $cpf;
    private $status;
    private $idTipoUsuario;

    public function get_values()
    {
        $tmp = array(
                    "id_usuario"      => $this->getIdUsuario(),
                    "login"           => $this->getLogin(),
                    "senha"           => $this->getSenha(),
                    "cpf"             => $this->getCpf(),
                    "status"          => $this->getStatus(),
                    "id_tipo_usuario" => $this->getIdTipoUsuario()
        );

        return $tmp;
    }

    public function load_values_insert($values)
    {
        $this->setLogin($values['login']);
        $this->setSenha(md5($values['senha']));
        $this->setCpf($values['cpf']);
        $this->setStatus('A');
        $this->setIdTipoUsuario($values['tipo_usuario']);
    }

    public function set_usuario()
    {
        $DAO = $this->Usuario_dao();

        $values = $this->get_values();
        unset($values['id_usuario']);

        $tmp = FALSE;

        if( $DAO->set_usuario($values) )
        {
            $this->setIdUsuario($DAO->get_id());
            $tmp = TRUE;
        }

        return $tmp;
    }

    public function __toString()
    {
        return "id_usuario       = {$this->getIdUsuario()}".
                "login           = {$this->getLogin()}".
                "senha           = {$this->getCpf()}".
                "cpf             = {$this->getCpf()}".
                "status          = {$this->getStatus()}".
                "id_tipo_usuario = {$this->getIdTipoUsuario()}";
    }
    
    function getIdUsuario() {
        return $this->idUsuario;
    }

    function getLogin() {
        return $this->login;
    }

    function getSenha() {
        return $this->senha;
    }

    function getCpf() {
        return $this->cpf;
    }

    function getStatus() {
        return $this->status;
    }

    function getIdTipoUsuario() {
        return $this->idTipoUsuario;
    }

    function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    function setLogin($login) {
        $this->login = $login;
    }

    function setSenha($senha) {
        $this->senha = $senha;
    }

    function setCpf($cpf) {
        $this->cpf = $cpf;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setIdTipoUsuario($idTipoUsuario) {
        $this->idTipoUsuario = $idTipoUsuario;
    }
            
    private function Usuario_dao()
    {
        load_class('dao', 'usuario');
        
        return new usuario_dao();
    }
}
