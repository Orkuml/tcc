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
    
    public function aprovar_evento($values)
    {
        $DAO = $this->Evento_dao();
        
        return $DAO->update_evento("status='A'", "id_evento={$values['id_evento']}");
    }
    
    public function excluir_evento($values)
    {
        $DAO = $this->Evento_dao();
        
        return $DAO->delete_evento("id_evento={$values['id_evento']}");
    }
    /**
    * Retornar a lista de eventos
    * 
    * @author Ranniere Farias
    * 
    * @return Array
    **/
    public function get_lista($index=FALSE)
    {
        $DAO = $this->Evento_dao();
        $tmp = FALSE;

        $campos     = "evento.id_evento,evento.status,evento.id_usuario,evento.descricao,evento.id_tipo_evento,evento.banner,evento.data_evento,local_evento.logradouro,local_evento.numero,local_evento.cep,local_evento.cidade,local_evento.estado,tipo_evento.nome";
        $inner_join = array(
                        "local_evento" => "local_evento.cep=evento.cep",
                        "tipo_evento" => "tipo_evento.id_tipo_evento=evento.id_tipo_evento"
        );

        if($index)
        {
            $where    = "evento.status='A'";
            $order_by = "evento.data_evento ASC";
        }
        else
        {
            $id_usuario = !empty($_POST['id_usuario']) ? "evento.id_usuario={$_POST['id_usuario']}" : FALSE;
            $where      = ($id_usuario && !empty($_POST['status'])) ? $id_usuario." AND evento.status='{$_POST['status']}'" : "evento.status='{$_POST['status']}'";
            $order_by   = NULL;
        }

        $LISTA = $DAO->get_lista($campos, $where, $inner_join, $order_by);

        if($LISTA)
        {
            $tmp = $this->prepara_lista($LISTA);
        }

        return $tmp;
    }
    
    public function get_total($values)
    {
        $DAO = $this->Vinculo_evento_dao();

        $TOTAL = $DAO->get_lista("*","id_evento={$values['id_evento']}");

        $tmp = array('S'=>0,'N'=>0,'T'=>0);

        if( $TOTAL )
        {
            foreach($TOTAL as $OBJ)
            {
                $tmp[$OBJ->tipo] = $tmp[$OBJ->tipo] + 1;
            }
        }

        return $tmp;
    }
    
    public function get_vinculo($values)
    {
       $DAO = $this->Vinculo_evento_dao();

        $tmp = FALSE;

        $USER = $DAO->get_lista("*", "id_usuario={$values['id_usuario']} AND id_evento={$values['id_evento']}");

        if( $USER )
        {
            foreach($USER as $OBJ)
            {
                $tmp = $OBJ->tipo;
            }
        }

        return $tmp;
    }
    
    public function set_vinculo($values)
    {
        $DAO = $this->Vinculo_evento_dao();
       
        $array = array(
                    "id_usuario"    => $values['id_usuario'],
                    "id_evento"     => $values['id_evento'],
                    "tipo"          => $values['tipo'],
                    "data_cadastro" => data_atual()
        );

        return $DAO->set_vinculo($array);
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
        
        $LOCAL->set_local_evento();
        $EVENTO = $this->Evento_bean();
        $EVENTO->load_values_insert($values);

        $tmp = $EVENTO->set_evento();

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
            list($data, $hora) = explode(" ", $OBJ->data_evento);
            
            $tmp["lista"][$OBJ->id_evento] = (array) $OBJ;
            $tmp["lista"][$OBJ->id_evento]['data_evento'] = $data;
            $tmp["lista"][$OBJ->id_evento]['hora'] = substr($hora, 0, 5);
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
    
    public function Vinculo_evento_dao()
    {
        load_class('dao', 'vinculo_evento');
        
        return new Vinculo_evento_dao();
    }
}
