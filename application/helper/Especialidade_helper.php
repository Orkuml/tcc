<?php
/**
 * Description of Especialidade_helper
 *
 * @author Ranniere Farias
 */
class Especialidade_helper
{
    function excluir_especialidade()
    {
        $DAO = $this->Especialista_dao();
        
        return $DAO->excluir_especialista("id_especialista={$_POST['id_especialista']}");
    }
    /**
    * Retornar a lista de especialidades
    * 
    * @author Ranniere Farias
    * 
    * @return Array or Boolean
    **/
    public function get_lista()
    {
        $DAO = $this->Especialista_dao();
        
        $id_usuario = $_POST['id_usuario'];

        $tmp = FALSE;
        
        $campos     = "especialista.id_especialista,especialidade.nome,especialidade.descricao";
        $where      = "especialista.id_usuario={$id_usuario}";
        $inner_join = array(
                        "especialidade" => "especialidade.id_especialidade=especialista.id_especialidade"
        );
        
        $LISTA = $DAO->get_lista($campos, $where, $inner_join);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }
        
        return $tmp;
    }
    /**
    * Retornar a options de especialidades
    * 
    * @author Ranniere Farias
    * 
    * @return Array or Boolean
    **/
    public function get_options()
    {
        $DAO = $this->Especialidade_dao();
        
        $tmp = FALSE;
        
        $campos = "id_especialidade, nome";
        
        $LISTA = $DAO->get_especialidade($campos);
        
        if($LISTA)
        {
            $tmp = $this->prepara_options($LISTA);
        }

        return $tmp;
    }
    /**
    * Salva no banco de dados a especialidade de um usuário
    * 
    * @author Ranniere Farias
    * 
    * @return Array or Boolean
    **/
    public function set_especialidade()
    {
        $DAO = $this->Especialista_dao();

        $tmp = FALSE;

        $id_usuario       = $_POST['id_usuario'];
        $id_especialidade = $_POST['id_especialidade'];

        if( !$DAO->get_lista("*","id_usuario={$id_usuario} AND id_especialidade={$id_especialidade}") )
        {
            $array = array(
                    "id_usuario"       => $id_usuario,
                    "id_especialidade" => $id_especialidade
            );
            
            $tmp = $DAO->set_especialista($array);
        }
        
        return $tmp;
    }
    /**
    * Prepara um array com a options de especialidade
    * 
    * @author Ranniere Farias
    * 
    * @return Array
    **/
    private function prepara_options($LISTA)
    {
        $tmp = array();

        foreach($LISTA as $OBJ)
        {
            $tmp[$OBJ->id_especialidade] = strtoupper($OBJ->nome);
        }

        return $tmp;
    }
    /**
    * Prepara a lista de especialidade
    * 
    * @author Ranniere Farias
    * 
    * @return Array
    **/
    private function prepara_lista($LISTA)
    {
        $tmp= array('lista'=>array());

        foreach($LISTA as $OBJ)
        {
            $tmp['lista'][$OBJ->id_especialista] = (array) $OBJ;
        }

        return $tmp;
    }

    /* O B J E C T S */
    private function Especialidade_dao()
    {
        load_class("dao","especialidade");

        return new Especialidade_dao();
    }
    
    private function Especialista_dao()
    {
        load_class("dao","especialista");

        return new Especialista_dao();
    }
}
