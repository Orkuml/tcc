<?php
/**
 * Description of file
 *
 * @author Ranniere Farias
 */
class file
{
    /**
    * directory_exists
    *
    * Verifica se existe um diretorio especificado
    *
    * @access	public
    * @param	string	$directory Diretorio    
    * @return	boolean
    **/
    public function directory_exists($diretory)
    {
        if(file_exists($diretory))
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
   /**
    * create_directory
    *
    * Cria um diretorio
    *
    * @access	public
    * @param	string	$directory Caminho
    * @param	int	$chmod     Default 0777 
    * @param	boolean	$recursive Default FALSE
    * @return	string
    **/
   public function create_directory($directory, $chmod=0777, $recursive=FALSE)
   {
       if( !file_exists($directory) )
       {
           return mkdir($directory, $chmod, $recursive);
       }
       else
       {
           return FALSE;
       }
   }
   /**
    * copy_file
    *
    * Copia um arquivo no diretorio informado
    *
    * @access	public
    * @param	String	$de     Caminho do arquivo
    * @param	String  $para   Destinho para será copiado o arquivo
    *
    * @return	Boolean
    **/
   public function copy_file($de, $para) 
   {
       if(file_exists($de))
       {
           return copy($de, $para);
       }
       else
       {
           return FALSE;
       }
   }
   /**
    * copy_file
    *
    * Move um arquivo de um diretorio para outro
    *
    * @access	public
    * @param	String	$de     Caminho do arquivo
    * @param	String  $para   Destinho para será copiado o arquivo
    *
    * @return	Boolean
    **/
   public function mover_para($de, $para) 
   {
       if($this->copy_file($de, $para))
       {
           unlink($de);
           
           return TRUE;
       }
       else
       {
           return FALSE;
       }
   }
    /**
    * Read File
    *
    * Lê um arquivo especificado e retorna uma string 
    *
    * @access	public
    * @param	string	$file
    * @return	string
    */
    public function read_file($file)
    {
	if ( ! file_exists($file))
	{
            return FALSE;
	}

	if (function_exists('file_get_contents'))
	{
            return file_get_contents($file);
	}

	if ( ! $fp = @fopen($file, 'rb'))
	{
            return FALSE;
	}

	flock($fp, LOCK_SH);

	$data = '';
        
	if (filesize($file) > 0)
	{
            $data =& fread($fp, filesize($file));
	}

	flock($fp, LOCK_UN);
	fclose($fp);

	return $data;
    }
    /**
    * Renomeia um arquivo
    *
    * Lê um arquivo especificado e retorna uma string 
    *
    * @access	public
    * @param	string	$de
    * @param	string	$para
     * 
    * @return	Boolean TRUE ou FALSE
    */
    public function rename($de, $para) 
    {
        if(file_exists($de))
        {
            return (rename($de, $para)) ? TRUE : FALSE;
        }
        else
        {
            return FALSE;
        }
    }

    public function open_file($file) 
    {
        if ( ! file_exists($file))
	{
            return FALSE;
	}
        else
        {
            return @fopen($file, "r");
        }
    }
    /**
    * write_file
    *
    * Grava dados para o arquivo especificado no caminho.
    *
    * @access	public
    * @param	string	$file
    * @param	string	$dados
    * @param	string	$mode
    * @return	bool
    */
    public function write_file($file, $dados, $mode = 'wb')
    {
	if ( ! $fp = @fopen($file, $mode))
	{
            return FALSE;
	}

	flock($fp, LOCK_EX);
	fwrite($fp, $dados);
	flock($fp, LOCK_UN);
	fclose($fp);

	return TRUE;
    }
    /**
    * Get Filenames
    *
    * Lê o diretório especificado e cria um array contendo os nomes de arquivos.
    *
    * @access	public
    * @param	string	$diretorio
    * @param	bool	inclui o caminho como parte do nome do arquivo
    * @param	bool	Variável interna para determinar o status de recursão - não use em chamadas
    * @return	array
    */
    function get_filenames($diretorio, $include_path = FALSE, $_recursion = FALSE)
    {
	static $_filedata = array();

	if ($fp = @opendir($diretorio))
	{
            // reset the array and make sure $source_dir has a trailing slash on the initial call
            if ($_recursion === FALSE)
            {
                $_filedata = array();
		$diretorio = rtrim(realpath($diretorio), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
            }

            while (FALSE !== ($file = readdir($fp)))
            {
                if (@is_dir($diretorio.$file) && strncmp($file, '.', 1) !== 0)
		{
                    $this->get_filenames($diretorio.$file.DIRECTORY_SEPARATOR, $include_path, TRUE);
		}
		elseif (strncmp($file, '.', 1) !== 0)
		{
                    $_filedata[] = ($include_path == TRUE) ? $diretorio.$file : $file;
		}
            }
            
            return $_filedata;
	}
	else
	{
            return FALSE;
	}
    }
    /**
    * Get File Info
    *
    * Retorna info do arquivo especificado
    *
    * @access	public
    * @param	string	$file
    * @param	array or string $info
    * @return	array
    */
    public function get_file_info($file, $info = array('name', 'server_path', 'size', 'date'))
    {
	if ( ! file_exists($file))
	{
            return FALSE;
	}
        else
        {
            if (is_string($info))
            {
                $info = explode(',', $info);
            }

            foreach ($info as $key)
            {
                switch ($key)
                {
                    case 'name':
                        $fileinfo['name'] = substr(strrchr($file, DIRECTORY_SEPARATOR), 1);
                    break;
                    case 'server_path':
                        $fileinfo['server_path'] = $file;
                    break;
                    case 'size':
                        $fileinfo['size'] = filesize($file);
                    break;
                    case 'date':
                        $fileinfo['date'] = filemtime($file);
                    break;
                    case 'readable':
                        $fileinfo['readable'] = is_readable($file);
                    break;
                    case 'writable':
                        $fileinfo['writable'] = is_writable($file);
                    break;
                    case 'executable':
                        $fileinfo['executable'] = is_executable($file);
                    break;
                    case 'fileperms':
                        $fileinfo['fileperms'] = fileperms($file);
                    break;
                }
            }

            return $fileinfo;
        }	
    }
    /**
    * Get Directory File Information
    *
    * Lê o diretório especificado e cria um array contendo os nomes de arquivos,
    * Tamanho do arquivo, datas e permissões
    *
    * @access	public
    * @param	string	$diretorio
    * @param	bool	$top_level_only Somente o diretorio especificado
    * @param	bool	Variável interna para determinar o status de recursão - não use em chamadas
    * @return	array
    */
    public function get_dir_file_info($diretorio, $top_level_only = TRUE, $_recursion = FALSE)
    {
        static $_filedata = array();
	$relative_path = $diretorio;

	if ($fp = @opendir($diretorio))
	{
            // reset the array and make sure $source_dir has a trailing slash on the initial call
            if ($_recursion === FALSE)
            {
                $_filedata = array();
		$diretorio = rtrim(realpath($diretorio), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
            }

            // foreach (scandir($source_dir, 1) as $file) // In addition to being PHP5+, scandir() is simply not as fast
            while (FALSE !== ($file = readdir($fp)))
            {
		if (@is_dir($diretorio.$file) AND strncmp($file, '.', 1) !== 0 AND $top_level_only === FALSE)
		{
                    $this->get_dir_file_info($diretorio.$file.DIRECTORY_SEPARATOR, $top_level_only, TRUE);
		}
		else if (strncmp($file, '.', 1) !== 0)
		{
                    $_filedata[$file] = $this->get_file_info($diretorio.$file);
                    $_filedata[$file]['relative_path'] = $relative_path;
		}
            }

            return $_filedata;
	}
	else
	{
            return FALSE;
	}
    }
    
    /**
    * Get Directory File Information
    *
    * Lê o diretório especificado e cria um array contendo os nomes de arquivos,
    * Tamanho do arquivo, datas e permissões
    *
    * @access	public
    * @param	string	$diretorio
    * @param	bool	Variável interna para determinar o status de recursão - não use em chamadas
    *
    * @return	array
    */
    public function get_dir_info($diretorio, $_recursion = FALSE)
    {
        static $_filedata = array();
	$relative_path = $diretorio;

	if ($fp = @opendir($diretorio))
	{
            // Redefina a matriz e certifique-se de que $source_dir tenha uma barra diagonal na chamada inicial
            if ($_recursion === FALSE)
            {
                $_filedata = array();
		$diretorio = rtrim(realpath($diretorio), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
            }

            // foreach (scandir($source_dir, 1) as $file) // In addition to being PHP5+, scandir() is simply not as fast
            while (FALSE !== ($file = readdir($fp)))
            {
		if (@is_dir($diretorio.$file) AND strncmp($file, '.', 1) !== 0)
		{
                    $_filedata[$file]                  = $this->get_file_info($diretorio.$file);
                    $_filedata[$file]['relative_path'] = $relative_path;
		}
            }

            return $_filedata;
	}
	else
	{
            return FALSE;
	}
    }
}