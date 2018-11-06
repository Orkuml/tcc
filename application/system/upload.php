<?php
/**
 * Description of upload
 *
 * @author Ranniere Farias
 */
class upload
{
    private $diretorio;
    private $file_name;
    private $file_types;
    private $max_file_size;
    
    private $encript_name;
    private $type;
    private $name = FALSE;
    
    private $erro;
    private $infoFile;
    
    private $RESULT;

    public function __construct($encript_name=TRUE)
    {
        $this->load();
        
        $this->encript_name = $encript_name;
    }

    private function load()
    {
        $this->diretorio        = (isset($_POST['diretorio'])) ? trim($_POST['diretorio'], "/") : FALSE;
        $this->file_name        = $_POST['file_name'];
        $this->file_types       = $_POST['file_types'];
        $this->max_file_size    = $_POST['max_file_size'];
    }
    
    public function get_file_name() 
    {
        return $this->name;
    }

    public function set_upload() 
    {
        if($this->valida())
        {
            $this->prepend_file_name();            

            if(move_uploaded_file($_FILES[$this->file_name]['tmp_name'], "{$this->diretorio}/{$this->name}"))
            {
                $infoFile = array(
                                "result"   =>TRUE       , 
                                "name"     =>$this->name,
                                "size"     =>$_FILES[$this->file_name]['size'],
                                "type"     =>$this->type,
                                "url"      =>"{$this->diretorio}/{$this->name}",
                                "diretorio"=>$this->diretorio                    
                );

                $this->set_info_file($infoFile);
                
                $this->RESULT = array(
                                    "result"=>TRUE     ,
                                    "status"=>"success",
                                    "file"  =>$infoFile
                );

                return TRUE;
            }
            else
            {
                $this->set_erro("Erro ao enviar o arquivo.");

                $this->RESULT = array(
                                    "result"=>FALSE ,
                                    "status"=>"erro",
                                    "erro"  =>$this->get_erro()
                );

                return FALSE;
            }
        }
        else
        {
            $this->RESULT = array(
                                 "result"=>FALSE,
                                 "status"=>"erro",                                 
                                 "erro"  =>$this->get_erro()
            );
            
            return FALSE;
        }
    }
    /**
     * Seta o diretorio para onde será enviado o arquivo
     * 
     **/
    public function set_diretorio($diretorio)
    {
        $this->diretorio = trim($diretorio, "/");
    }

    public function set_file_name($file_name) 
    {
        $this->name = $file_name;
    }

    private function prepend_file_name() 
    {        
        if($this->encript_name)
        {
            $explode = explode(".", $_FILES[$this->file_name]['name']);
            $this->type = end( $explode );
            
            $this->name = create_key().".{$this->type}";
        }  
        else if($this->name)
        {
            $this->name = trim("{$this->name}",".{$this->type}").".{$this->type}";
        }
        else
        {
            $this->name = $_FILES[$this->file_name]['name'];
        }
    }
    
    private function prepend_file_size($bytes, $integer=TRUE) 
    {
        $type = ""; $total = 0;
        
        if ($bytes >= 1000000000) 
        {
            $type  = "GB";            
            $total = ($bytes / 1000000000);
        }
        else if ($bytes >= 1000000)
        {
            $type  = "MB";
            $total = ($bytes / 1000000);
        }
        else
        {
            $type  = "KB";
            $total = ($bytes / 1000);
        }
        
        return ($integer) ? ceil($total) . $type : number_format($total,2) . $type;
    }
    
    private function get_max_size()
    {
        $bytes = $this->max_file_size;
        
        return $this->prepend_file_size($bytes);
    }

    private function valida()
    {
        $this->verifica_diretorio();
        
        if(isset($_FILES[$this->file_name]))
        {
            if($_FILES[$this->file_name]['error'] == 1)
            {
                $this->set_erro("Tamanho do arquivo excede o tamanho permitido pelo servidor.");

                return FALSE;
            }
            else if($_FILES[$this->file_name]['error'] == 2)
            {
                $this->set_erro("Tamanho do arquivo excede o tamanho permitido de {$this->get_max_size()}.");

                return FALSE;
            }
            else if($_FILES[$this->file_name]['error'] == 0)
            {
                if($this->valida_file_types())
                {
                    return TRUE;
                }
                else
                {
                    $this->set_erro("Tipo de arquivo inválido.");
                    
                    return FALSE;
                }
            }
            
            return TRUE;
        }
        else 
        {
           $this->set_erro("file_name nao existe!");

            return FALSE;
        }
    }
    
    private function verifica_diretorio() 
    {
        $diretorio = "";

        $array = explode("/", $this->diretorio);

        foreach ($array as $dir)
        {
            $diretorio.= "{$dir}/";

            if(!file_exists($diretorio))
            {
                $FILE = $this->WA_file();

                if( $FILE->create_directory($diretorio) )
                {
                    $FILE->copy_file("system/index.html", "{$diretorio}index.html");
                }
            }
        }

        return TRUE;
    }
    
    private function valida_file_types()
    {
        $file_types = $this->file_types;
        
        if($file_types=="ALL")
        {
            return TRUE;
        }
        else
        {
            $exc  = explode("|", $file_types);
            $explode = explode(".", $_FILES[$this->file_name]['name']);
            $type = end($explode);
            $this->type = $type;

            return (in_array($type, $exc)) ? TRUE : FALSE;
        }
    }
    /**
     * Retorna o resultado
     * 
     * @return Json
     **/
    public function get_result($json=FALSE)
    {        
        if($json)
        {
          return json_encode($this->RESULT);  
        }
        else
        {
            return $this->RESULT;
        }
    }
    /**
     * Retorna o erro
     * 
     * @return Json
     **/
    public function get_erro() {
        return $this->erro;
    }
    /**
     * Obtem informacoes do arquivo enviado
     * 
     * @param boolean $json Define o retorno dos dados TRUE retorna como json FALSE retorna como Array
     * @return Array ou Json
     **/
    public function get_info_file($json=FALSE) {
        return ($json) ? json_encode($this->infoFile) : $this->infoFile;
    }
    
    private function set_erro($erro) {
        $this->erro = $erro;
    }

    private function set_info_file(array $info) {
        $this->infoFile = $info;
    }
    
    /*  Objects     */

    private function WA_file()
    {
        load_class('system', 'file');

        return new file();
    }
}