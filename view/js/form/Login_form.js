/**
 * Description of login_form
 *
 * @author Ranniere Farias
 */
function Login_form()
{
    var $fn = {
            verifica_login : function($login, $senha)
            {
                var $tmp = false;

                if( is_valid($login) && is_valid($senha) )
                {
                    $tmp = true;
                }

                return $tmp;
            }
        },
        $View = {
            login : function()
            {
                var $box= "<div class=\"seta_cima\"></div>";
                        $box+= "<div class =\"login\">";
                
                if( is_object($USUARIO) )
                {
                    $box+= "<div class=\"minha_conta\" onclick=\"SetPage('minha_conta');\">";
                        $box+= $ICONE.config('#FFF',17,'float:left;margin:3px 10px 0 0;');
                        $box+= "<div class=\"box\">Minha conta</div>";
                    $box+= "</div>";
                    $box+= "<div class=\"logout\" onclick=\"$.logout();\">"+$ICONE.logout('#ff0000',17,'float:left;')+"</div>";
                }
                else
                {
                    $box+= "<input type=\"text\" id=\"user\" name=\"user\" placeholder=\"Usuário\" value=\"\" />";
                    $box+= "<input type=\"password\" id=\"pass\" name=\"pass\" placeholder=\"Senha\" value=\"\" style=\"margin-top:0;\" />";
                    $box+= "<div class=\"BtLogar\" onclick=\"$.login();\">Entrar</div>";
                    $box+= "<div class=\"box_linha\">";
                        $box+= "<div class=\"box\" style=\"margin-left:calc(50% - 28px);cursor:pointer;font-size:12px;\" onclick=\"SetPage('cadastrar_usuario');\">Cadastre-se</div>";
                    $box+= "</div>";
                }
                    $box+= "</div>";

                return $box;
            }
    };
    
    $.login = function()
    {
        var $login = $('#user').val(),
            $senha = $('#pass').val();

        if( $fn.verifica_login($login, $senha) )
        {
            $.ajax({
                    url      : 'http://localhost/tcc/application/controller/Login_controller.php',
                    type     : 'POST',
                    dataType : 'json',
                    data     : 'login='+$login+'&senha='+$senha+'&action=login',
                    async    : false,
                    success  : function($data)
                    {
                        if($data.result)
                        {
                            CheckUser();
                            hide_box_login();
                            SetMenu();
                            hashtag_set({refresh:false});
                        }
                        else
                        {
                            mensagem_top('alert','Usuário ou senha inválidos!');
                        }
                    }
            });
        }
        else
        {
            mensagem_top('alert','Preencha os campos de login e senha!');
        }
    };
    
    $.logout = function()
    {
        $.ajax({
                url      : 'http://localhost/tcc/application/controller/Login_controller.php',
                type     : 'POST',
                dataType : 'json',
                data     : 'action=logout',
                async    : false,
                success  : function($data)
                {
                    hashtag_set({'refresh':false});
                    $USUARIO = false;
                }
        });
    };
    
    this.show = function()
    {
        var $el = $('#box_login');
        
        if( $('#box_login > div').find('login').lenght !== 0 )
        {
            $($el).html($View.login());
        }
        
        if( $($el).is(':visible') )
        {
            $('#icon_user').removeClass('user_select');
            $($el).css({display:'none'});
        }
        else
        {
            $('#icon_user').addClass('user_select');
            $($el).css({display:'block'});
        }
    };

    this.show();
};