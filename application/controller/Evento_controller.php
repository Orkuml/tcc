<?php
/**
 * Description of Evento_controller
 *
 * @author Ranniere Farias
 */

include 'C:/wamp/www/tcc/application/system/helper.php';

$VALUES = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$ACTION = $VALUES['action'];

unset($VALUES['action']);

switch($ACTION)
{
    case 'aprovar_evento':
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

        $tmp = FALSE;

        if($HELPER->aprovar_evento($VALUES))
        {
            $tmp = TRUE;
        }

        echo json_encode(array("result"=>$tmp)); exit;
        break;
    case 'cadastrar_evento':
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

        $tmp = FALSE;

        if($HELPER->set_evento($VALUES))
        {
            $tmp = TRUE;
        }

        echo json_encode(array("result"=>$tmp)); exit;
        break;
    case 'cadastrar_tipo_evento':
        load_class("helper", "tipo_evento");
        
        $HELPER = new Tipo_evento_helper();

        $tmp = FALSE;

        if($HELPER->set_tipo_evento($VALUES))
        {
            $tmp = TRUE;
        }

        echo json_encode(array("result"=>$tmp)); exit;
        break;
    case 'excluir_evento':
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

        $tmp = FALSE;

        if($HELPER->excluir_evento($VALUES))
        {
            $tmp = TRUE;
        }

        echo json_encode(array("result"=>$tmp)); exit;
        break;
    case 'get_lista':
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

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
    case 'get_lista_tipo_evento':
        load_class("helper", "tipo_evento");
        
        $HELPER = new Tipo_evento_helper();

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
        load_class("helper", "tipo_evento");
        
        $HELPER = new Tipo_evento_helper();
        
        $tmp   = FALSE;
        $LISTA = $HELPER->get_options();

        if($LISTA)
        {
            $tmp   = TRUE;
        }

        echo json_encode(array("result"=>$tmp, "cache"=>$LISTA)); exit;
        break;
    case 'get_vinculo':
        load_class("helper", "evento");

        $HELPER = new Evento_helper();

        echo json_encode(array("result"=>$HELPER->get_vinculo($VALUES))); exit;
        break;
    case 'set_vinculo':
        load_class("helper", "evento");

        $HELPER = new Evento_helper();

        echo json_encode(array("result"=>$HELPER->set_vinculo($VALUES))); exit;
        break;
    case 'get_total':
        load_class("helper", "evento");

        $HELPER = new Evento_helper();

        echo json_encode(array("result"=>$HELPER->get_total($VALUES))); exit;
        break;
    case 'lista_eventos':
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

        $tmp   = $cache = FALSE;
        $LISTA = $HELPER->get_lista(TRUE);

        if($LISTA)
        {
            $tmp   = TRUE;
            $cache = $LISTA['lista'];
        }

        echo json_encode(array("result"=>$tmp, "cache"=>$cache)); exit;
        
        break;
    case 'set_upload':
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

        $erro = NULL;

        $UPLOAD = $HELPER->upload_imagem();
        
        if( !$UPLOAD['result'] )
        {
            $erro = $HELPER->get_erro();
        }

        echo json_encode(array("result"=>$UPLOAD['result'],'file'=>$UPLOAD['file'],'erro'=>$erro)); exit;
        break;
        
    case "set_imagem":
        load_class("helper", "evento");
        
        $HELPER = new Evento_helper();

        $foto = $_POST['imagem'];
        
        $HELPER->set_imagem($foto);

       echo json_encode(array("result"=>true,"foto"=>$foto)); exit;
        break;
}