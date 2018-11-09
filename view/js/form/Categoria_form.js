function Categoria_form($LOCAL)
{
    var $View = {
        monta_formulario: function()
        {
            var $box = "<div class=\"box_linha\">";
                    $box+= $View.monta_box("Nome:","nome_categoria");
                    $box+= $View.monta_box("Descrição:","descricao_categoria");
                    $box+= "<div class=\"btCadastrar\" onclick=\"$.salvar_categoria('adicionar_categoria');\" style=\"margin-left:60px;margin-top:20px;\">Cadastrar</div>";
                $box+= "</div>";
            
            return $box;
        },
        monta_box: function($label, $id)
        {
            var $box = "";
                
                $box+= "<div class=\"box_linha\" style=\"margin-bottom:5px;\">";
                
                    $box+= "<div class=\"box\" style=\"width:80px;line-height:10px;\">";
                        $box+= $label;
                    $box+= "</div>";
                    
                    $box+= "<input type=\"text\" id=\""+$id+"\" style=\"width: calc(100% - 85px);height:30px;padding-left:5px;\">";
                
                $box+= "</div>";
                
            return $box;
        }
    };
    
    this.show = function()
    {        
        $($LOCAL).html($View.monta_formulario());
    };
    
    $.salvar_categoria = function($tipo)
    {
        var $nome      = $("#nome_categoria").val(),
            $descricao = $("#descricao_categoria").val(),
            $params    = "nome="+$nome+"&descricao="+$descricao+"&action="+$tipo+"&id_usuario="+$USUARIO['usuario']['id_usuario'],
            $url       = 'http://localhost/tcc/application/controller/Categoria_controller.php';
    
        $data = action_url($url, $params);
        
        if($data['result'])
        {
            mensagem_top('ok','Categoria cadastrada com sucesso!');
            WA_box_closed('boxFormulario');
            $CATEGORIA_VIEW.show();
        }
    };
}