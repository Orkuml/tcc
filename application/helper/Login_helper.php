<?php
/**
 * Description of Login_helper
 *
 * @author Ranniere Farias
 */
class Login_helper
{
    /**
    * Encerra a sessão do usuário no sistema
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    public function logout()
    {
        return $this->encerrar_sessao();
    }
    /**
    * Retornar os dados da sessão do usuário
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    public function get_session()
    {
        return $this->get_user_session();
    }
    /**
    * Verifica os dados de login no banco de dados e inicia a SESSION
    * 
    * @author Ranniere Farias
    * 
    * @return Array or Boolean
    **/
    public function verifica_login()
    {
        $login = $_POST['login'];
        $senha = md5($_POST['senha']);

        return $this->get_usuario($login, $senha);
    }
    /**
    * Busca o usuário no banco de dados e inicia uma SESSION no sistema
    * 
    * @author Ranniere Farias
    * 
    * @return Array or Boolean
    **/
    private function get_usuario($login, $senha)
    {
        load_class("dao", "usuario");

        $DAO = new usuario_dao();
        
        $OBJ = $DAO->get_usuario("id_usuario, id_tipo_usuario, pessoa.cpf, pessoa.nome", "login='{$login}' AND senha='{$senha}'", array("pessoa"=>"pessoa.cpf=usuario.cpf"));

        $tmp = FALSE;

        if($OBJ)
        {
            $tmp = array(
                    "id_usuario" => $OBJ->id_usuario,
                    "tipo" => $OBJ->id_tipo_usuario,
                    "nome" => $OBJ->nome,
                    "cpf"  => $OBJ->cpf
            );
            
            $permissoes = $this->permissoes($OBJ->id_tipo_usuario);
    
            session_start();

            $_SESSION["usuario"] = $tmp;
            $_SESSION["permissao"] = $permissoes;
        }

        return $tmp;
    }
    /**
    * Encerra a SESSION no sistema
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    private function encerrar_sessao()
    {
        session_start();
        
        return session_destroy();
    }
    /**
    * Inicia a SESSION no sistema
    * 
    * @author Ranniere Farias
    * 
    * @return Boolean
    **/
    private function get_user_session()
    {
        session_start();
        
        return $_SESSION;
    }
    /**
    * Retornar a lista de permissões de um usuário
    * 
    * @author Ranniere Farias
    * 
    * @return Array or Boolean
    **/
    private function permissoes($tipo)
    {
        $tmp = FALSE;

        switch($tipo)
        {
            case '1':
                        $tmp = array(
                                    "visualizar" => array(
                                                        "categorias"=> array(
                                                                        "cadastrar",
                                                                        "editar"
                                                        ),
                                                        "eventos" => array(
                                                                        "cadastrar",
                                                                        "editar",
                                                                        "tipo_evento"
                                                        ),
                                                        "ocorrencias" => array(
                                                                            "cadastrar"
                                                        ),
                                                        "usuarios" => array(
                                                                        "cadastrar",
                                                                        "editar",
                                                                        "especialidade"
                                                        )
                                    )
                        );
                break;
            case 2:
                        $tmp = array(
                                    "visualizar" => array(
                                                        "eventos" => array(
                                                        ),
                                                        "ocorrencias" => array(
                                                                            "cadastrar"
                                                        )
                                    )
                        );
                break;
            case 3;
                        $tmp = array(
                                    "visualizar" => array(
                                                        "ocorrencias" => array(
                                                                            "cadastrar"
                                                        ),
                                                        "eventos" => array(
                                                                        "cadastrar",
                                                                        "editar"
                                                        ),
                                    )
                        );
                break;
        }

        return $tmp;
    }
}
