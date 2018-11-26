<?php
/**
 * Description of Ocorrencia_controller
 *
 * @author Ranniere Farias
 */
include 'C:/wamp/www/tcc/application/system/helper.php';

$VALUES = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$ACTION = $VALUES['action'];

unset($VALUES['action']);

switch($ACTION)
{
    case 'cadastrar_ocorrencia':
        load_class("helper", "Ocorrencia");
        
        $HELPER = new Ocorrencia_helper();
        $tmp = FALSE;

        if($HELPER->set_ocorrencia($VALUES))
        {
            $tmp = TRUE;
        }

        echo json_encode(array("result"=>$tmp)); exit;
        break;
    case 'get_lista':
        load_class("helper", "Ocorrencia");
        
        $HELPER = new Ocorrencia_helper();

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
    case 'get_lista_mapa':
        load_class("helper", "Ocorrencia");
        
        $HELPER = new Ocorrencia_helper();

        $tmp   = FALSE;
        $array = FALSE;
        $LISTA = $HELPER->get_lista_mapa($VALUES);

        if($LISTA)
        {
            $tmp   = TRUE;
            $array = $LISTA['lista'];
        }

        echo json_encode(array("result"=>$tmp, "cache"=>$array)); exit;
        break;
}