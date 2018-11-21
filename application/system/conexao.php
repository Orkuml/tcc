<?php
/**
 * Description of Conexao
 *
 * @author Mauricio Soares
 */
class Conexao
{
    private $host = 'localhost:3306';
    private $user = 'root';
    private $pass = "";
    private $database = "cedacom";
    public $con;
    private $tabela;
    
    public function __construct($tabela) {
        $this->tabela = $tabela;
        $this->con = $this->conecta();
    }
    
    protected function conecta()
    {
        $con = mysqli_connect($this ->host, $this->user, $this->pass, $this->database) or die("Erro ao conectar ao servidor &raquo; " . mysqli_error());
        
        return $con;
     }
     
    protected function get_id() 
    {
       return mysqli_insert_id($this->con);
    } 
    
    protected function get($campos = NULL, $where = NULL, $inner_join=NULL)
    {
        $campos      = (isset($campos)) ? $campos            : "*";
        $where       = (isset($where))  ? "WHERE {$where}"   : "";
        $inner_join = (isset($inner_join)) ? $this->prepara_inner_join($inner_join) : "";

        $result = mysqli_query($this->con, "SELECT {$campos} FROM {$this->tabela} {$inner_join} {$where}");
       
        if($result)
        {
            return $result->fetch_object();
        }
        else
        {
            return FALSE;
        }
    }
    
    protected function get_lista($campos = NULL, $where = NULL, $inner_join=NULL, $order_by = NULL)
    {
        $campos      = (isset($campos))     ? $campos                : "*";
        $where       = (isset($where))      ? "WHERE {$where}"       : "";
        $inner_join  = (isset($inner_join)) ? $this->prepara_inner_join($inner_join) : "";
        $order_by    = (isset($order_by))   ? "ORDER BY {$order_by}" : "";

        $result = mysqli_query($this->con, "SELECT {$campos} FROM {$this->tabela} {$inner_join} {$where} {$order_by}");

        if($result)
        {
            $tmp = array();
            
            while ($row = $result->fetch_object()) 
            {
                $tmp[] = $row;
            }
            
            return $tmp;
        }
        else
        {
            return FALSE;
        }
    }
    
    protected function get_lista_left($campos = NULL, $where = NULL, $left_join=NULL, $order_by = NULL)
    {
        $campos      = (isset($campos))     ? $campos                : "*";
        $where       = (isset($where))      ? "WHERE {$where}"       : "";
        $left_join  = (isset($left_join)) ? $this->prepara_inner_join($left_join, TRUE) : "";
        $order_by    = (isset($order_by))   ? "ORDER BY {$order_by}" : "";

        $result = mysqli_query($this->con, "SELECT {$campos} FROM {$this->tabela} {$left_join} {$where} {$order_by}");

        if($result)
        {
            $tmp = array();
            
            while ($row = $result->fetch_object()) 
            {
                $tmp[] = $row;
            }
            
            return $tmp;
        }
        else
        {
            return FALSE;
        }
    }
    
    protected function update($campos, $where)
    {
        $result = mysqli_query($this->con, "UPDATE {$this->tabela} SET {$campos} WHERE {$where}");
        
        if($result == TRUE)
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
    
    protected function insert($array)
    {
        $result = mysqli_query($this->con, $this->prepara_array($array));
        
        if($result == TRUE)
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
    
    protected function string_Insert($campos,$values)
    {
        return "INSERT INTO $this->tabela({$campos}) VALUES ($values);";
    }

    protected function delete($where)
    {
        $result = mysqli_query($this->con, "DELETE FROM $this->tabela WHERE $where;");
        
        if($result)
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }

    public function __destruct() 
    {
        $this->con->close();
    }
    
    protected function prepara_array($array)
    {
        $campos = '';
        $values = '';
        
        foreach($array as $k => $v)
        {
            $campos.= "{$k},";
            $values.= "'{$v}',";
        }

        $campos = substr($campos, 0, -1);
        $values = substr($values, 0, -1);

        return "INSERT INTO $this->tabela({$campos}) VALUES ($values);";
    }

    private function prepara_inner_join($inner_join, $left=FALSE)
    {
        $tmp = "";
        $tipo = "INNER";

        foreach($inner_join as $tabela => $string)
        {
            if($left)
            {
                $tipo = "LEFT";
            }
            
            $tmp.= " {$tipo} JOIN {$tabela} ON {$string} ";
        }	

        return $tmp;
    }
}
