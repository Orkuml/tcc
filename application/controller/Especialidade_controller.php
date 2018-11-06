<?php
/**
 * Description of Especialidade_controller
 *
 * @author Ranniere Farias
 */
include 'C:/wamp/www/tcc/application/system/helper.php';

$VALUES = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$ACTION = $VALUES['action'];

unset($VALUES['action']);

switch($ACTION)
{
    case 'excluir_especialidade':
        load_class("helper", "especialidade");
        
        $HELPER = new Especialidade_helper();

        echo json_encode(array("result"=>$HELPER->excluir_especialidade())); exit;
        break;
    case 'get_lista':
        load_class("helper", "especialidade");
        
        $HELPER = new Especialidade_helper();

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
    case 'get_options':
        load_class("helper", "especialidade");
        
        $HELPER = new Especialidade_helper();
        
        $tmp   = FALSE;
        $cache = $HELPER->get_options();

        if($cache)
        {
            $tmp   = TRUE;
        }

        echo json_encode(array("result"=>$tmp, "cache"=>$cache)); exit;
        break;
    case 'set_especialidade':
        load_class("helper", "especialidade");
        
        $HELPER = new Especialidade_helper();

        echo json_encode(array("result"=>$HELPER->set_especialidade())); exit;
        break;
}
