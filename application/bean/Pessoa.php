<?php
/**
 * Description of pessoa
 * 
 * @author Ranniere Farias
 */
class Pessoa
{
    private $cpf;
    private $nome;
    private $dtNascimento;
    private $sexo;

    public function get_values()
    {
        $tmp = array(
                    "cpf"           => $this->getCpf(),
                    "nome"          => $this->getNome(),
                    "dt_nascimento" => $this->getDtNascimento(),
                    "sexo"          => $this->getSexo()
        );

        return $tmp;
    }

    public function load_values_insert($values)
    {
        $dt_nascimento = (!empty($values['dt_nascimento'])) ? formata_data_sql($values['dt_nascimento']) : NULL;

        $this->setCpf($values['cpf']);
        $this->setNome($values['nome']);
        $this->setSexo($values['sexo']);
        $this->setDtNascimento($dt_nascimento);
    }
    
    public function __toString()
    {
        return  "cpf           = {$this->getCpf()}".
                "nome          = {$this->getNome()}".
                "dt_nascimento = {$this->getDtNascimento()}".
                "sexo          = {$this->getSexo()}";
    }
    
    public function set_pessoa()
    {
        $MODEL = $this->Pessoa_dao();

        $values = $this->get_values();
        unset($values['id_usuario']);

        $tmp = FALSE;

        if( $MODEL->set_pessoa($values) )
        {
            $tmp = true;
        }

        return $tmp;
    }
    
    function getCpf() {
        return $this->cpf;
    }

    function getNome() {
        return $this->nome;
    }

    function getDtNascimento() {
        return $this->dtNascimento;
    }

    function getSexo() {
        return $this->sexo;
    }

    function setCpf($cpf) {
        $this->cpf = $cpf;
    }

    function setNome($nome) {
        $this->nome = $nome;
    }

    function setDtNascimento($dtNascimento) {
        $this->dtNascimento = $dtNascimento;
    }

    function setSexo($sexo) {
        $this->sexo = $sexo;
    }

    private function Pessoa_dao()
    {
        load_class('dao', 'pessoa');
        
        return new pessoa_dao();
    }
}
