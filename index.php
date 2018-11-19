<!--/* 
    Created on : 09/09/2018, 15:54:38
    Author     : Ranniere Farias
*/-->
<html>
    <head>
        <title>CEDACOM :::... </title>
        <link rel="stylesheet" type="text/css" href="view/css/main.css">
        <link rel="stylesheet" type="text/css" href="view/css/list.css">
        <link rel="stylesheet" type="text/css" href="system/js/ui/css/ui.css">
        <link rel="shortcut icon" href="view/ico/logo.ico" >
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="http://localhost/tcc/system/js/jquery.js" type="text/javascript" ></script>
        <script src="http://localhost/tcc/system/js/jquery-ui.js" type="text/javascript" ></script>
        <script src="http://localhost/tcc/system/js/mask.js" type="text/javascript" ></script>
        <script src="http://localhost/tcc/system/js/icone.js" type="text/javascript" ></script>
        <script src="http://localhost/tcc/system/js/helper.js" type="text/javascript" ></script>
        <script src="http://localhost/tcc/system/js/list.js" type="text/javascript" ></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyATWkfbH3iUNsIjz9d07CYfNmAV4kNwOWY"></script>
    </head>
    <body>
        <div id="main">
            <div class="Boxhead">
                <div class="logo">
                    <div class="box" id="logo"></div>
                </div>
                <div class="box nome">CEDACOM</div>
                <div class="box" id="msg_topo"></div>
                <div class="right">
                    <div class="user" id="icon_user" onclick="Login_form();"></div>
                    <div class="box" id="box_login"  style="display:none;"></div>
                </div>
                <div class="box_username" id="box_user">
                    <div class="username" id="username"></div>
                </div>
            </div>
            <div class="menu">
                <span id="menu_inicio" onclick="SetPage('inicio');"></span>
                <span id="menu_ocorrencias" onclick="SetPage('ocorrencias');"></span>
                <span id="menu_eventos" style="display:none;" onclick="SetPage('eventos');"></span>
                <span id="menu_usuarios" style="display:none;" onclick="SetPage('usuarios');"></span>
                <span id="menu_categorias" style="display:none;" onclick="SetPage('categorias');"></span>
            </div>
            <div class="conteiner" id="palco"></div>
        </div>
        <script>SetLogo();</script>
        <script>CheckUser();</script>
        <script>SetMenu();</script>
        <script>SetConteudo();</script>
        <script>SetFormLogin();</script>
    </body>
</html>
