<?php
/**
 * Description of Ocorrencia_helper
 *
 * @author Ranniere Farias
 */
class Ocorrencia_helper
{
    function get_lista()
    {
        $DAO = $this->Ocorrencia_dao();
        $tmp = FALSE;

        $campos     = "id_ocorrencia, data_ocorrencia, status, descricao, latitude, longitude, id_categoria, pessoa.cpf, pessoa.nome";
        $left_join = array(
                        "pessoa" => "pessoa.cpf=ocorrencia.cpf"
        );
        $order_by = "data_ocorrencia";

        $LISTA = $DAO->get_lista_left($campos, NULL, $left_join, $order_by);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }

        return $tmp;
    }
    
    public function set_ocorrencia($values)
    {
        $cpf = $values['cpf'];

        if( !empty($cpf) )
        {
            $DAO = $this->Pessoa_dao();
            $OBJ = $DAO->get_lista(NULL, "cpf='{$cpf}'");

            if( empty($OBJ) )
            {
                $PESSOA = $this->Pessoa_bean();
                $PESSOA->load_values_insert($values);
                $PESSOA->set_pessoa();
            }
        }
        $BEAN = $this->Ocorrencia();
        $BEAN->load_values_insert($values);

        return $BEAN->set_ocorrencia();
    }
    
    private function prepara_lista($LISTA)
    {
        $tmp = array();
        
        foreach($LISTA as $OBJ)
        {
            $tmp['lista'][$OBJ->id_ocorrencia] = (array) $OBJ;
        }

        return $tmp;
    }
    
    /* O B J E C T S */

    private function Ocorrencia_dao()
    {
        load_class("dao", "ocorrencia");
        
        return new Ocorrencia_dao();
    }

    private function Pessoa_dao()
    {
        load_class("dao", "pessoa");
        
        return new Pessoa_dao();
    }
    
    private function Pessoa_bean()
    {
        load_class("bean", "pessoa");
        
        return new Pessoa();
    }
    
    private function Ocorrencia()
    {
        load_class("bean", "ocorrencia");
        
        return new Ocorrencia();
    }
}
