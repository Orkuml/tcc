<?php
/**
 * Description of usuario_helper
 * 
 * @author Ranniere Farias
 */
class Usuario_helper
{
    function alterar_status()
    {
        $DAO = $this->Usuario_dao();

        $status = ($_POST['status'] == 'A') ? 'B' : 'A';

        $campos = "status='{$status}'";
        $where  = "id_usuario={$_POST['id_usuario']}";

        return $DAO->update_usuario($campos, $where);
    }
    /**
    * Retornar a lista de usuários
    * 
    * @author Ranniere Farias
    * 
    * @return Array
    **/
    public function get_lista()
    {
        $DAO = $this->Usuario_dao();
        
        $tmp   = FALSE;
        
        $campos     = "usuario.id_usuario,usuario.cpf,tipo_usuario.nome AS tipo_usuario,usuario.status,"
                    . "pessoa.nome,pessoa.dt_nascimento,pessoa.sexo,contato.email";
        $inner_join = array(
                        "contato"      => "contato.id_usuario=usuario.id_usuario",
                        "pessoa"       => "pessoa.cpf=usuario.cpf",
                        "tipo_usuario" => "tipo_usuario.id_tipo_usuario=usuario.id_tipo_usuario"
        );

        $LISTA = $DAO->get_lista($campos, NULL, $inner_join);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }
        
        return $tmp;
    }
    
    public function get_usuario($values)
    {
        $DAO = $this->Usuario_dao();

        $campos     = "usuario.id_usuario,usuario.status,pessoa.nome,contato.email,contato.numero";
        $inner_join = array(
                        "contato"      => "contato.id_usuario=usuario.id_usuario",
                        "pessoa"       => "pessoa.cpf=usuario.cpf"
        );

        $where = "usuario.id_usuario={$values['id_usuario']}";

        $USER = $DAO->get_lista($campos, $where, $inner_join);

        $tmp = FALSE;

        if( $USER )
        {
            foreach($USER as $OBJ)
            {
                $tmp[$OBJ->id_usuario] = (array) $OBJ;
            }
        }

        return $tmp;
    }
    
    /**
    * Salva o usuário no banco de dados
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    public function set_usuario($values)
    {
        $tmp = FALSE;

        if( $this->set_pessoa($values) )
        {
            $USUARIO = $this->Usuario_bean();

            $USUARIO->load_values_insert($values);
            if( $USUARIO->set_usuario() )
            {
                $values['id_usuario'] = $USUARIO->getIdUsuario();

                if( $this->set_contato($values) )
                {
                    $tmp = TRUE;
                }
                else
                {
                    $this->delete_pessoa($values['cpf']);
                    $DAO->delete_usuario("cpf={$values['cpf']}");
                }
            }
            else
            {
                $this->delete_pessoa($values['cpf']);
            }
        }

        return $tmp;
    }
    /**
    * Edita os dados de um usuário no banco dados
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    public function update_usuario($values)
    {
        
    }
    
    private function set_contato($values)
    {
        $CONTATO = $this->Contato_bean();                    
        
        $CONTATO->load_values_insert($values);
        
        return $CONTATO->set_contato();
    }
    /**
    * Salva os dados de pessoa no banco de dados
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    private function set_pessoa($values)
    {
        $PESSOA = $this->Pessoa_bean();
        $PESSOA->load_values_insert($values);

        return $PESSOA->set_pessoa();
    }
    
    private function delete_pessoa($cpf)
    {
        $tmp = FALSE;
        
        $PESSOA = $this->Pessoa_dao();
        
        if( $PESSOA->delete_pessoa("cpf={$cpf}") )
        {
            $tmp = TRUE;
        }

        return $tmp;
    }
    /**
    * Prepara a lista para o formato de exibição na tela
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
            $tmp['lista'][$OBJ->id_usuario] = (array) $OBJ;
        }

        return $tmp;
    }
    
    /* O B J E C T S*/
    
    private function Contato_bean()
    {
        load_class("bean", "contato");

        return new Contato();
    }
    
    private function Usuario_dao()
    {
        load_class("dao","usuario");
        
        return new Usuario_dao();
    }
    
    private function Usuario_bean()
    {
        load_class("bean", "usuario");

        return new Usuario();
    }
    
    private function Pessoa_bean()
    {
        load_class("bean", "pessoa");

        return new Pessoa();
    }
    
    private function Pessoa_dao()
    {
        load_class("dao", "pessoa");

        return new Pessoa_dao();
    }
}
