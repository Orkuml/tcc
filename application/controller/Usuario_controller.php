<?php
/**
 * Description of controller
 *
 * @author Ranniere Farias
 */
include 'C:/wamp/www/tcc/application/system/helper.php';

$VALUES = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$ACTION = $VALUES['action'];

unset($VALUES['action']);

switch($ACTION)
{
    case 'cadastrar_usuario':
        load_class("helper", "usuario");
        
        $HELPER = new usuario_helper();

        $tmp = FALSE;
        
        if( $HELPER->set_usuario($VALUES) )
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp) ); exit;
        break;
    case 'get_lista':
        load_class("helper", "usuario");
        
        $HELPER = new usuario_helper();

        $tmp   = FALSE;
        $array = FALSE;
        $LISTA = $HELPER->get_lista();

        if($LISTA)
        {
            $tmp   = TRUE;
            $array = $LISTA['lista'];
        }

        echo json_encode(array("result"=>$tmp, "lista"=>$array)); exit;
        break;
}