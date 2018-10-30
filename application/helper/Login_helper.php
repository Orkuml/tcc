<?php
/**
 * Description of Login_helper
 *
 * @author Ranniere Farias
 */
class Login_helper
{
    public function logout()
    {
        return $this->encerrar_sessao();
    }
    
    public function get_session()
    {
        return $this->get_user_session();
    }
    
    public function verifica_login()
    {
        $login = $_POST['login'];
        $senha = md5($_POST['senha']);

        return $this->get_usuario($login, $senha);
    }
    
    private function get_usuario($login, $senha)
    {
        load_class("dao", "usuario");

        $MODEL = new usuario_dao();
        
        $OBJ = $MODEL->get_usuario("id_tipo_usuario, pessoa.cpf, pessoa.nome", "login='{$login}' AND senha='{$senha}'", array("pessoa"=>"pessoa.cpf=usuario.cpf"));

        $tmp = FALSE;

        if($OBJ)
        {
            $tmp = array(
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
    
    private function encerrar_sessao()
    {
        session_start();
        
        return session_destroy();
    }
    
    private function get_user_session()
    {
        session_start();
        
        return $_SESSION;
    }
    
    private function permissoes($tipo)
    {
        switch($tipo)
        {
            case '1':
                        $tmp = array(
                                    "visualizar" => array(
                                                        "usuarios" => array(
                                                                        "cadastrar",
                                                                        "editar"
                                                        ),
                                                        "eventos" => array(
                                                                        "cadastrar",
                                                                        "editar",
                                                                        "excluir"
                                                        ),
                                                        "ocorrencias" => array(
                                                                            "cadastrar"
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
