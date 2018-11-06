<?php
/**
 * Description of helper
 * 
 * @author Ranniere Farias
 */
function create_key()
{
    return md5(uniqid(time()));
}

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

/**
* Validade CPF (Cadastro de Pessoa F�sica)
*
* @param string $cpf CPF to validate
*
* @return  Boolean
*/
function valida_cpf($cpf)
{
    if( !preg_match("/^\d{3}\.?\d{3}\.?\d{3}\.?-?\d{2}$/", $cpf) )
    {  
       return false;
    }

   $cpf = preg_replace("/[^\d]/", '', $cpf);

    if (strlen($cpf) != 11)
    {
         return false;
    }
    elseif( in_array($cpf, array("00000000000", "11111111111",
                                  "22222222222", "33333333333",
                                  "44444444444", "55555555555",
                                  "66666666666", "77777777777",
                                  "88888888888", "99999999999")))
    {
        return false;
    } else {
        $number[0]  = intval(substr($cpf, 0, 1));
        $number[1]  = intval(substr($cpf, 1, 1));
        $number[2]  = intval(substr($cpf, 2, 1));
        $number[3]  = intval(substr($cpf, 3, 1));
        $number[4]  = intval(substr($cpf, 4, 1));
        $number[5]  = intval(substr($cpf, 5, 1));
        $number[6]  = intval(substr($cpf, 6, 1));
        $number[7]  = intval(substr($cpf, 7, 1));
        $number[8]  = intval(substr($cpf, 8, 1));
        $number[9]  = intval(substr($cpf, 9, 1));
        $number[10] = intval(substr($cpf, 10, 1));

        $sum = 10*$number[0]+9*$number[1]+8*$number[2]+7*$number[3]+
            6*$number[4]+5*$number[5]+4*$number[6]+3*$number[7]+
            2*$number[8];

        $sum -= (11*(intval($sum/11)));

        if ($sum == 0 || $sum == 1) {
            $result1 = 0;
        } else {
            $result1 = 11 - $sum;
        }

        if ($result1 == $number[9]) {
            $sum  = $number[0]*11+$number[1]*10+$number[2]*9+$number[3]*8+
                $number[4]*7+$number[5]*6+$number[6]*5+$number[7]*4+
                $number[8]*3+$number[9]*2;
            $sum -= (11*(intval($sum/11)));

            if ($sum == 0 || $sum == 1) {
                $result2 = 0;
            } else {
                $result2 = 11-$sum;
            }

            if ($result2 == $number[10]) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}