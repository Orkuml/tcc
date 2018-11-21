<?php
/**
 * Description of Categoria_helper
 *
 * @author Mauricio Soares
 */
class Categoria_helper 
{
    /**
    * Retornar a lista de categoria
    * 
    * @author Mauricio Soares
    * 
    * @return Array
    **/
    public function get_lista_categoria()
    {
        $TMP    = array();

        $CatDao = $this->Categoria_dao();
        
        $LISTA  = $CatDao->get_lista_categoria("*", NULL, NULL);

        foreach ($LISTA as $value)
        {
            $TMP[$value->id_categoria] = (array) $value;
        }

        return $TMP;
    }
    
    public function get_options()
    {
        $DAO = $this->Categoria_dao();
        
        $LISTA = $DAO->get_lista();
        
        $tmp = FALSE;
        
        if( $LISTA )
        {
            $tmp = array();
            
            foreach($LISTA as $OBJ)
            {
                $tmp[$OBJ->id_categoria] = strtoupper($OBJ->nome);
            }
        }
        
        return $tmp;
    }
    
    /**
    * Salva a categoria no banco de dados
    * 
    * @author Mauricio Soares
    * 
    * @return Array
    **/
    public function set_categoria($VALUES)
    {
        $nome       = $VALUES['nome'];
        $descricao  = $VALUES['descricao'];
        $id_usuario = $VALUES['id_usuario'];
        
        $BEAN = $this->Categoria();
        
        $BEAN->setNome($nome);
        $BEAN->setDescricao($descricao);
        $BEAN->setIdUsuario($id_usuario);
        
        return $BEAN->set_categoria();
    }
    
    /* O B J E C T S */
    
    private function Categoria()
    {
        load_class("bean", "Categoria");
        
        return new Categoria();
    }
    
    private function Categoria_dao()
    {
        load_class("dao", "Categoria");

        return new Categoria_dao();
    }
}
