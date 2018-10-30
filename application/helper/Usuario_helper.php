<?php
/**
 * Description of usuario_helper
 * 
 * @author Ranniere Farias
 */
class Usuario_helper
{
    public function get_lista()
    {
        $MODEL = $this->Usuario_dao();
        
        $tmp   = FALSE;
        
        $campos     = "usuario.id_usuario,usuario.email,usuario.cpf,tipo_usuario.nome AS tipo_usuario,pessoa.nome,pessoa.dt_nascimento,pessoa.sexo";
        $inner_join = array(
                        "pessoa"       => "pessoa.cpf=usuario.cpf",
                        "tipo_usuario" => "tipo_usuario.id_tipo_usuario=usuario.id_tipo_usuario"
        );
        
        $LISTA = $MODEL->get_lista($campos, NULL, $inner_join);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }
        
        return $tmp;
    }
    
    public function set_usuario($values)
    {
        $tmp = FALSE;
        
        if( $this->set_pessoa($values) )
        {
            $USUARIO = $this->Usuario_bean();

            $USUARIO->load_values_insert($values);
            if( $USUARIO->set_usuario() )
            {
                $tmp = TRUE;
            }
        }

        return $tmp;
    }

    public function set_pessoa($values)
    {
        $tmp = FALSE;
        
        $PESSOA = $this->Pessoa_bean();
        $PESSOA->load_values_insert($values);
        
        if( $PESSOA->set_pessoa() )
        {
            $tmp = TRUE;
        }

        return $tmp;
    }

    private function prepara_lista($LISTA)
    {
        $tmp= array('lista'=>array());

        foreach($LISTA as $OBJ)
        {
            $tmp['lista'][$OBJ->id_usuario] = (array) $OBJ;
        }

        return $tmp;
    }
    
    private function Usuario_dao()
    {
        load_class("dao","usuario");
        
        return new usuario_dao();
    }
    
    private function Usuario_bean()
    {
        load_class("bean", "usuario");

        return new usuario();
    }
    
    private function Pessoa_bean()
    {
        load_class("bean", "pessoa");

        return new pessoa();
    }
}
