<?php
/**
 * Description of imagem
 *
 * @author Ranniere Farias
 */
class imagem 
{
    private $image_library          = 'gd2';	// Biblioteca do php:  imagemagick, netpbm, gd, gd2
    
    private $path                   = '';
    private $diretorio              = '';
    private $diretorio_old          = '';
    private $diretorio_thumb        = FALSE;
    
    private $image_name_old         = FALSE;
    private $image_name_new         = FALSE;
    
    private $width                  = NULL;
    private $height                 = NULL;
    
    private $width_original         = 0;
    private $height_original        = 0;
    
    private $width_thumb            = NULL;
    private $height_thumb           = NULL;
    
    private $imagem_type;
    private $mime_type;

    private $quality                = 80;

    private $url_imagem;
    private $file_name;
    
    private $x = 0;
    private $y = 0;

    private $erro;

    public function __construct($url_imagem)
    {
        $this->url_imagem = $url_imagem;
        $this->file_name  = $url_imagem;
    }
    
    private function start($resize=TRUE) 
    {                    
        $this->prepara_propriedade_image();
        $this->prepara_diretorio();
        
        if($resize)
        {
            $this->prepara_dimensoes();
        }        
    }
    /**
     * Recorta um imagem conforme as configuracoes informadas
     * 
     * @param boolean $salvar TRUE : Salva no diretorio informado FALSE : exibe a imagem
     * @return boolean TRUE or FALSE
     **/
    public function crop($salvar=TRUE)
    {
        if(isset($this->width) && isset($this->height))
        {
            $this->start(FALSE);

            $this->width_original  = $this->width;
            $this->height_original = $this->height;
            
            return $this->prepara_imagem($salvar);
        }
        else
        {
            $this->set_erro("crop()", "Informe o <b>width</b> e <b>height</b>");
            
            return FALSE;
        }
    }
    /**
     * Redimensiona um imagem conforme as configuracoes informadas
     * 
     * @param boolean $salvar TRUE : Salva no diretorio informado FALSE : exibe a imagem
     * @return boolean TRUE or FALSE
     **/
    public function resize($salvar=TRUE)
    {
        if(isset($this->width) && isset($this->height))
        {
            $this->start();

            return $this->prepara_imagem($salvar);
        }
        else
        {
            $this->set_erro("resize()", "Informe o <b>width</b> e <b>height</b>");
            
            return FALSE;
        }
    }
    /**
     * Move a imagem para o diretorio especificado
     * 
     * @access public
     * @return boolean
     **/
   public function mover() 
   {
       $tmp = FALSE;
       
       if(file_exists($this->url_imagem))
       {
           $this->prepara_diretorio();
           
           $file_name = "{$this->diretorio}/{$this->image_name_new}";
           
           if(@copy($this->url_imagem, $file_name))
           {
               if(isset($this->width_thumb) && isset($this->height_thumb))
               {
                   $this->create_thumb();
               }

               $tmp = TRUE;
               $this->file_name = $file_name;
           }
       }

       return $tmp;
   }
   
   public function drop($file_imagem) 
   {
       return unlink($file_imagem);
   }
    /**
     * Prepara a imagem e salva no local determinado
     * 
     * @access private
     * @return boolean TRUE or FALSE
     **/
    private function prepara_imagem($salvar=TRUE) 
    {
        // Cria a imagem
        if(! ($src_img = $this->create_imagem_gd()) )
        {
            return FALSE;
        }            
            
        if($this->image_library == 'gd2' AND function_exists('imagecreatetruecolor'))
        {
            $create	= 'imagecreatetruecolor';
            $copy	= 'imagecopyresampled';
        }
        else
        {
            $create	= 'imagecreate';
            $copy	= 'imagecopyresized';
        }

        $new_width  = $this->width;
        $new_height = $this->height;
            
        $img = $create($new_width, $new_height);
            
        if($this->imagem_type=="png") // Caso a imagem for do tipo png o fundo fica transparent
        {
            imagealphablending($img, FALSE);
            imagesavealpha($img, TRUE);
        }

        $x = $this->x;
        $y = $this->y;

        $copy($img, $src_img, 0, 0, $x, $y, $new_width, $new_height, $this->width_original, $this->height_original);
            
        if($salvar)
        {                
            if( ! $this->imagem_save_gd($img) )
            {
                return FALSE;
            }
            else
            {
                if(isset($this->width_thumb) && isset($this->height_thumb))
                {
                    $this->create_thumb();
                 }
             }
         }
         else
         {
            $this->imagem_display_gd($img);
         }
            
         imagedestroy($img);
         imagedestroy($src_img);

         return TRUE;
    }
    
    private function create_thumb() 
    {
        $thumb = new imagem($this->url_imagem);
                    
        $diretorio = ($this->diretorio_thumb) ? $this->diretorio_thumb : "{$this->diretorio}/thumbs";
        
        $thumb->set_diretorio($diretorio);

        $thumb->set_width($this->width_thumb);
        $thumb->set_height($this->height_thumb);

        return $thumb->resize();
    }
    /**
     * Cria a imagem usando a Biblioteca GD2 do PHP
     * 
     * @access private
     * @return boolean TRUE or FALSE
     **/
    private function create_imagem_gd() 
    {
        $file_img = "{$this->path}/{$this->diretorio_old}/{$this->image_name_old}";
        
        switch ($this->imagem_type) {
            case "jpeg":
                if ( ! function_exists('imagecreatefromjpeg'))
		{
                    $this->set_erro("create_imagem_gd()", "Biblioteca <b>imagecreatefromjpeg</b> nao suportada, verifique a configuracao no php.ini");
                    
                    return FALSE;
                }            
                return imagecreatefromjpeg($file_img);
                break;
            case "gif":
                if ( ! function_exists('imagecreatefromgif'))
                {
                    $this->set_erro("create_imagem_gd()", "Biblioteca <b>imagecreatefromgif</b> nao suportada, verifique a configuracao no php.ini");
                    
                    return FALSE;
                }
                return imagecreatefromgif($file_img);
                break;
            case "png":
                if ( ! function_exists('imagecreatefrompng'))
                {
                    $this->set_erro("create_imagem_gd()", "Biblioteca <b>imagecreatefrompng</b> nao suportada, verifique a configuracao no php.ini");
                    
                    return FALSE;
                }
                return imagecreatefrompng($file_img);
                break;            
        }
        
        $this->set_erro("create_imagem_gd()", "Tipo de imagem invalida.");
        
        return FALSE;
    }
   /**
    * Mostra a imagem criada
    *
    * @access private
    * @param    $src_img Imagem criada
    * @return	void
    **/
    private function imagem_display_gd($src_img)
    {
	header("Content-Disposition: filename={$this->url_imagem};");
	header("Content-Type: {$this->mime_type}");
	header('Content-Transfer-Encoding: binary');
	header('Last-Modified: '.gmdate('D, d M Y H:i:s', time()).' GMT');

	switch ($this->image_type)
	{
            case 'gid':
                imagegif($src_img);
            break;
            case 'jpeg':
                imagejpeg($src_img, '', $this->quality);
            break;
            case 'png':	
                imagepng($src_img);
            break;
            default:	
                echo 'Erro image';
            break;
	}
    }
    /**
     * Salva a imagem no diretorio
     * 
     * @access private
     * @param $src_img Imagem criada
     * @return boolean 
     **/
    private function imagem_save_gd($src_img)
    {       
        $tmp      = TRUE;
        $file_img = "{$this->path}/{$this->diretorio}/{$this->image_name_new}";
        
        switch ($this->imagem_type)
	{
            case 'gif' :
		if ( ! function_exists('imagegif'))
		{
                    $this->set_erro("save_image_gd()", "Biblioteca <b>GD2 - imagegif</b>nao suportada, verifique a configuracao no php.ini");
                    
                    $tmp = FALSE;
		}
		elseif ( ! imagegif($src_img, $file_img))
		{
                    $this->set_erro("save_image_gd()", "Erro ao salvar a imagem imagegif.");                    
                    
                    $tmp = FALSE;
		}
		break;
            case 'jpeg':
		if ( ! function_exists('imagejpeg'))
		{
                    $this->set_erro("save_image_gd()", "Biblioteca <b>GD2 - imagejpeg</b>nao suportada, verifique a configuracao no php.ini");
                    
                    $tmp = FALSE;
                }
		else if ( ! imagejpeg($src_img, $file_img, $this->quality ))
		{
                    $this->set_erro("save_image_gd()", "Erro ao salvar a imagem imagejpeg.");    
                    
                    $tmp = FALSE;
		}
		break;
            case 'png':
		if ( ! function_exists('imagepng'))
		{
                    $this->set_erro("save_image_gd()", "Biblioteca <b>GD2 - imagepng</b>nao suportada, verifique a configuracao no php.ini");
                    
                    $tmp = FALSE;
		}
		else if (! imagepng($src_img, $file_img))
		{
                    $this->set_erro("save_image_gd()", "Erro ao salvar a imagem imagepng.");    
                    
                    $tmp = FALSE;
		}
		break;
            default:
                    $this->set_erro("save_image_gd()", "Biblioteca <b>GD2</b>nao suportada, verifique a configuracao no php.ini");
                
                    $tmp = FALSE;
		break;
	}

        if($tmp)
        {
            $this->file_name = "{$this->diretorio}/{$this->image_name_new}";
        }
        
	return $tmp;
    }
    /**
     * Prepara o tipo de imagem
     * 
     * @access private
     * @param int $num_imagem
     * @return void 
     **/
    private function prepara_propriedade_image() 
    {
        $types = array(1 => 'gif', 2 => 'jpeg', 3 => 'png');

        $_INFO = @getimagesize($this->url_imagem);
        
        $this->width_original  = $_INFO[0];
        $this->height_original = $_INFO[1];

        $this->mime_type       = $_INFO['mime'];
        $this->imagem_type     = $types[ $_INFO[2] ];
    }    
    /**
     * Prepara as configuracoes dos diretorios
     * 
     * @access private
     * @return void 
     **/
    private function prepara_diretorio() 
    {
        $url_image = $this->url_imagem;

        $array = explode("/", $url_image);

        $this->image_name_old = end($array);
        $this->image_name_new = ($this->image_name_new) ? $this->image_name_new : $this->image_name_old;
        $this->diretorio_old  = trim(str_replace("{$this->image_name_old}", "", $url_image), "/");

        $this->path           = trim( str_replace($url_image, "", str_replace("\\", "/", realpath($url_image))), "/");
        
        $tmp = explode("/", $this->path);
        
        if($tmp[0]=="home")
        {
            $this->path = "/{$this->path}";
        }
    }
    /**
     * Prepara as configuracoes das dimensoes da imagem
     * 
     * @access private
     * @return void 
     **/
    private function prepara_dimensoes() 
    {
        $new_width	= ceil( ($this->width_original * $this->height) / $this->height_original );
        $new_height	= ceil( ($this->width * $this->height_original) / $this->width_original );
        
        $ratio = (($this->height_original / $this->width_original) - ($this->height/$this->width));
        
        $redimensiona = ($ratio < 0) ? 'height' : 'width';
        
        if (($this->width != $new_width) AND ($this->height != $new_height))
        {
            if ($redimensiona == 'height')
            {
                $this->width  = $new_width;
            }
            else
            {
		$this->height = $new_height;
            }
	}
    }

    public function get_info_imagem($json=FALSE)
    {
        $tmp = @getimagesize($this->file_name);

        if(is_array($tmp))
        {
            $tmp = array(
                        'width' =>$tmp[0],
                        'height'=>$tmp[1],
                        'bits'  =>$tmp['bits'],
                        'mime'  =>$tmp['mime'],
                        'type'  =>end(explode("/", $tmp['mime'])),
                        'date'  =>filemtime($this->file_name)   ,
                        'name'  =>end(explode("/", $this->file_name))
            );

            return ($json) ? json_encode($tmp) :  $tmp;
        }        
        else
        {
            return FALSE;
        }        
    }    
    /**
     * Retorna algum erro ocorrido
     * 
     * @return void 
     **/
    public function get_erro() {
        return $this->erro;
    }    
    /**
     * Define o Tipo de Biblioteca a ser usado para gerar a nova imagem por DEFAULT DG2
     * 
     * @param String $image_library
     * @return void 
     **/
    public function set_image_library($image_library) {
        $this->image_library = $image_library;
    }
    /**
     * Define o diretorio para onde sera enviado a imagem
     * 
     * @param String $diretorio
     * @return void 
     **/
    public function set_diretorio($diretorio) 
    {
        $this->diretorio = trim($diretorio, "/");
    }

    public function set_diretorio_thumb($diretorio)
    {
        $this->diretorio_thumb = trim($diretorio, "/");
    }
    /**
     * Define a largura da imagem
     * 
     * @param Int $width
     * @return void 
     **/
    public function set_width($width) {
        $this->width = $width;
    }
    /**
     * Define a altura da imagem
     * 
     * @param Int $height
     * @return void 
     **/
    public function set_height($height) {
        $this->height = $height;
    }
    /**
     * Define a largura do thumb Miniatura da imagem real
     * 
     * @param Int $width
     * @return void 
     **/
    public function set_width_thumb($width) {
        $this->width_thumb = $width;
    }
    /**
     * Define a altura do thumb Miniatura da imagem real
     * 
     * @param Int $height
     * @return void 
     **/
    public function set_height_thumb($height) {
        $this->height_thumb = $height;
    }
    /**
     * Define a qualidade da imagem
     * 
     * @param Int $quality
     * @return void 
     **/
    public function set_quality($quality) {
        $this->quality = $quality;
    }
    /**
     * Define a posicao no eixo X da imagem
     * 
     * @param Int $x
     * @return void 
     **/
    public function set_x($x) {
        $this->x = $x;
    }
    /**
     * Define a posicao no eixo Y da imagem
     * 
     * @param Int $y
     * @return void 
     **/
    public function set_y($y) {
        $this->y = $y;
    }
    /**
     * Seta o novo nome da imagem que vai ser criada
     * 
     * @param String $imagem_name
     * @return void 
     **/
    public function set_imagem_name($imagem_name)
    {
        $this->image_name_new = $imagem_name;
    }
    
    private function set_erro($titulo, $erro) {
        $box = "-------------------------------------------<br/>";
            $box.= "<b>ERROR:</b> imagem - {$titulo}<br/>";
        $box.= "-------------------------------------------<br/>";

        $box.= "<p>{$erro}</p>";

        $this->erro = $box;
    }
}