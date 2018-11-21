/**
 * Description of helper
 *
 * @author Ranniere Farias
 */
var $ICONE   = new icone(),
    $PAG     = 'inicio',
    $USUARIO = false;

function action_url($url, $params, $return)
{
    var $result = false;

    $.ajax({
            url     : $url,
            type    : "POST",
            data    : $params,
            async   : false,
            dataType:'json',
            success : function(data)
            {                
                if($return===true)
                {
                    $result = data;                        
                }
                else if(data.result)
                {
                    $result = data;
                }
            }
    });

    return $result;
};

function attr($attr)
{
    var $tmp = "";

    for(var $key in $attr)
    {
        var $val = $attr[$key];

        $tmp+= $key + "=\"" + $val + "\" ";
    }

    return $tmp;
};

function CheckUser()
{
    $.ajax({
            url      : 'http://localhost/tcc/application/controller/Login_controller.php',
            type     : 'POST',
            dataType : 'json',
            data     : 'action=verifica_usuario',
            async    : false,
            success  : function($data)
            {
                if($data.result)
                {
                    $USUARIO = $data.cache;
                    ShowUsername($USUARIO['usuario']['nome']);
                }
                else
                {
                    HideUsername();
                }
            }
    });
};

function data_br($data)
{        
    var $tmp = this.explode("-", $data);

    return $tmp[2] + "/" + $tmp[1] + "/" + $tmp[0];
};

function datetime_br($datetime)
 {
     var $tmp  = this.explode(" ", $datetime);
     var $data = this.explode("-", $tmp[0])  ,
         $time = $WA.substr(0,5,$tmp[1]);

     return $data[2] + "/" + $data[1] + "/" + $data[0] + " " + $time;
 };

function explode(delimiter, string)
{
    return string.split(delimiter);
};

function formata_file_size(bytes)
{
    if (typeof bytes !== 'number') { return ''; } if (bytes >= 1000000000) { return (bytes / 1000000000).toFixed(2) + ' GB'; } if (bytes >= 1000000) { return (bytes / 1000000).toFixed(2) + ' MB'; } return (bytes / 1000).toFixed(2) + ' KB'; 
};

function is_array($val)
{
    return Array.isArray($val);
};

function in_array($val, $array)
{
    return ($array.indexOf($val)>-1) ? true : false;
};

function include($src)
{
    var $script = document.createElement('script');

    $script.src     = $src;
    $script.type    = "text/javascript";

    $('body').prepend($script);
}

function is_valid($val)
{
    return ($val && $val !== null && $val !== undefined && $val !== 'NULL' && $val !== 'null' && $val !== 'FALSE' && $val !== 'false' && $val!==-1) ? true : false;
};

function is_object($val)
{
    return ( typeof($val) === "object" ) ? true : false;
};

function is_function($val)
{
    return (typeof($val)==="function") ? true : false;
};

function hide_box_login()
{
    $('#icon_user').removeClass('user_select');
    $('#box_login').css({display:'none'});
};

function consultar_local($local)
{
    var $key = 'AIzaSyATWkfbH3iUNsIjz9d07CYfNmAV4kNwOWY';
        $latitude  = '',
        $longitude = '',
        $geocoder  = new google.maps.Geocoder();

    $geocoder.geocode( { 'address': $local}, function($results, $status)
    {
            if ($status === 'OK')
            {
                $latitude  = $results[0].geometry.location.lat();
                $longitude = $results[0].geometry.location.lng();

                $('#longitude').val($longitude);
                $('#latitude').val($latitude);
            }
            else 
            {
                $('#tipo_busca_erro').css('display','table').text('Local inválido!');
            }
    });
};

function initMap()
{
    var $manaus = {
            lat: -3.05189,
            lng: -59.9776707
        },
        $delegacias = {
            0: {
                nome: 'Delegacia da Mulher',
                bairro: 'Parque 10 de Novembro',
                tel: '(92) 3236-7012',
                lat: -3.088229,
                lng: -60.0189855
            },
            1: {
                nome: 'DECCM - Delegacia Especializada Em Crimes Contra A Mulher',
                bairro: 'Cidade Nova',
                tel: '(92) 3582-1610',
                lat: -3.017099,
                lng: -59.9388719
            }
        },
        $mapOptions = {
            zoom: 12,
            center: $manaus,
            disableDefaultUI: true
        },
        $map = new google.maps.Map(document.getElementById('map'), $mapOptions);

        $.each($delegacias, function($id, $obj)
        {
            var infowindow = new google.maps.InfoWindow({
                    content  : "<center><div style=\"float:left;font-weight:bold;\">"+$obj.nome+"</div></center>"
                                            +"<div style=\"float:left;width:100%;\"><div style=\"float:left;margin:10px 5px 0 0;\">Bairro:</div>"
                        +"<div style=\"float:left;margin:10px 5px 0 0;\">"+$obj.bairro+"</div></div>"
                        +"<div style=\"float:left;width:100%;\"><div style=\"float:left;margin:10px 5px 0 0;\">Telefone:</div>"
                        +"<div style=\"float:left;margin:10px 5px 0 0;\">"+$obj.tel+"</div></div>"
                    });

            var $marker = new google.maps.Marker({
                    title	 : $obj.nome,
                position : {lat:$obj.lat,lng:$obj.lng},
                map      : $map,
                icon     : 'view/images/police.png'
            });

            $marker.addListener('click', function() {
                infowindow.open($map, $marker);
            });

            $map.addListener('click',function() {
                infowindow.close();
            });
    });
};

function json_encode($obj)
{
    if(is_object($obj))
    {
        var $string = JSON.stringify($obj);

        return replace_all($string, '"', "|");
    }
    else
    {
        return false;
    }
};
    
function json_decode($str)
{
    return eval("(" + replace_all($str, "|", '"') + ")");
};

function mensagem_top($type, $mensagem, $body, $style_box)
{
    var $class = "MSG-" + $type,
        $style = ( !is_valid($body) ) ? "margin-right:10px;margin-left:30%;" : $style_box;

    switch($type)
    {
        case 'ok':
            $icone = $ICONE.ok('#669a18',15,'float:left;'+$style);
            break;
        case 'erro':
            $icone = $ICONE.erro('#D20009',15,'float:left;'+$style);
            break;
        case 'alert':
            $icone = $ICONE.alert('#C7A20D',15,'float:left;'+$style);
            break;
    }

    var $box = "<div class=\""+$class+"\">";
            $box+= $icone+$mensagem;
            $box+= "<div class=\"MSG-fechar\" onclick=\"mensagem_top_close('"+$class+"');\">"+$ICONE.fechar('#555',15,'float:left;')+"</div>";
        $box+= "</div>";

    if(!is_valid($body))
    {
        $('#msg_topo').html($box);
        $('.' + $class).fadeOut(12000);
        
        return null;
    }
    else
    {
        return $box;
    }
};

function mensagem_top_close($class)
{
    $('.'+$class).remove();
}

function menu_select($nome)
{
    $('.menu > span').removeClass("menuSelect");
    $('#menu_'+$nome).addClass("menuSelect");
};

function hashtag_obj()
{
    var hash = location.hash.substr(1).split('&');    
    var params = {};
    
    hash.forEach(function(val) 
    {
         var splitter = val.split('=');
         
         params[splitter[0]] = splitter[1];
    });

    return params;
};

function hashtag_prepara($params)
{
    var $array = hashtag_obj();
    var $box = "";

    if(is_object($params))
    {
        $.each($params, function($k, $v)
        {
            $array[$k] = $v;
        });
    }

    $.each($array, function($k, $v)
    {
        if(is_valid($v))
        {
            $box += $k + "=" + $v + "&";
        }
    });

    return $box.substr(0, -1, $box);
};

function hashtag_set($params)
{
    if(is_object($params))
    {            
        $params = hashtag_prepara($params);

        if(is_valid($params))
        {
            location.href = '#' + $params;
        }
        else
        {
            location.href = '';
        }
    }
};

function replace_all(str, de, para)
{
    var pos = "";
    
    if(is_array(de) && is_array(para))
    {
        $.each(de, function(n, d)
        {
            pos = str.indexOf(d);
    
            while (pos > -1)
            {
                str = str.replace(d, para[n]);
                pos = str.indexOf(d);
            }
        });
    }
    else
    {
        pos = str.indexOf(de);
    
        while (pos > -1)
        {
            str = str.replace(de, para);
            pos = str.indexOf(de);
        }
    }    

    return (str);
};

function string_object($obj)
{
    var $box = "{";

    $.each($obj, function($k, $v)
    {
        $box+= $k+":";

        if(is_object($v))
        {
            $box+= string_object($v);
        }
        else if(is_function($v) || typeof ($v)==='boolean')
        {
            $box+= $v;
        }
        else
        {
            $box+= "'"+$v+"'";
        }

        $box+= ",";
    });

    $box = substr(0, -1, $box) + "}";

    return $box;       
};

function substr(start, length, string)
{
    if(length < 0)
    {
        length = string.length - (length * (-1));
    }

    return string.substr(start, length);
};

function SetLogo()
{
    var $logo = "<div class=\"box\">"+$ICONE.logo2('#FFF',55,'float:left;margin-top:0;margin-left:45px;padding:0;')+"</div>";

    $('#logo').html($logo);
};

function ShowUsername($name)
{
    $('#box_user').css('display','block');
    $('#username').html($name);
};

function HideUsername()
{
    $('#box_user').css('display','none');
    $('#username').html('');
};

function SetMenu()
{
    var $inicio     = "<div class=\"box\">"+$ICONE.home('#FFF',25,'float:left;margin:12px 10px 0 10px;')+'Início'+"</div>",
        $ocorrencia = "<div class=\"box\">"+$ICONE.lista('#FFF',22,'float:left;margin:13px 10px 0 10px;')+'Ocorrências'+"</div>",
        $eventos    = "<div class=\"box\">"+$ICONE.calendario('#FFF',23,'float:left;margin:13px 10px 0 10px;')+'Eventos'+"</div>",
        $usuarios   = "<div class=\"box\">"+$ICONE.grupo('#FFF',23,'float:left;margin:13px 10px 0 10px;')+'Usuários'+"</div>",
        $categorias = "<div class=\"box\">"+$ICONE.categorias('#FFF',23,'float:left;margin:13px 10px 0 10px;')+'Categorias'+"</div>";

    $('#menu_inicio').html($inicio);
    $('#menu_ocorrencias').html($ocorrencia);
    $('#menu_eventos').html($eventos);
    $('#menu_usuarios').html($usuarios);
    $('#menu_categorias').html($categorias);

    if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['usuarios']) )
    {
        $('#menu_usuarios').css('display','table');
    }
    if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['categorias']) )
    {
        $('#menu_categorias').css('display','table');
    }
    if( is_object($USUARIO) && is_object($USUARIO['permissao']) && is_object($USUARIO['permissao']['visualizar']['eventos']) )
    {
        $('#menu_eventos').css('display','table');
    }
};

function SetFormLogin()
{
    include('view/js/form/Login_form.js');
    
    $('#icon_user').html($ICONE.usuario('#FFF', 25, 'float:left;margin:4px 5px;'));
    
    var $VIEW = new Login_form();

    $VIEW.show();
};

function SetPage($name)
{
    location.href = '#pagina=' + $name;
};

function SetConteudo()
{
    load_pagina();

    window.onpopstate = function(e)
    {
        var $pag = hashtag_obj();

        if( $PAG !== $pag['pagina'] )
        {
            $PAG = $pag['pagina'];

            load_pagina();
        }
    };
};

function load_pagina()
{
    var $pag = hashtag_obj();

    if( is_object($pag) && is_valid($pag['pagina']) )
    {
        switch($pag['pagina'])
        {
            case 'cadastrar_usuario':
                menu_select('');
                include('view/js/form/Cadastrar_usuario_form.js');
                var $VIEW = new Cadastrar_usuario_form();
                    $VIEW.set_local('palco');
                    $VIEW.show();
                break;
            case 'minha_conta':
                menu_select('');
                include('view/js/view/Minha_conta_view.js');
                var $VIEW = new Minha_conta_view();
                    $VIEW.set_local('palco');
                    $VIEW.show();
                break;
            case 'eventos':
                menu_select('eventos');
                include('view/js/view/Eventos_view.js');
                $EVENTO_VIEW = new Eventos_view();
                $EVENTO_VIEW.set_local('palco');
                $EVENTO_VIEW.show();
                break;
            case 'ocorrencias':
                menu_select('ocorrencias');
                include('view/js/view/Ocorrencias_view.js');
                $OCORRENCIA_VIEW = new Ocorrencias_view();
                $OCORRENCIA_VIEW.set_local('palco');
                $OCORRENCIA_VIEW.show();
                break;
            case 'usuarios':
                menu_select('usuarios');
                include('view/js/view/Usuarios_view.js');
                $USUARIOS_VIEW = new Usuarios_view();
                $USUARIOS_VIEW.set_local('palco');
                $USUARIOS_VIEW.show();
                break;
            case 'categorias':
                menu_select('categorias');
                include('view/js/view/Categoria_view.js');
                $CATEGORIA_VIEW = new Categoria_view();
                $CATEGORIA_VIEW.set_local('palco');
                $CATEGORIA_VIEW.show();
                break;
            default:
                menu_select('inicio');
                include('view/js/view/Index_view.js');
                $INDEX_VIEW = new Index_view();
                $INDEX_VIEW.set_local('palco');
                $INDEX_VIEW.show();
                break;
        }
    }
    else
    {
        menu_select('inicio');
        include('view/js/view/Index_view.js');
        $INDEX_VIEW = new Index_view();
        $INDEX_VIEW.set_local('palco');
        $INDEX_VIEW.show();
    }
    hide_box_login();
};

function size_bytes(type, value)
 {
    var n = 1024, tmp = 0;
    
    switch (type)
    {
        case 'kb':
        case 'KB':
            tmp = 1;
            break;
        case 'mb':
        case 'MB':
            tmp = 1000;
            break;
        case 'GB':    
        case 'GB':
            tmp = 1000 * 1000;
            break;
    }
        
    return value * n * tmp;
 };

function WA_box(config)
{
     config = $.extend({
                     id              : false  ,
                     local           : "body" ,
                     skin            : "DROBox",
                     fn_action       : false  ,
                     fn_fechar       : false  ,
                     bt_fechar       : true   ,
                     bt_minimizar    : false  ,
                     box_header      : true   ,
                     draggable       : false  ,
                     transparent     : true   ,
                     padding         : "5px"  ,
                     prepend         : true   ,
                     fixed           : false  ,
                     conteudo        : ""     ,
                     titulo          : ""     ,
                     width           : "500px",
                     height          : "auto" ,
                     position_top    : "10%"  ,
                     position_left   : false  ,
                     style_conteudo  : false
     }, config);

     var ID        = config.id;
     var LOCAL     = (is_valid(config.local)) ? config.local : "body";
     var INICIO    = config.prepend;
     var CONTEUDO  = config.conteudo;
     var TITULO    = config.titulo;
     var $WIDTH    = config.width       ,
         $width_body = $('body').width(),
         $padding  = config.padding     ,
         $height   = config.height      ,    
         $top      = config.position_top,
         $left     = (config.position_left) ? "left:"+config.position_left+";" : "";

     var draggable = config.draggable;

     var fn_action = config.fn_action;
     var fn_fechar = (config.fn_fechar) ? "WA_box_closed_action("+config.fn_fechar+")" : "WA_box_closed('"+ID+"')";

     var TRANSPARENT = config.transparent;
     var FIXED       = (config.fixed) ? "position:fixed;" : "";

     var SKIN              = config.skin;
     var class_box         = SKIN+"_box";
     var class_header      = SKIN+"_header";
     var class_fechar      = SKIN+"_fechar";
     var class_minimizar   = SKIN+"_minimizar";
     var $class_conteudo   = SKIN+"_conteudo";
     var class_transparent = SKIN+"_transparente",
         $style_conteudo   = "width:calc(100% - "+$padding+" - "+$padding+");height:calc(100% - 10px);padding:"+$padding+";";

     if(config.style_conteudo)
     {
         $style_conteudo+= config.style_conteudo;
     }

     if($('#'+ID).is(":visible"))
     {

     }
     else
     {
         var $box = "<div class=\""+class_box+"\" id=\""+ID+"\" style=\"width:"+$WIDTH+";height:"+$height+";top:"+$top+";"+$left+FIXED+"\">";
             if(config.box_header)
             {
                 $box+= "<div class=\""+class_header+"\">";
                    $box+= "<div>"+TITULO+"</div>";
                     if(config.bt_fechar)
                     {
                         $box+= "<div class=\""+class_fechar+"\" id=\"WABOX_fechar_"+ID+"\" onclick=\""+fn_fechar+"\" title=\"Fechar\">&nbsp;</div>";
                     }
                     if(config.bt_minimizar)
                     {
                         $box+= "<div class=\""+class_minimizar+"\" id=\"WABOX_minimizar_"+ID+"\" title=\"Minimizar\">&nbsp;</div>";
                     }
                  $box+= "</div>";
             }

             $box+= "<div class=\""+$class_conteudo+"\" id=\"CONTEUDO_"+ID+"\" style=\""+$style_conteudo+"\">"+CONTEUDO+"</div>";

            $box+= "</div>";

            if(!TRANSPARENT)
            {
                 $box = "<div class=\""+class_transparent+"\" id=\"TRANSPARENT_"+ID+"\">&nbsp;</div>" + $box;
            }

            if(INICIO)
            {
                $(LOCAL).prepend($box);
            }
            else
            {
                $(LOCAL).append($box);
            }
     }

     if($WIDTH==='auto'){ var $margin_left = ($width_body - parseInt($('#CONTEUDO_'+ID).width())) / 2; $('#'+ID).css('left',$margin_left); }

     if(fn_action)
     {
         fn_action.call();
     }

     if(draggable)
     {
         $('#'+ID).draggable();
     }

     if(!config.fixed)
     {
         $("html, body").animate({scrollTop:0}, '500');
     }

     if($left==="")
     {
         $left = (($(LOCAL).width() - $('#' + ID).width() ) ) / 2 + "px";

         $('#'+ID).css({left:$left});
     }

     $(document).keyup(function(e) { if (e.keyCode === 27) { WA_box_closed(ID); } });

     this.set_width = function($width)
     {
         $('#'+ID).css('width', $width);

         var $w    = $('#'+ID).width(),
             $left = ($width_body - $w)/2;

         $('#'+ID).css('left', $left);
     };

     return this;
};

function WA_box_confirm($config)
{
    $config = $.extend({
                id           : false ,
                url          : false ,
                msn          : false ,                    
                titulo       : false ,
                params       : false ,
                transparent  : false ,
                dataType     : "html",   
                fn_return    : false ,
                local_retorno: false ,
                padding      : false
    }, $config);

    var id            = $config.id    ,
        msn           = $config.msn   ,
        url           = $config.url   ,
        params        = $config.params;

    $config['fn_action'] = function()
    {
        $('#btConfirmOk').click(function()
        {
            action_url(url, params, true);
            WA_box_closed(id);
        });

        $('#btConfirmCancelar').click(function()
        {
              WA_box_closed(id);
        });
    };

    var $style = ($config.style!==undefined) ? "style=\""+$config.style+"\" " : "";

    var $box = "<div class=\"box_linha\" style=\"margin-top:10px;\" >";
           $box += "<div "+$style+" >";
                $box+= "<div class=\"box_linha\" style=\"width:calc(100% - 30px);border:1px solid #C7A20D;border-radius:3px;background-color:#F5F3BA;padding:5px 15px;\">";
                    $box+= "<div class=\"box_linha\">"+$ICONE.alert("#C7A20D",17,"float:left;margin:3px 10px;")+msn+"</div>";
                $box+= "</div>";
                $box += "<div class=\"box_linha\" style=\"margin-top:10px;padding:10px 0;\">";
                    $box+= "<div class=\"bt-preto\" id=\"btConfirmOk\" style=\"width:30px;float:right;margin:5px 0 10px 10px;\">OK</div>";
                    $box+= "<div class=\"bt-branco\" id=\"btConfirmCancelar\" style=\"float:right;margin:5px 0 10px 100px;\">Cancelar</div>";
                $box += "</div>";
            $box += "</div>";
        $box += "</div>";

        $config['conteudo'] = $box;

        WA_box($config);
};

function WA_box_closed(id)
{
    $('#'+id).fadeOut(400, function(){ $('#CONTEUDO_'+id).html(""); $('#TRANSPARENT_'+id).remove(); $('#'+id).remove(); });
};

function WA_box_closed_action(fn, id_box)
{
    fn.call();

    if( is_valid(id_box) )
    {
        WA_box_closed(id_box);
    }
};

$.fn.fileUpload = function($config, $load)
 {
     if($load!==false)
     {
        include('system/js/fileupload/jquery.widget.js');
        include('system/js/fileupload/jquery.fileupload.js');
        include('system/js/fileupload/jquery.fileupload-load-image.js');
        include('system/js/fileupload/jquery.fileupload-transport.js');
        include('system/js/fileupload/jquery.fileupload-process.js');
        include('system/js/fileupload/jquery.fileupload-image.js');
        include('system/js/fileupload/jquery.fileupload-audio.js');
        include('system/js/fileupload/jquery.fileupload-video.js');
        include('system/js/fileupload/jquery.fileupload-validate.js');
     }     

     $config = $.extend({
                    id           : null,
                    url          : null,
                    params       : false,
                    diretorio    : false,
                    local_erro   : false,
                    local_retorno: false,
                    file_types   : 'ALL',
                    max_file_size: 2048000,
                    multiple: false ,
                    dataType: 'json',
                    load: true      ,
                    fadeOut: 'slow' ,
                    botao: {
                            text : false,
                            style: false,
                            color: false,
                            icone: false
                    },
                    fn_return: false,
                    fn_erro  : false
                    
        }, $config);

        var ID        = $config.id ,
            URL       = $config.url,
            ID_BOTAO  = 'WA_upload_bt' + $config.id,
            MULTIPLE  = ($config.multiple) ? "multiple" : "",
            PARAMS    = {file_name: ID, file_types: $config.file_types, max_file_size: $config.max_file_size};

        if($config.diretorio)
        {
            PARAMS['diretorio'] = $config.diretorio;
        }
        
        if($config.params)
        {
            $.each($config.params, function(key, val)
            {
                PARAMS[key] = val;
            });
        }

        if($config.load)
        {
            var botao_color  = $config.botao.color,
                botao_config = false,
                botao_config = {
                                 attr:{
                                     id: ID_BOTAO
                               }
                };

                if($config.botao.style)
                {
                     botao_config.attr['style'] = $config.botao.style;
                }
                if($config.botao.icone)
                {
                     botao_config.icone = $config.botao.icone;
                }

            var local_retorno = this.attr('id');

            var $box = "<div class=\"bt-"+botao_color+"\" id=\""+ID_BOTAO+"\">";
                    $box+= botao_config.icone;
                $box+= "</div>";
                $box+= "<input type=\"file\" id=\""+ID+"\" name=\""+ID+"\" style=\"display:none;\" " + MULTIPLE + "  >";

                $('#' + local_retorno).html($box);
        }

        $('#'+ID_BOTAO).click(function()
        {
            $('#' + ID).parent().find('input').click();
        });

        var $AC = {
                    box: function()
                    {
                        var $box = "<div class=\"WA_fileUpload_status\">";
                                $box+= "<div class=\"WA_fileUpload_titulo\">";
                                    $box+= "<div class=\"box\" style=\"margin-top:3px;\">";
                                         $box+= "Enviando <b><span id=\"WA_fileUpload_numFiles\">0</span></b> arquivos";
                                    $box+= "</div>";
                                $box+= "</div>";
                                $box+= "<div class=\"WA_fileUpload_itens\"></div>";
                            $box+= "</div>";

                        $('body').append($box);

                        $('#WA_fileUpload_fechar').click(function()
                        {
                            $('.WA_fileUpload_status').remove();
                        });
                    },
                    addItem: function(file)
                    {
                        var $name = file.name,
                            $size = formata_file_size(file.size);

                        var $box = "<div class=\"WA_fileUpload_item\" id=\"WA_fileUpload_item_\""+$name+">";
                                $box+= "<div class=\"box_linha\" style=\"margin-bottom:3px;\">";
                                    $box+= "<div class=\"box\">"+$name+"</div>";
                                    $box+= "<div class=\"box\" style=\"float:right;\">"+$size+"</div>";
                                $box+= "</div>";
                                $box+= "<div class=\"WA_fileUpload_progress\" style=\"float:right;\">0%</div>";
                            $box+= "</div>";

                        $('.WA_fileUpload_itens').append($box);

                        var num = this.getNumItens() + 1;

                        $('#WA_fileUpload_numFiles').text(num);
                    },
                    getNumItens: function()
                    {
                        return parseInt( $('#WA_fileUpload_numFiles').text() );
                    },
                    setErro: function(context, erro)
                    {     
                        var $box = "<div class=\"box\" style=\"float:right;\">";
                                $box+= $ICONE.alert2("red",15,"float:left;margin:0 10px 0 30px;");
                                $box+= "<div class=\"box\">"+erro+"</div>";
                            $box+= "</div>";

                        context.children('.WA_fileUpload_progress').css({background:'transparent', color:'#B20000'}).html($box);
                    },
                    setProgress: function(context, progress)
                    {
                        context.css('width',progress+'%').html(progress+'%');

                        if(progress===100)
                        {
                            context.css({background:'#008C00', color:'#FFFFFF'});
                        }
                    }
        };
        
        $('#' + ID).fileupload({
                            url      : URL,
                            type     : 'POST',
                            dataType : $config.dataType,
                            formData : PARAMS,
                            add: function (e, data)
                            {
                                if($('.WA_fileUpload_status').length===0)
                                {
                                    $AC.box();
                                }

                                $AC.addItem(data.files[0]);

                                data.context = $('.WA_fileUpload_item');
                                data.submit().success(function(result)
                                {
                                    if($config.dataType==='json')
                                    {
                                        if(result.result)
                                        {
                                            if($config.fn_return)
                                            {
                                                $config.fn_return(result);
                                            }

                                            $AC.setProgress(data.context.children('.WA_fileUpload_progress'), 100);
                                        }
                                        else
                                        {
                                            if($config.fn_erro)
                                            {
                                                $config.fn_erro(result.erro).call();
                                            }
                                            else
                                            {
                                                $AC.setErro(data.context, result.erro);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        if($config.fn_return)
                                        {
                                            $config.fn_return(result);
                                        }
                                        else
                                        {
                                            $($config.local_retorno).html(result);
                                        }
                                    }                                    
                                });
                            },
                            progress: function(e, data)
                            {
                                var progress  = parseInt(data.loaded / data.total * 100, 10);

                                $AC.setProgress(data.context.children('.WA_fileUpload_progress'), progress );
                            }
                        });
    };
    
function uf(uf)
{
       var _uf = new Object();
           _uf['AL']="Alagoas";
           _uf['AP']="Amapá";
           _uf['AM']="Amazonas";
           _uf['BA']="Bahia";
           _uf['CE']="Ceará";
           _uf['DF']="Distrito Federal";
           _uf['ES']="Espírito Santo";
           _uf['GO']="Goiás";
           _uf['MA']="Maranhão";
           _uf['MT']="Mato Grosso";
           _uf['MS']="Mato Grosso do Sul";
           _uf['MG']="Minas Gerais";
           _uf['PA']="Pará";
           _uf['PB']="Paraíba";
           _uf['PR']="Paraná";
           _uf['PE']="Pernambuco";
           _uf['PI']="Piauí";
           _uf['RJ']="Rio de Janeiro";
           _uf['RN']="Rio Grande do Norte";
           _uf['RS']="Rio Grande do Sul";
           _uf['RO']="Rondônia";
           _uf['RR']="Roraima";
           _uf['SC']="Santa Catarina";
           _uf['SP']="São Paulo";
           _uf['SE']="Sergipe";
           _uf['TO']="Tocantins";

        if(uf)
        {
            return _uf[uf];
        }
        else
        {
           return _uf;
        }
};