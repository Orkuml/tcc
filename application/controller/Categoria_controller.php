<?php

include 'C:/wamp/www/tcc/application/system/helper.php';

$VALUES = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$ACTION = $VALUES['action'];

unset($VALUES['action']);

switch($ACTION)
{
    case 'adicionar_categoria':
        load_class("helper", "Categoria");

        $HELPER = new Categoria_helper();
        
        $nome      = $VALUES['nome'];
        $descricao = $VALUES['descricao'];
        
        $tmp = FALSE;
        
        if( $HELPER->set_categoria($nome, $descricao) )
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp) ); 
        break;
    case 'get_lista_categoria':
        load_class("helper", "Categoria");
        header("Content-type:application/json");
        $tmp    = FALSE;

        $HELPER = new Categoria_helper();

        $LISTA = $HELPER->get_lista_categoria();
        
        if(!empty($LISTA))
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp,"lista"=>$LISTA) ); exit;
    break;
}