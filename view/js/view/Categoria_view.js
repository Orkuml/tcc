function Categoria_view()
{
    var $LOCAL = false,
        $View  = {
            monta_divs_principais: function()
            {
                var $html = "<div id=\"box_menu_horizontal\" style=\"width:calc(100% - 10px); height: 30px; float: left;\">";
                        $html+= "<div class=\"menu_horizontal\">";
                            $html+=" <div class=\"menu_horizontal_bt_select\" id=\"menu_h_index\">";
                                $html+= "<div class=\"box\">"+$ICONE.home('#666',17,'float:left;margin:0 10px;')+'Início'+"</div>";
                            $html+= "</div>";
                            $html+= "<div class=\"menu_horizontal_bt\" onclick=\"$.formulario_categoria('adicionar');\" id=\"menu_h_adicionar\">";
                                $html+= "<div class=\"box\" >"+$ICONE.adicionar('#666',17,'float:left;margin:0 10px;')+'Adicionar'+"</div>";
                            $html+= "</div>";
                        $html+= "</div>";
                    $html+= "</div>";
                    
                    $html+= "<div id=\"box_conteudo\" style=\"width:100%; float:left;margin-top:30px;\"></div>";
                    
                $("#"+$LOCAL).html($html);
            },
            monta_conteudo: function()
            {
                $View.monta_divs_principais();
                $View.monta_lista();
            },
            monta_lista: function()
            {
                var $LIST   = new List("listaCategoria", "#box_conteudo");

                $LIST.set_checkbox(false);
                $LIST.set_url('http://localhost/tcc/application/controller/Categoria_controller.php');
                $LIST.set_param("action=get_lista_categoria");
                $LIST.set_paginacao(false);
//                $LIST.set_botao('');
                $LIST.define_ajax_on(false);

                $LIST.set_head("ID CATEGORIA" , "width:10%;line-height:40px;");
                $LIST.set_head("NOME"         , "width:30%;line-height:40px;");
                $LIST.set_head("DESCRIÇÃO"    , "width:50%;line-height:40px;");
                

                $LIST.style_head("float:left; width:calc(100% - 10px); margin-bottom:5px; color:#777; text-align:center; height:40px; font-size:14px;");

                $LIST.set_coluna( { id: "id_categoria" }, "width:10%;text-align:center;");
                $LIST.set_coluna( { id: "nome"         }, "width:30%;text-align:center;");
                $LIST.set_coluna( { id: "descricao"    }, "width:50%;text-align:center;");

                $LIST.set_botao('editar', {
                                                   color: "branco",
                                                   texto: "Editar",
                                                   icone : $ICONE.editar("#777",15,"float:left;margin-right:5px;"),
                                                   action: $LIST.action.box('boxEditar', {titulo:'Editar linha', fixed:true, transparent:false, url: '' }),
                                                   attr: {style:"float:left;margin-right:5px;padding:5px;"}
                        }, true);
    
                $LIST.show();                
            }
        };
        
    $.formulario_categoria = function($tipo)
    {
        include("view/js/form/Categoria_form.js");
        
        $FORM = new Categoria_form('#CONTEUDO_boxFormulario');
        
        WA_box({
            id              : "boxFormulario"  ,
            padding         : "15px"  ,
            fixed           : true  ,
            transparent     : false,
            width           : "300px",
            titulo          : "Adicionar Categoria"
        });
        
        $FORM.show();
        
        
        
    };
    
    this.set_local = function($local)
    {
        $LOCAL = $local;
    };
    
    this.show = function()
    {
        $View.monta_conteudo();
    };
}