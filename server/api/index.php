<?php
  // Modify to false to turn off error messages
  // define("DEBUG", true);

  // session_start();

  // if(DEBUG) {
  //   ini_set('display_errors', 1);
  //   ini_set('display_startup_errors', 1);
  //   error_reporting(E_ALL);
  // }

  require_once "router.php";

  $routes_file = fopen("../routes/routes.txt", "r");
  $routes_list = [];
  $routes_req = [];

  if ($routes_file) {
    while(($line = fgets($routes_file)) !== false) {
      if($line[0] != "#") {
        // $new_route = explode(" ", $line);
        // $routes_list[$new_route[0]] = $new_route[1];
        array_push($routes_list, trim($line));
        // array_push($routes_list, $new_route[0]);
        // array_push($routes_req, $new_route[1]);
      }
    }
  }
  else {
    echo "Error loading routes.txt\n";
  }

  fclose($routes_file);

  // echo count($routes_list) . "<br>";
  // echo count($routes_req) . "<br>";

  // var_dump($routes_list);
  // echo  "<br>";
  // var_dump($routes_req);
  // echo  "<br>";

  // for ($i=0; $i < count($routes_req); $i++) { 
  //   require_once "routes/" . $routes_req[$i];
  // }

  $callback = [];
  // array_push($callback, function() {
  //   return "testing callable 1<br>";
  // });
  // array_push($callback, function() {
  //   return "testing callable 2<br>";
  // });

  require_once "../routes/autoload.php";
  // var_dump($callback[0]);

  for ($i=0; $i < count($routes_list); $i++) { 
    route($routes_list[$i], $callback[$i]);
  }
  
  // route('/', $callback[0]);
  // route('/', $callback[1]);
  // route('/', $callback[2]);

  // route('/', function(){
  //   return "INDEX PAGE";
  //   // phpinfo();
  // });

  // route('select/database', function(){
  //   return "Selected DB";
  // });

  // route('select/table', function(){
  //   return "Selected Table";
  // });

  // route('select/record', function(){
  //   return "Selected Record";
  // });

  // route('select', function(){
  //   return "Selected";
  // });


  // route('delete', function(){
  //   // return "DELETE PAGE";
  //   $_SESSION["request"] = $_SERVER['REQUEST_URI'];
  //   header("location:test.php");
  // });

  $action = $_SERVER['REQUEST_URI'];

  dispatch($action);
?>