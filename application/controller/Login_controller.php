<?php
/**
 * Description of login_controller
 *
 * @author Ranniere Farias
 */
include 'C:/wamp/www/tcc/application/system/helper.php';

$VALUES = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$ACTION = $VALUES['action'];

unset($VALUES['action']);

switch($ACTION)
{
    case 'login':
        load_class("helper", "login");
        
        $HELPER = new login_helper();

        echo json_encode( array("result"=>$HELPER->verifica_login()) ); exit;
        break;
    case 'logout':
        load_class("helper", "login");
        
        $HELPER = new login_helper();

        echo json_encode( array("result"=>$HELPER->logout()) ); exit;
        break;
    case 'verifica_usuario':
        load_class("helper", "login");
        
        $HELPER = new login_helper();

        $tmp   = false;
        $cache = $HELPER->get_session();

        if( $cache )
        {
            $tmp = TRUE;
        }

        echo json_encode( array("result"=>$tmp,"cache"=>$cache) ); exit;
        break;
}