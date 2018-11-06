<?php
/**
 * Description of Contato
 *
 * @author Ranniere Farias
 */
class Contato
{
    private $idContato;
    private $email;
    private $numero;
    private $idUsuario;
    
    public function get_values()
    {
        $tmp = array(
                    "id_contato" => $this->getIdContato(),
                    "email"      => $this->getEmail(),
                    "numero"     => $this->getNumero(),
                    "id_usuario" => $this->getIdUsuario()
        );

        return $tmp;
    }

    public function load_values_insert($values)
    {
        $this->setEmail($values['email']);
        $this->setNumero(NULL);
        $this->setIdUsuario($values['id_usuario']);
    }
    
    public function set_contato()
    {
        $DAO = $this->Contato_dao();

        $values = $this->get_values();
        unset($values['id_contato']);

        $tmp = FALSE;

        if( $DAO->set_contato($values) )
        {
            $tmp = true;
        }

        return $tmp;
    }
    
    function getIdContato() {
        return $this->idContato;
    }

    function getEmail() {
        return $this->email;
    }

    function getNumero() {
        return $this->numero;
    }

    function getIdUsuario() {
        return $this->idUsuario;
    }

    function setIdContato($idContato) {
        $this->idContato = $idContato;
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setNumero($numero) {
        $this->numero = $numero;
    }

    function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }
    
    private function Contato_dao()
    {
        load_class('dao', 'contato');
        
        return new Contato_dao();
    }
}