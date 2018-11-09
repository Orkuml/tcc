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

        $campos     = "evento.id_evento,evento.status,evento.descricao,evento.id_tipo_evento,evento.banner,evento.data_evento,local_evento.logradouro,local_evento.numero,local_evento.cep,local_evento.cidade,local_evento.estado,tipo_evento.nome";
        $inner_join = array(
                        "local_evento" => "local_evento.cep=evento.cep",
                        "tipo_evento" => "tipo_evento.id_tipo_evento=evento.id_tipo_evento"
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
    
    public function set_evento($values)
    {
        $LOCAL = $this->Local_evento_bean();
        $LOCAL->load_values_insert($values);
        
        $tmp = FALSE;
        
        if( $LOCAL->set_local_evento() )
        {
            $EVENTO = $this->Evento_bean();
            $EVENTO->load_values_insert($values);

            $tmp = $EVENTO->set_evento();
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
    
    private function prepara_lista($LISTA)
    {
        $tmp = array();
        
        foreach($LISTA as $OBJ)
        {
            $tmp["lista"][$OBJ->id_evento] = (array) $OBJ;
        }
        
        return $tmp;
    }
    
    /* O B J E C T S*/
    
    private function Evento_bean()
    {
        load_class("bean", "evento");
        
        return new Evento();
    }
    
    private function Local_evento_bean()
    {
        load_class("bean", "local_evento");
        
        return new Local_evento();
    }
    
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
