<?php
/**
 * Description of Local_evento
 *
 * @author Ranniere Farias
 */
class Local_evento
{
    private $cep;
    private $numero;
    private $logradouro;
    private $cidade;
    private $estado;

    public function get_values()
    {
        $tmp = array(
                    "cep"        => $this->getCep(),
                    "numero"     => $this->getNumero(),
                    "logradouro" => $this->getLogradouro(),
                    "cidade"     => $this->getCidade(),
                    "estado"     => $this->getEstado()
        );

        return $tmp;
    }

    public function load_values_insert($values)
    {
        $this->setCep($values['cep']);
        $this->setNumero($values['numero']);
        $this->setLogradouro($values['logradouro']);
        $this->setCidade($values['cidade']);
        $this->setEstado($values['uf']);
    }

    public function set_local_evento()
    {
        $DAO = $this->Local_evento_dao();

        $values = $this->get_values();

        $tmp = FALSE;

        if( $DAO->set_local_evento($values) )
        {
            $tmp = TRUE;
        }

        return $tmp;
    }
    
    function getCep() {
        return $this->cep;
    }

    function getNumero() {
        return $this->numero;
    }

    function getLogradouro() {
        return $this->logradouro;
    }

    function getCidade() {
        return $this->cidade;
    }

    function getEstado() {
        return $this->estado;
    }

    function setCep($cep) {
        $this->cep = $cep;
    }

    function setNumero($numero) {
        $this->numero = $numero;
    }

    function setLogradouro($logradouro) {
        $this->logradouro = $logradouro;
    }

    function setCidade($cidade) {
        $this->cidade = $cidade;
    }

    function setEstado($estado) {
        $this->estado = $estado;
    }

    private function Local_evento_dao()
    {
        load_class('dao', 'local_evento');
        
        return new Local_evento_dao();
    }
}
