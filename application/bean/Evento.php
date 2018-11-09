<?php
/**
 * Description of Evento
 *
 * @author Ranniere Farias
 */
class Evento 
{
    private $idEvento;
    private $status;
    private $banner;
    private $dataEvento;
    private $dataCadastro;
    private $descricao;
    private $idUsuario;
    private $idTipoEvento;
    private $cep;
    
    public function get_values()
    {
        $tmp = array(
                    "status"         => $this->getStatus(),
                    "banner"         => $this->getBanner(),
                    "data_evento"    => $this->getDataEvento(),
                    "data_cadastro"  => $this->getDataCadastro(),
                    "descricao"      => $this->getDescricao(),
                    "id_usuario"     => $this->getIdUsuario(),
                    "id_tipo_evento" => $this->getIdTipoEvento(),
                    "cep"            => $this->getCep()
        );
        
        return $tmp;
    }

    public function load_values_insert($values)
    {
        $this->setStatus('G');
        $this->setBanner($values['banner']);
        $this->setDataEvento(formata_data_sql($values['data_evento']));
        $this->setDataCadastro(data_atual());
        $this->setDescricao(strip_tags($values['descricao']));
        $this->setIdUsuario($values['id_usuario']);
        $this->setIdTipoEvento($values['tipo_evento']);
        $this->setCep($values['cep']);
    }

    public function set_evento()
    {
        $DAO = $this->Evento_dao();

        $values = $this->get_values();
        unset($values['id_evento']);

        $tmp = FALSE;

        if( $DAO->set_evento($values) )
        {
            $tmp = TRUE;
        }

        return $tmp;
    }
    
    function getIdEvento() {
        return $this->idEvento;
    }

    function getStatus() {
        return $this->status;
    }

    function getBanner() {
        return $this->banner;
    }

    function getDataEvento() {
        return $this->dataEvento;
    }

    function getDataCadastro() {
        return $this->dataCadastro;
    }

    function getDescricao() {
        return $this->descricao;
    }

    function getIdUsuario() {
        return $this->idUsuario;
    }

    function getIdTipoEvento() {
        return $this->idTipoEvento;
    }

    function getCep() {
        return $this->cep;
    }

    function setIdEvento($idEvento) {
        $this->idEvento = $idEvento;
    }

    function setStatus($status) {
        $this->status = $status;
    }

    function setBanner($banner) {
        $this->banner = $banner;
    }

    function setDataEvento($dataEvento) {
        $this->dataEvento = $dataEvento;
    }

    function setDataCadastro($dataCadastro) {
        $this->dataCadastro = $dataCadastro;
    }

    function setDescricao($descricao) {
        $this->descricao = $descricao;
    }

    function setIdUsuario($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    function setIdTipoEvento($idTipoEvento) {
        $this->idTipoEvento = $idTipoEvento;
    }

    function setCep($cep) {
        $this->cep = $cep;
    }

    private function Evento_dao()
    {
        load_class('dao', 'evento');
        
        return new Evento_dao();
    }
}
