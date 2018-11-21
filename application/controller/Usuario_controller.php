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
    case 'alterar_status':
        load_class("helper", "Usuario");

        $HELPER = new Usuario_helper();

        $tmp = FALSE;

        if( $HELPER->alterar_status($VALUES) )
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp) ); exit;
        break;
    case 'cadastrar_usuario':
        load_class("helper", "Usuario");
        
        $HELPER = new Usuario_helper();

        $tmp = FALSE;
        
        if( $HELPER->set_usuario($VALUES) )
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp) ); exit;
        break;
    case 'editar_usuario':
        load_class("helper", "Usuario");
        
        $HELPER = new Usuario_helper();

        $tmp = FALSE;
        
        if( $HELPER->editar_usuario($VALUES) )
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp) ); exit;
        break;
    case 'get_usuario':
        load_class("helper", "Usuario");
        
        $HELPER = new Usuario_helper();

        echo json_encode( array("result"=>$HELPER->get_usuario($VALUES)) ); exit;
        break;
    case 'get_lista':
        load_class("helper", "Usuario");
        
        $HELPER = new Usuario_helper();

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
    case 'get_pessoa':
        load_class("helper", "Usuario");

        $HELPER = new Usuario_helper();

        echo json_encode(array("result"=>$HELPER->get_pessoa($VALUES))); exit;
        break;
}