<?php
/**
 * Description of helper
 * 
 * @author Ranniere Farias
 */
function data_atual()
{
    $obj      = new DateTimeZone('America/Manaus');
    $datetime = new DateTime();
    
    $datetime->setTimezone($obj);
    
    return $datetime->format("Y-m-d H:i:s");
}

function formata_data_sql($data_br)
{
    $box = "";
    
    if(isset($data_br) && $data_br!="")
    {
        list($dia, $mes, $ano) = explode("/", $data_br);
        
        $box.= "{$ano}-{$mes}-{$dia}";
    }    
        
    return $box;
}

function formata_data_br($data=NULL)
{
    $box = "";
    
    if(isset($data) && $data!="")
    {
         list($ano, $mes, $dia) = explode('-', $data);
            
         $box = "{$dia}/{$mes}/{$ano}";
    }
        
    return $box;
}

function load_class($type, $class)
{
    $tmp      = explode("/", $_SERVER['DOCUMENT_ROOT']);
    $document = "{$tmp[0]}/{$tmp[1]}/{$tmp[2]}/tcc/application/";
    
    switch ($type)
    {
        case "controller":
            $document.= "controller/{$class}_controller.php";
            break;
        case "bean":
            $document.= "bean/{$class}.php";
            break;
        case "dao":
            $document.= "dao/{$class}_dao.php";
            break;
        case "helper":
            $document.= "helper/{$class}_helper.php";
            break;
        case "system":
            $document.= "system/{$class}.php";
            break;
        case "view":
            $document.= "view/{$class}_view.php";
            break;
        default:
            break;
    }

    include_once $document;
}