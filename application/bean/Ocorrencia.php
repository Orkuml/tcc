<?php
/**
 * Description of Ocorrencia
 * 
 * @author Ranniere Farias
 */
class Ocorrencia
{
    private $idOcorrencia;
    private $dataOcorrencia;
    private $dataCadastro;
    private $status;
    private $descricao;
    private $latitude;
    private $longitude;
    private $idCategoria;
    private $cpf;

    public function get_values()
    {
        $tmp = array(
                    "data_ocorrencia" => $this->getDataOcorrencia(),
                    "data_cadastro"   => $this->getDataCadastro(),
                    "status"          => $this->getStatus(),
                    "descricao"       => $this->getDescricao(),
                    "latitude"        => $this->getLatitude(),
                    "longitude"       => $this->getLongitude(),
                    "id_categoria"    => $this->getIdCategoria(),
                    "cpf"             => $this->getCpf()
        );

        return $tmp;
    }
    
    public function load_values_insert($values)
    {
        $this->setDataOcorrencia(formata_data_sql($values['data_ocorrencia']));
        $this->setDataCadastro(data_atual());
        $this->setStatus('A');
        $this->setDescricao(strip_tags($values['descricao']));
        $this->setLatitude($values['latitude']);
        $this->setLongitude($values['longitude']);
        $this->setIdCategoria($values['categoria']);
        $this->setCpf($values['cpf']);
    }

    public function set_ocorrencia()
    {
        $DAO = $this->Ocorrencia_dao();

        $values = $this->get_values();
        if( empty($values['cpf']) ){ unset($values['cpf']); }

        $tmp = FALSE;

        if( $DAO->set_ocorrencia($values) )
        {
            $tmp = TRUE;
        }

        return $tmp;
    }

    function getIdOcorrencia() {
        return $this->idOcorrencia;
    }

    function getDataOcorrencia() {
        return $this->dataOcorrencia;
    }

    function getDataCadastro() {
        return $this->dataCadastro;
    }

    function getStatus() {
        return $this->status;
    }

    function getDescricao() {
        return $this->descricao;
    }

    function getLatitude() {
        return $this->latitude;
    }

    function getLongitude() {
        return $this->longitude;
    }

    function getIdCategoria() {
        return $this->idCategoria;
    }

    function getCpf() {
        return $this->cpf;
    }

    function setIdOcorrencia($idOcorrencia) {
        $this->idOcorrencia = $idOcorrencia;
    }

    function setDataOcorrencia($dataOcorrencia) {
        $this->dataOcorrencia = $dataOcorrencia;
    }

    function setDataCadastro($dataCadastro) {
        $this->dataCadastro = $dataCadastro;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setDescricao($descricao) {
        $this->descricao = $descricao;
    }

    function setLatitude($latitude) {
        $this->latitude = $latitude;
    }

    function setLongitude($longitude) {
        $this->longitude = $longitude;
    }

    function setIdCategoria($idCategoria) {
        $this->idCategoria = $idCategoria;
    }

    function setCpf($cpf) {
        $this->cpf = $cpf;
    }
    
    private function Ocorrencia_dao()
    {
        load_class('dao', 'ocorrencia');
        
        return new Ocorrencia_dao();
    }
}
