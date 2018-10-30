/* global $WA, $DRO */
function List($ID, $LOCAL)
{
    var $ID_OBJECT = false,
        $_BUSCADOR = [],
        $_FILTRO = [],
        $_CHECKBOX = true,
        $_CHECKBOX_COLOR = "WA_check_preto",
        $_CHECKBOX_HEAD  = "margin:5px 0 5px 10px;",
        $_CHECKBOX_STYLE = "margin:5px 0 0 10px;",
        $_SEPARADOR = " ",
        $_NUM_PAGINACAO = 5,
        $_LIMIT = 20,
        $_HASHTAG = true,
        $_PARAMS = false,
        $AJAX_ON = true,
        $LISTA = false,
        $PAGINACAO = false,
        $SUSPENSO = true,
        $URL = false,
        $PAG = 1,
        $AUX = $_NUM_PAGINACAO,
        $TOTAL = 0,
        $SKIN = "WA_lista",
        $_BOTAO = [],
        $_HEAD = [],
        $_COLUNAS = [],
        $_STYLE = { head: false, cols: false },        
        $Get = {
                lista: function()
                {
                    var $tmp = false,
                        $_GET = action_url($URL, ($fn.calcula_limite() + $Get.params()));

                    if($_GET)
                    {
                        $TOTAL = $_GET['total'];

                        $tmp = $_GET['lista'];
                    }

                    return $tmp;
                },
                params: function()
                {
                    var $tmp = "";

                    if( $_HASHTAG )
                    {
                        $tmp+= "&"+$fn.hashtag();
                    }

                    if( $_PARAMS )
                    {
                        $tmp+= '&'+$_PARAMS;
                    }

                    return $tmp;
                }
        },
        $Prepara = {
                    icone:function($icone)
                    {
                        var $box = "";

                        if(is_valid($icone))
                        {
                            $box = $icone;
//                            $box = $ICONE[$icone.tipo]($icone.color,17,$icone.config);
                        }
                        
                        return $box;
                    }
        },
        $Filtro = {
                    buscador: function($obj)
                    {
                        var $config = $obj['config'],
                            $attr = "",
                            $tipo = "keyup",
                            $style_box = "";

                         if(is_valid($config))
                         {
                             $attr = (is_valid($config['attr'])) ? attr($config['attr']) : "";
                             $icone = $Prepara.icone($config['icone']);                                

                             if(is_valid($config['style_box']))
                             {
                                 $style_box = "style=\"" + $config['style_box'] + "\"";
                             }

                             if(is_valid($config['tipo_busca']))
                             {
                                 $tipo = $config['tipo_busca'];
                             }

                             $_BUSCADOR[$_BUSCADOR.length] = function()
                             {
                                 switch ($tipo)
                                 {
                                     case 'keyup':
                                         $("#buscador").keyup(function()
                                         {
                                            hashtag_set({buscar:$(this).val(),pag:false});
                                         });
                                         break;
                                     case 'keypress':
                                         $("#buscador").keypress(function(e)
                                         {
                                             if(e.keyCode === 13)
                                             {
                                                e.preventDefault();
                                                hashtag_set({buscar:$(this).val(),pag:false});
                                             }
                                         });
                                         break;
                                 }
                             };
                         }

                         if($icone!=="")
                         {
                            $icone = "<div class=\"icone\">"+$icone+"</div>";
                         }

                         return "<div class=\"search\" "+$style_box+" ><input type=\"text\" id=\"buscador\" "+$attr+">"+$icone+"</div>";
                    },
                    select: function($obj)
                    {
                        var $box = "", $key = true, $options = $obj['config']['options'];

                        if(is_object($options))
                        {
                             if(is_valid($obj.config['attr'])) { $attr = attr($obj['config']['attr']); }

                             if(is_object($obj['config']['inicio'])){ $options = $.extend($obj['config']['inicio'], $options); }

                             if(is_valid($obj['config']['key'])){ $key = false; }

                             $box+= "<select id=\""+$obj['id']+"\" "+$attr+" onchange=\""+$obj['config']['action']+"('"+$obj['id']+"');\">";
                                 $.each($options, function($k, $v)
                                 {
                                     if($key)
                                     {
                                         $box+= "<option value=\""+$k+"\">"+$v+"</option>";
                                     }
                                     else
                                     {
                                         $box+= "<option value=\""+$v+"\">"+$v+"</option>";
                                     }
                                 });
                             $box+= "</select>"; 
                        }

                        return $box;
                    }
        },
        $formata_value = function($value, $config)
        {
            var $tmp = $value,
                $functions = {
                            array : function()
                            {
                                var $box = '';

                                if( is_object($value) )
                                {
                                    var $set_key     = is_valid($config["key"])         ? true                   : false,
                                        $labels      = is_valid($config["labels"])      ? $config["labels"]      : false,
                                        $style_box   = is_valid($config["style_box"])   ? $config["style_box"]   : "float:left;margin-left:5px;",
                                        $style_label = is_valid($config["style_label"]) ? $config["style_label"] : "";

                                    $.each($value, function($k, $v)
                                    {
                                        if( is_object($v) )
                                        {
                                            if( is_array($labels) )
                                            {
                                                var $Obj = $value[$k];

                                                $box+= "<div class=\"box_linha\" style=\""+$style_box+"\">";
                                                $.each($labels, function($k, $v)
                                                {
                                                    $box+= "<div class=\"box\" style=\""+$style_label+"\">"+$Obj[$v]+"</div>";
                                                });
                                                $box+= "</div>";
                                            }
                                        }
                                        else
                                        {
                                            var $val = $v;

                                            if( $set_key )
                                            {
                                                $val = $k;
                                            }
                                            if( is_valid($val) )
                                            {
                                                $box+= "<div class=\"box\" style=\""+$style_box+"\">";
                                                    $box+= "<div class=\"box\" style=\""+$style_label+"\">"+$val+"</div>";
                                                $box+= "</div>";
                                            }
                                        }
                                    });
                                }

                                return $box;
                            },
                            case : function()
                            {
                                var $return = false;

                                if( is_object($config['case']) )
                                {
                                    $return = $config['case'][$value];
                                }

                                return $return;
                            },
                            cpf : function()
                            {
                                if( $value.indexOf('.') !== -1 ){ $value = replace_all($value,".",""); }

                                return substr(0, 3, $value)+"."+substr(3, 3, $value)+"."+substr(6, 3, $value)+"-"+substr(9, 2, $value);
                            },
                            date_br : function()
                            {                                       
                                return data_br($value);
                            },
                            datetime_br : function()
                            {
                                return datetime_br($value);
                            },
                            hora : function()
                            {
                                return substr(0, -3, $value);
                            },
                            img : function()
                            {
                                var $extensao = '', $src = '', $attr = '', $class="", $array = '';

                                if( is_valid($value) && $value.indexOf('.') !== -1 )
                                { 
                                    $array = $value.split('.');

                                    $extensao = $array[1];

                                    if( $fn.verifica_extensao($extensao) )
                                    {
                                        if(is_valid($config['url']))
                                        {
                                            $src+= $config['url'];
                                        }

                                        $src+= $value;
                                    }
                                }
                                else{ $src = is_valid($config['default_url']) ? $config['default_url'] : ''; }
                                
                                if(is_valid($config['class'])){ $class = "class=\""+$config['class']+"\""; }
                                
                                $attr = ( is_valid($config['style']) ) ? $config['style'] : '';

                                return "<img src=\""+$src+"\" "+$class+" style=\""+$attr+"\" />  ";
                            },
                            maiusculo : function()
                            {
                                var $val = $value.toUpperCase();

                                return $val;
                            },
                            undefined: function() 
                            {
                                return $value;
                            }
               };

               if( is_valid($value) )
               {
                   $tmp = $functions[$config['formata']]();
               }
               else if( is_valid($config['no_valid']) )
               {
                   $tmp = $config['no_valid'];
               }
               else if( is_valid($config['formata']) && $config['formata'] === 'img') 
               {
                   $tmp = $functions[$config['formata']]();
               }     
               
               if( is_valid($config['attr']))
               {
                   $tmp = "<div "+$config['attr']+">"+$tmp+"</div>";
               }

            return $tmp;
        },
        $View = {
                 botao_action:function($botao)
                 {                     
                    var $style = "",
                        $icone = "", 
                        $class = "",
                        $onclick = "onclick=\""+ ((is_valid($botao['action'])) ? $fn.prepara_action($botao['action']) : $botao['onclick'])  + "\"";
                
                        if(is_valid($botao['attr']))
                        {
                            if(is_valid($botao['attr']['style'])){ $style="style=\""+$botao['attr']['style']+"\""; }
                        }
                        
                        if(is_valid($botao['icone']))
                        {
                            $icone = "<div class=\"icone\">"+$botao['icone']+"</div>";
                        }
                        
                        if(is_valid($botao['class'])) { $class = "class=\""+$botao['class']+"\""; } else if(is_valid($botao['color'])) { $class = "class=\""+$botao['color']+"\""; }

                        return "<li id=\""+$ID+"_"+$botao['id']+"\" "+$class+" "+$onclick+" "+$style+">"+$icone+"<div class=\"text\">"+$botao['texto']+"</div></li>";
                 },
                 botao_paginacao:function($pagina, $total)
                 {
                    return "<li id=\""+$ID+"_pagina_"+$pagina+"\" onclick=\"$WAList_set_pagina('"+$pagina+"',"+$total+");\">"+$pagina+"</li>";
                 },
                 checkbox:function($id_linha)
                 {
                    var $box = "";
                    
                    if($_CHECKBOX)
                    {
                        var $style_cols = (is_valid($_STYLE['cols'])) ? $_STYLE['cols'] : "";

                        $box+= "<div class=\"col\" style=\""+$style_cols+"width:35px;\" >";
                            $box+= "<div class=\""+$_CHECKBOX_COLOR+" checkbox_"+$ID+"\" id=\""+$id_linha+"_checkbox\" onclick=\"$WAList_select_linha('"+$ID+"','"+$id_linha+"','"+$_CHECKBOX_COLOR+"');\" style=\""+$_CHECKBOX_STYLE+"\">&nbsp;</div>";
                        $box+= "</div>";
                    }

                    return $box;
                 },
                 label: function($value, $label)
                 {
                    var $style_box = is_valid($label['style_box']) ? $label['style_box'] : '',                        
                        $style     = is_valid($label['style'])     ? $label['style']     : '';

                    var $box = "<div style=\""+$style_box+"\">";
                            $box+= "<div style=\""+$style+"\">"+$label['texto']+"</div>";
                            if(is_valid($label['style_value']))
                            {
                                $box+= "<div style=\""+$label['style_value']+"\">" + $value + "</div>";
                            }
                            else
                            {
                                $box+= $value;
                            }
                        $box+= "</div>";

                        return $box;
                 }
        },
        $Monta = {
                  actions: function()
                  {
                        if($_BOTAO.length > 0)
                        {
                            var $visible = "", $hidden = "";

                            for($n in $_BOTAO)
                            {
                                var $button = $View.botao_action($_BOTAO[$n]);

                                if( is_valid($_BOTAO[$n]['visible']) ){ $visible+= $button;  }else{ $hidden+= $button; }
                            }
                        }

                        var $box = "<ul class=\"WAListMenuVisible\" id=\""+$ID+"_visible\">"+$visible+"</ul>";
                            $box+= "<ul class=\"WAListMenuHidden\" id=\""+$ID+"_hidden\">"+$hidden+"</ul>";

                        return $box;
                  },
                  filtro:function()
                  {
                    var $box = "";

                        if($_FILTRO.length > 0)
                        {
                            $.each($_FILTRO, function($n, $OBJ)
                            {
                                var $type = $OBJ['type'];

                                $box+= $Filtro[$type]($OBJ);
                            });
                        }

                        return $box;
                  },
                  lista:function()
                  {
                      var $box = "";

                            if( is_object($LISTA) || is_array($LISTA) )
                            {
                                for (var $id in $LISTA)
                                {
                                    var $data     = "",
                                        $coluna   = "",
                                        $Object   = $LISTA[$id],
                                        $id_linha = ($ID_OBJECT) ? $Object[$ID_OBJECT] : $ID + "_ln_" + $id.replace(/\s+$/,"");

                                    for (var $n in $_COLUNAS)
                                    {
                                        var $caracter = false,
                                            $valor = "",
                                            $campos = $_COLUNAS[$n],
                                            $Itens = $campos['item'],
                                            $style = (is_valid($campos['style'])) ? $campos['style'] : "",
                                            $style_cols = (is_valid($_STYLE['cols'])) ? $_STYLE['cols'] : "";

                                          $coluna+= "<div class=\"col\" style=\""+$style_cols+$style+"\">";
                                                if(is_object($Itens))
                                                {
                                                    for(var $k in $Itens)
                                                    {
                                                        var $Item = $Itens[$k],
                                                            $value = $Object[$Item['id']];

                                                        if(is_valid($Item['config']))
                                                        {
                                                            var $config = $Item['config'];

                                                            if(is_object($config['label']))
                                                            {
                                                                $valor+= $View.label($formata_value($value, $config), $config['label']);
                                                            }
                                                            else
                                                            {
                                                                if($Object[$Item['id']]!==undefined)
                                                                {
                                                                    if(is_valid($Item['data']))
                                                                    {
                                                                        $data+= "data-"+$Item['data']+"=\""+$value+"\" ";
                                                                    }

                                                                    $valor+= $formata_value($value, $config);
                                                                }
                                                            }
                                                            
                                                            if(is_valid($config['box']))
                                                            {                                                                
                                                                $valor = "<div id=\""+$id_linha+"_"+$Item['id']+"\" data-col=\""+$Item['id']+"\" data-val=\""+$value+"\" "+attr($config['box'])+" >"+$valor+"</div>";
                                                            }
                                                        }
                                                        else
                                                        {
                                                            $valor+= $value + ' '+ $_SEPARADOR + ' ';

                                                            $caracter = true;
                                                        }
                                                    }

                                                    if($caracter){ $valor = substr(0, -2, $valor); }

                                                    $coluna+= $valor;
                                                }
                                                else
                                                {
                                                    $coluna+= $Object[$Itens];
                                                }
                                          $coluna+= "</div>";
                                    }

                                    $box+= "<div class=\"ln\" id=\""+$id_linha+"\" data-id=\""+$id_linha+"\" "+$data+" data-json=\""+json_encode($Object)+"\">";
                                        $box+= $View.checkbox($id_linha);
                                        $box+= $coluna;
                                    $box+= "</div>";
                                };
                            }
                            else
                            {
                                var $icone = $ICONE.alert('#C7A20D',17,'float:left;margin:2px 10px;');

                                $box+= "<div style=\"background-color: #F5F3BA; border: 1px solid #C7A20D;margin:15px 0;width:calc(100% - 20px ); float:left; padding:5px; line-height: 140%; position: relative; text-align: left; border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px;\">";
                                    $box+= $icone+"Nenhum registro encontrado!";
                                $box+= "</div>";
                            }

                            return $box;
                  }
        },
        $fn = {
                action: function($type, $config)
                {
                    var $action = {
                                    box: function()
                                    {
                                        return "$WAList_action_box('"+$ID+"', "+string_object($config)+",'box');";
                                    },
                                    box_confirm: function()
                                    {
                                        return "$WAList_action_box('"+$ID+"', "+string_object($config)+",'box_confirm');";
                                    },
                                    box_float: function()
                                    {
                                        return "$WAList_action_box_float('"+$ID+"', "+string_object($config)+");";
                                    },
                                    onclick: function()
                                    {
                                        return $config.onclick;
                                    }
                    };

                    return $action[$type]();
                },
                calcula_limite: function()
                {
                    var $obj    = hashtag_obj(),
                        $min    = 0, $max = $_LIMIT,
                        $limite = '';

                    if( $_HASHTAG && is_valid($obj.pag) )
                    {
                        $PAG  = $obj.pag;
                        $min  = ($max * $PAG) - $_LIMIT;
                        $fn.select_botao_paginacao();
                    }
                    else
                    {
                        $PAG = 1;
                    }

                    $limite = $min+","+$max;

                    return "limit="+$limite;
                },
                hashtag : function()
                {
                    return location.hash.substr(1);
                },
                load_lista: function()
                {
                   $LISTA = $Get.lista();
                },
                menu_suspenso: function()
                {
                    $(window).scroll(function()
                    {
                        if ($(this).scrollTop() > 25)
                        {
                            $('#box_actions').addClass("WAList_floating_box");
                            $('#box_head').addClass("WAList_floating_head");
                            $('.WAList_head').css('width:calc(100% - 400px);');

                            $fn.verficia_menu_suspeso();
                        } else {
                            $('#box_actions').removeClass("WAList_floating_box");
                            $('#box_head').removeClass("WAList_floating_head");
                            $('#box_head').css({'margin-top':'10px'});
                        }
                    });
                },
                monta_paginacao: function()
                {
                    var $box = "";

                    if( $PAGINACAO )
                    {
                        if( $_LIMIT && ( $TOTAL > $_LIMIT ) )
                        {
                            var $total_paginas = Math.ceil($TOTAL / $_LIMIT),
                                $min = 1,
                                $max = (parseInt($total_paginas) < parseInt($_NUM_PAGINACAO)) ? $total_paginas : $_NUM_PAGINACAO,
                                $on  = (parseInt($total_paginas) > parseInt($_NUM_PAGINACAO)) ? true : false;

                            if( parseInt($PAG) === 1){ $AUX = $_NUM_PAGINACAO; }
                            if( parseInt($PAG) === parseInt($total_paginas) ){ $AUX = $total_paginas; }

                            if( parseInt($PAG) >= parseInt($_NUM_PAGINACAO) )
                            {
                                if( parseInt($PAG) >= $AUX )
                                {
                                    $AUX = ($AUX + $_NUM_PAGINACAO) - 1;
                                }

                                $max = $AUX;
                                $min = ($max - $_NUM_PAGINACAO) + 1;

                                if( parseInt($max) >= parseInt($total_paginas) )
                                {
                                    $max = $total_paginas;
                                    $min = ($max - $_NUM_PAGINACAO) + 1;
                                }
                            }

                            $box+= "<div class=\"total\">Total: <b>"+$TOTAL+"</b></div>";

                            $box+= "<ul class=\"menuPaginacao\" id=\""+$ID+"_menu_paginacao\">";
                               if( $on )
                               {
                                   $box+= $View.botao_paginacao("<",$total_paginas);
                               }
                               for( var $n = $min; $n <= $max; $n++ )
                               {
                                   $box+= $View.botao_paginacao($n,$total_paginas);
                               }
                               if( $on )
                               {
                                   $box+= $View.botao_paginacao(">",$total_paginas);
                               }
                            $box+= "</ul>";
                        }
                    }

                    return $box;
                },
                monta_head: function()
                {
                    var $box = "";

                    if($_HEAD.length > 0)
                    {
                        $box+= "<div class=\"head\" id=\"box_head\" style=\""+$_STYLE['head']+"\">";

                            if($_CHECKBOX)
                            {
                                $box+= "<div class=\"col\" id=\"main_checkbox_col"+$ID+"\" style=\"width:35px;\">";
                                    $box+= "<div class=\""+$_CHECKBOX_COLOR+"\" style=\""+$_CHECKBOX_HEAD+"\" id=\"main_checkbox_"+$ID+"\" style=\"width:35px;\" onclick=\"$WAList_select_linha('"+$ID+"','all','"+$_CHECKBOX_COLOR+"');\">&nbsp;</div>";
                                $box+= "</div>";
                            }

                            $.each($_HEAD, function($n, $OBJ)
                            {
                                $box+= "<div class=\"col\" style=\""+$OBJ['style']+"\">";
                                    $box+= $OBJ['name'];
                                $box+= "</div>";
                            });

                        $box+= "</div>";
                    }

                    return $box;
                },
                monta: function()
                {                           
                    var $box = "";

                    $box+= "<div class=\""+$SKIN+"_box\" id=\"WAList_"+$ID+"\">";

                            if( $Monta.filtro() !== "" )
                            {
                                $box+= "<div class=\"filtro\" id=\""+$ID+"_filtro\">"+$Monta.filtro()+"</div>";
                            }

                            $box+= "<div class=\"actions\" id=\""+$ID+"_actions\">"+$Monta.actions()+"</div>";
                            $box+= "<div class=\"paginacao\" id=\""+$ID+"_paginacao\">"+$fn.monta_paginacao()+"</div>";

                        $box+= $fn.monta_head();
                        $box+= "<div class=\""+$SKIN+"\" id=\""+$ID+"\">"+$Monta.lista()+"</div>";
                    $box+= "</div>";

                    return $box;
                },
                prepara_action: function($config)
                {
                    var $type = $config['type'];

                    return $fn.action($type, $config);
                },
                refresh_checkbox: function( $array )
                {
                    if( !$array )
                    {
                        $('#main_checkbox_'+$ID).css('visibility','hidden');
                    }
                    else
                    {
                        $('#main_checkbox_'+$ID).css('visibility','visible').removeClass($_CHECKBOX_COLOR+"_select").addClass($_CHECKBOX_COLOR);
                    }
                },
                refresh_lista: function()
                {
                    var $tmp = $Get.lista();
                    
                    if($tmp)
                    {
                        $LISTA = $tmp;

                        $('#'+$ID).html($Monta.lista());
                    }
                },
                select_botao_paginacao: function()
                {
                    $('#'+$ID+"_menu_paginacao > li").removeClass("select");
                    $('#'+$ID+"_pagina_"+$PAG).addClass("select");
                },
                select_filtro: function()
                {
                    var $obj = hashtag_obj();

                    if(is_object($obj))
                    {
                        for($k in $obj)
                        {
                            var $v = $obj[$k];

                            $('#'+$k).val($v);

                            if($k === 'buscar'){ $('#buscador').val($v); }
                        };
                    }
                },
                verficia_menu_suspeso: function()
                {
                   if( $('#'+$ID+'_hidden').is(':visible') || $('#'+$ID+'_paginacao').is(':visible') )
                   { 
                       $('#box_head').css({'margin-top':'37px'}); 
                   }else { 
                       $('#box_head').css({'margin-top':'10px'});
                   }
                },
                verifica_extensao: function($extensao)
                {
                   var $tipo = {'jpg':'jpg','JPG':'JPG','jpeg':'jpeg','JPEG':'JPEG','gif':'gif','GIF':'GIF','png':'png','PNG':'PNG'};

                   return ( is_valid($extensao) && is_valid($tipo[$extensao]) ) ? true : false;
                },
                start: function()
                {
                    if($_BUSCADOR.length>0)
                    {
                       $.each($_BUSCADOR, function($n, $function)
                       {
                           $function.call();
                       });
                    }
                },
                init: function()
                {
                    $fn.select_filtro();
                    $fn.select_botao_paginacao();

                    $('#'+$ID+"_hidden").css('display','none');

                    if(is_valid($SUSPENSO))
                    {
                        $fn.menu_suspenso();
                    }
                    if(!$LISTA)
                    {
                        $('#main_checkbox_col'+$ID).css('display', 'none');
                    }
                    else
                    {
                        $('#main_checkbox_col'+$ID).css('display', 'table');
                    }
                }
    };
    
    this.action = {                    
                    box: function($id, $config)
                    {
                        return {type:'box', id: $id, config:$config};
                    },
                    box_confirm: function($id, $config)
                    {
                        return {type:'box_confirm', id: $id, config:$config};
                    },
                    box_float: function($id_box, $config)
                    {
                        return {type:'box_float', id: $id_box, config: $config};
                    },
                    onclick: function($function)
                    {
                        return {type:'onclick', onclick: $function};
                    }
    };
    
    this.define_ajax_on = function($value)
    {
        $AJAX_ON = $value;
    };
    
    this.define_hashtag = function($hashtag)
    {
        $_HASHTAG = $hashtag;
    };
    /**
     * Define o ID do objeto na lista
     *
     * @param {String} $id_object
     **/
     this.define_id = function($id_object)
     {
        $ID_OBJECT = $id_object;
     };
     /**
     * Define o style das colunas
     *
     * @param {String} $style
     **/
     this.define_style_cols = function($style)
     {
         $_STYLE['cols'] = $style;
     };
    /**
      * Insere um filtro para a lista
      * 
      * @param {String} $id
      * @param {String} $type
      * @param {array} $config
     **/
    this.filtro = function($id, $type, $config)
    {
        $_FILTRO[$_FILTRO.length] = {
                                     id    :$id   ,
                                     type  :$type ,
                                     config:$config
        };
    };
    
    this.get_checkbox_color = function()
    {
        return $_CHECKBOX_COLOR;
    };
    
    this.load_lista = function()
    {
        $fn.load_lista();
    };
    /**
     Define se o menu suspenso deve aparecer
     @param {Bolean} $bool
     @example
           $LIST.menu_suspenso(true | false);
    **/
    this.menu_suspenso = function($bool)
    {
        $SUSPENSO = $bool;
    };
    
    this.refresh_filtro = function($id_filtro, $array, $key)
    {
        var $box = '';

        $('#'+$id_filtro+' > option').remove();
        
        $.each($array, function($k, $v)
        {
            if( is_valid($key) )
            {
                $box+= "<option value=\""+$k+"\">"+$v+"</option>";
            }
            else
            {
                $box+= "<option value=\""+$v+"\">"+$v+"</option>";
            }
        });
        
        $('#'+$id_filtro).append($box);
    };
    
    this.refresh_lista = function()
    {
        $fn.refresh_lista();
    };
    /**
     * Insere um botão com ação
     * 
     * @param {String} $id
     * @param {array} $config
     * @example
     * $config = {
     *           icone: {tipo:'',color:'',config:{}},
     *           data: 'status',
     *           attr: {}
     * };
     **/
    this.set_botao = function($id, $config, $visible)
    {
        if(!is_object($config)){ $config = {}; }

        $config['id'] = $id;
        $config['visible'] = $visible;

        $_BOTAO[$_BOTAO.length] = $config;
    };
    /**
     * Insere uma coluna na lista
     * 
     * @author Ranniere Farias
     * @version 2.0 10/09/2018
     * 
     * @param {Object} $item
     * @param {String} $style
     **/
    this.set_coluna = function($item, $style)
    {
        if($item['id']!==undefined){ $item = [$item]; }
        $_COLUNAS[$_COLUNAS.length] = {
                                    item  : $item,
                                    style : $style
        };
    };
    /**
     Definir a estrutura checkbox na lista
     @param {boolean} $checkbox
     @example
          $LIST.set_checkbox(false); <p><p>
     Desativa checkbox na lista
    **/
    this.set_checkbox = function($checkbox)
    {
        $_CHECKBOX = $checkbox;
    };
    /**
     Definir a cor do botao da paginacao
     @param {String} $cor
     @example
          $LIST.set_botao_color("azul"); <p><p>
    **/
    this.set_botao_paginacao_color = function($cor)
    {
        $_BOTAO_COLOR = $cor;
    };
    /**
     Definir a cor do checkbox
     @param {String} $cor
     @example
          $LIST.set_checkbox_color("preto"); <p><p>
    **/
    this.set_checkbox_color = function($cor)
    {
        $_CHECKBOX_COLOR = "WA_check_"+$cor;
    };
    /**
     Define css do checkbox
     @param {String} $style
     @example
          $LIST.set_checkbox_style("margin-top:20px;"); <p><p>
    **/
    this.set_checkbox_head_style = function($style)
    {
        $_CHECKBOX_HEAD = $style;
    };
    /**
     Define css do checkbox
     @param {String} $style
     @example
          $LIST.set_checkbox_style("margin-top:20px;"); <p><p>
    **/
    this.set_checkbox_style = function($style)
    {
        $_CHECKBOX_STYLE = $style;
    };
    
    this.set_filtro_value = function($id_filtro, $val)
    {
        $('#'+$id_filtro).val($val);
    };
    /**
     Definir a quantidade de itens que irão aparecer na lista
     @param {int} $limit
     @example 
          $LIST.set_limit(10); <p><p>
     Define a lista a 10 itens
    **/
    this.set_limit = function($limit)
    {
        $_LIMIT = $limit;
    };
    /**
     Seta a lista
     @param {Object} $lista
     @example 
          $LIST.set_lista({$cache}); <p><p>     
    **/
    this.set_lista = function($lista)
    {
        $LISTA = $lista;
    };
    
    this.set_paginacao = function($paginacao)
    {
        $PAGINACAO = $paginacao;
    };
    /**
     Definir a quantidade máxima de paginas a serem exibidas na paginação
     @param {int} $paginas<p>
     (Valor padrão = 5)<p>
     @example 
          $LIST.set_num_paginacao(3); <p><p>
     Define paginação em 3 páginas por exibição
    **/
    this.set_num_paginacao = function($paginas)
    {
        $_NUM_PAGINACAO = $paginas;
    };
    /**
     Insere uma coluna no cabeçalho da lista
     @param {String} $name
     @param {String} $style
     @example 
           $LIST.set_head("NOME", "width:10%;");<p>
    **/
   
    this.set_separador = function($separador)
    {
        $_SEPARADOR = $separador;
    };
    
    this.set_head = function($name, $style)
    {        
        $_HEAD[$_HEAD.length] = {
                                    name : $name,
                                    style: $style
        };
    };
    
    this.set_param = function($param)
    {
        $_PARAMS = $param;
    };  
    /**
     * Define a url para buscar a lista
     * 
     * @param {String} $url
     **/
    this.set_url = function($url)
    {
        $URL = $url;
    };
    /**
     Define css para o cabeçalho da lista
     @param {String} $style
     @example 
           $LIST.style_head("text-align:center;font-weight:bold; ");
    **/
    this.style_head = function($style)
    {
        $_STYLE['head'] = $style;
    };
    /**
     Exibe a lista
     @example 
         $LIST.show();
    **/
    this.show = function()
    {
        if(!$LISTA)
        {
            $fn.load_lista();
        }

        $($LOCAL).html($fn.monta());
        
        $fn.start();
        $fn.init();

        if($AJAX_ON)
        {
            window.onpopstate = function(e)
            {
               $fn.refresh_lista(); $fn.init();
            };
        }
    };
};
/**
 Método responsável por criar um box
 
 @param {string} $ID
 @param {array} $config

 return void
**/
function $WAList_action_box($ID, $config, $box)
{
        var $tmp = {
                id: $config['id'],
                skin: "DROBox" ,
                transparent: false
        },
        $somente_primeiro = true,
        $json             = true;

        if($config['config']['somente_primeiro'] !== true && $config['config']['somente_primeiro']!==undefined )
        {
            $somente_primeiro = false;
        }
        
        if($config['config']['json'] !== true && $config['config']['json']!==undefined )
        {
            $json = false;
        }

        if(is_object($config['config']))
        {
            $tmp = $.extend($tmp, $config['config']);

            if( is_valid($tmp['url']) )
            {
                var $params = "json=" + $WAList_get_itens($ID, $json, $somente_primeiro),
                    $local_retorno = '#CONTEUDO_'+$config['id'];

                switch ($box)
                {
                    case 'box':
                        action_url($tmp['url'], $params, true);
                        WA_box($tmp);
                        break;
                    case 'box_confirm':
                        $tmp['params'] = $params;
                        $tmp['local_retorno'] = $local_retorno;
                        WA_box_confirm($tmp);
                        break;
                }
            }
        };
};

function $WAList_action_box_float($ID, $config)
{
    if( !is_valid( $('#WAList_pagina_'+$ID).html() ) )
    {    
        if(is_object($config.config))
        {
            var $id_box    = $config.id,
                $fn_fechar = ($config['config']['fn_fechar']) ? "$WAList_action_fn_box_float_closed("+$config['config']['fn_fechar']+",'"+$ID+"')" : "$WAList_action_box_float_closed('"+$ID+"')",
                $config    = $config.config;

            var $json = $WAList_get_itens($ID, true);

            if(is_valid($config.fn_load))
            {
                var $title = (is_valid($config.title)) ? $config.title : "",
                    $width = (is_valid($config.width)) ? $config.width : "80%";

                    $box = "<div class=\"WA_lista_pagina\" id=\"WAList_pagina_"+$ID+"\" style=\""+$config['style']+"\">";
                        $box+= "<div class=\"title\" style=\""+$config['style_title']+"\">";
                            $box+= "<div id=\"WAList_title_"+$ID+"\">"+$title+"</div>";
                            $box+= $WA.botao("transparent_cinza", null, {icone:{tipo:'fechar',color:'cinza_escuro'}, attr:{style:"float:right;",onclick:$fn_fechar}});
                        $box+= "</div>";
                        $box+= "<div class=\"conteiner\" id=\""+$id_box+"\" style=\""+$config['style_conteiner']+"\">";
                    $box+= "</div>";

                $('#WAList_'+$ID).append($box);
                $('#WAList_pagina_'+$ID).animate({width : $width}, 600);

                window[$config.fn_load]($json);
            }
        }
    }
};

function $WAList_action_fn_box_float_closed($fn, $id)
{
    $('#WAList_pagina_'+$id).remove();
    $fn.call();
};

function $WAList_action_box_float_closed($id)
{
    $('#WAList_pagina_'+$id).remove();
    hashtag_set({refresh:false});
};
/**
 Método responsável por gerar parametros

 @param {string} $id_lista
 @param {boolean} $type
 @param {boolean} $somente_primeiro

 return void
**/
function $WAList_get_itens($id_lista, $json, $somente_primeiro)
{
    var $val = "",
        $pre = "",
        $suf = "",
        $fn  = "id",
        $tmp = [],
        $get = {
                json: function($obj)
                {
                    return $($obj).data('json');
                },
                id: function($obj)
                {
                    return $($obj).data('id');
                }
        };

        if($json===true)
        {
            $fn = 'json'; $pre = "["; $suf = "]";
        }
    
        $('#'+$id_lista+' > .ln_select').each(function($n, $obj)
        {
            var $value = $get[$fn]($obj);
            
            $val+= $value+',';

            $tmp[$tmp.length] = $value;
        });

        if($somente_primeiro == false)
        {
            return $pre + substr(0, -1, $val) + $suf;
        }
        else
        {
            return $tmp[0];
        }
};
/**
 * Retorna os valores Object da linha
 * 
 * @author Ranniere Farias
 * @version 1.0 03/10/2018
 * 
 * @param {String} $id_lista
 * @param {String} $id_linha
 * 
 * @return {Object} ou FALSE
 **/
function $WAList_get_values($id_lista, $id_linha)
{
   var $tmp = false,
       $json = $('#'+$id_lista + " > #"+$id_linha).data("json");

    if(is_valid($json))
    {
        $tmp = $WA.json_decode($json);
    }
    
    return $tmp;
};
/**
 * Desceleciona a linha
 * 
 * @param {String} $ID
 * @param {String} $id_linha
**/
function $WAList_deselect($ID, $_CHECKBOX_COLOR)
{
    $('#'+$ID+"_hidden").css('display','none');
    $('#'+$ID).find('.ln_select').removeClass("ln_select").addClass("ln");
    
    $('#'+$ID).find('.'+$_CHECKBOX_COLOR+"_select").addClass($_CHECKBOX_COLOR).removeClass($_CHECKBOX_COLOR+"_select");
};
/**
 * Ao clicar no checkbox seleciona a linha
 * 
 * @param {String} $ID
 * @param {String} $id_linha
**/
function $WAList_select_linha($ID, $id_linha, $_CHECKBOX_COLOR)
{
    var $Element_ln    = $('#'+$id_linha),
        $Element_check = $('#'+$id_linha+"_checkbox"),
        $class_ln      = $('#'+$id_linha).attr("class");

    if( $id_linha == 'all' )
    {
        if( $('#main_checkbox_'+$ID).hasClass($_CHECKBOX_COLOR) )
        {
            $('#'+$ID+"_visible").css('display','none');
            $('#'+$ID+"_hidden").css('display','table');
            $('#main_checkbox_'+$ID).removeClass($_CHECKBOX_COLOR).addClass($_CHECKBOX_COLOR+"_select");
            $('#'+$ID).find('.'+$_CHECKBOX_COLOR).removeClass($_CHECKBOX_COLOR).addClass($_CHECKBOX_COLOR+"_select");
            $('#'+$ID).find('.ln').removeClass("ln").addClass("ln_select");
        }
        else
        {
            $('#'+$ID+"_visible").css('display','table');
            $('#'+$ID+"_hidden").css('display','none');
            $('#main_checkbox_'+$ID).removeClass($_CHECKBOX_COLOR+"_select").addClass($_CHECKBOX_COLOR);
            $('#'+$ID).find('.'+$_CHECKBOX_COLOR+"_select").addClass($_CHECKBOX_COLOR).removeClass($_CHECKBOX_COLOR+"_select");
            $('#'+$ID).find('.ln_select').removeClass("ln_select").addClass("ln");
        }

        $WA_list_verifica_menu_suspenso_checkbox($ID);
    }
    else
    {
        if( $class_ln==='ln' )
        {
            $('#'+$ID+"_visible").css('display','none');
            $('#'+$ID+"_hidden").css('display','table');
            $Element_check.removeClass($_CHECKBOX_COLOR).addClass($_CHECKBOX_COLOR+"_select");
            $Element_ln.removeClass("ln").addClass("ln_select");
        }
        else if( $class_ln==='ln_select' )
        {
            if( $( '.checkbox_'+$ID ).hasClass($_CHECKBOX_COLOR+"_select") && $("."+$_CHECKBOX_COLOR+"_select").length === 1 )
            {
                $('#'+$ID+"_visible").css('display','table');
                $('#'+$ID+"_hidden").css('display','none');
            }
            $Element_check.removeClass($_CHECKBOX_COLOR+"_select").addClass($_CHECKBOX_COLOR);
            $Element_ln.removeClass("ln_select").addClass("ln");
        }
        
        $WA_list_verifica_menu_suspenso_checkbox($ID);
    }
};
function $WA_list_verifica_menu_suspenso_checkbox( $ID )
{
    if( ( $('#'+$ID+'_hidden').is(':visible') || $('#'+$ID+'_paginacao').is(':visible') ) && $(window).scrollTop() > 140 )
    { 
        $('#box_head').css({'margin-top':'37px'}); 
    }
};

/**
 * Define a página na url
 * 
 * @param {int} $pagina
 * @param {int} $total_paginas
**/
function $WAList_set_pagina($pagina, $total_paginas)
{
    var $pag = '';

    switch($pagina)
    {
        case '<':
            $pag = 1;
            break;
        case '>':
            $pag = $total_paginas;
            break;
        default :
            $pag = $pagina;
            break;
    }
    
    hashtag_set({pag:$pag});
};