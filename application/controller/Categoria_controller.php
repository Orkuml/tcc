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

        $tmp = FALSE;
        
        if( $HELPER->set_categoria($VALUES) )
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
    case 'get_options':
        load_class("helper", "Categoria");
        
        $HELPER = new Categoria_helper();
        
        $tmp   = FALSE;
        $LISTA = $HELPER->get_options();

        if($LISTA)
        {
            $tmp   = TRUE;
        }

        echo json_encode(array("result"=>$tmp, "cache"=>$LISTA)); exit;
        break;
}