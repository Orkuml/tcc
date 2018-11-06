<?php
/**
 * Description of Evento_helper
 *
 * @author Ranniere Farias
 */
class Evento_helper
{
    private $dir = "C:/wamp/www/tcc/view/images/banner/";
    private $erro;
    
    public function get_erro()
    {
        return $this->erro;
    }
    /**
    * Retornar a lista de eventos
    * 
    * @author Ranniere Farias
    * 
    * @return Array
    **/
    public function get_lista()
    {
        $DAO = $this->Evento_dao();
        $tmp = FALSE;

        $campos     = "usuario.id_usuario,usuario.email,usuario.cpf,tipo_usuario.nome AS tipo_usuario,usuario.status,pessoa.nome,pessoa.dt_nascimento,pessoa.sexo";
        $inner_join = array(
                        "pessoa"       => "pessoa.cpf=usuario.cpf",
                        "tipo_usuario" => "tipo_usuario.id_tipo_usuario=usuario.id_tipo_usuario"
        );

        $LISTA = $DAO->get_lista($campos, NULL, $inner_join);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }

        return $tmp;
    }
    
    public function upload_imagem()
    {
        $name   = $_POST['file_name'];
        $upload = $this->Upload();

        $upload->set_diretorio($this->dir);
        $upload->set_file_name($name);

        $tmp = array('result'=>FALSE, 'file'=>FALSE);

        if( $upload->set_upload() )
        {
            $width   = $_POST['width'];
            $height  = $_POST['height'];
            $arquivo = $upload->get_file_name();
            
            list($img_w, $img_h) = getimagesize($this->dir.$arquivo);
            
            if($img_w >= $width && $img_h >= $height)
            {
                $tmp['result'] = TRUE;
                $tmp['file']   = $upload->get_info_file();
            }
            else
            {
                unlink($this->dir.$arquivo);
            }
        }
        else
        {
            $this->erro = $upload->get_erro();
        }

        return $tmp;
    }
    
    public function set_imagem($foto)
    {
        $IMG = $this->Imagem("{$this->dir}{$foto}");
        $IMG->set_diretorio($this->dir);
        
        list($w, $h) = getimagesize("{$this->dir}{$foto}");
        
        $IMG->set_width($w);
        $IMG->set_height($h);
        
        return $IMG->mover();
    }
    
    /* O B J E C T S*/
    
    private function Evento_dao()
    {
        load_class("dao", "evento");
        
        return new Evento_dao();
    }
    
    public function Upload($encript=TRUE)
    {
        load_class('system', 'upload');
        
        return new upload($encript);
    }
    
    private function Imagem($url_imagem)
    {
        load_class('system', 'imagem');
        
        return new imagem($url_imagem);
    }
}
