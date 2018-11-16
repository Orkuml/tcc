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
    private $cep;
    private $latitude;
    private $longitude;
    private $idCategoria;
    private $cpf;

    public function load_values_insert()
    {
        
    }

    public function set_ocorrencia()
    {
        
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

    function getCep() {
        return $this->cep;
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

    function setCep($cep) {
        $this->cep = $cep;
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
}
