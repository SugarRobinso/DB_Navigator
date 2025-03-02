<?php
  // Modify to false to turn off error messages
  // define("DEBUG", true);

  // session_start();

  // if(DEBUG) {
  //   ini_set('display_errors', 1);
  //   ini_set('display_startup_errors', 1);
  //   error_reporting(E_ALL);
  // }

  // Content-Type appears in the form type/subtype[;parameter=value]
  // and can be: application, audio, example, font, image, model, text, video
  // some commons subtypes can be found in these links:
  // application: https://www.iana.org/assignments/media-types/media-types.xhtml#application
  // audio: https://www.iana.org/assignments/media-types/media-types.xhtml#audio
  // font: https://www.iana.org/assignments/media-types/media-types.xhtml#font
  // image: https://www.iana.org/assignments/media-types/media-types.xhtml#image
  // model: https://www.iana.org/assignments/media-types/media-types.xhtml#model
  // text: https://www.iana.org/assignments/media-types/media-types.xhtml#text
  // video: https://www.iana.org/assignments/media-types/media-types.xhtml#video


  // Header necessary for cross origin connection  
  header("Access-Control-Allow-Headers:Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
  header("Access-Control-Allow-Methods:POST");
  header("Access-Control-Allow-Origin:*");
  // header("Content-Type:Application/JSON;charset=UTF-8");
  header("Content-Type:text/plain;charset=UTF-8");
  header("Access-Control-Allow-Headers:X-Requested-With");

  require_once "router.php";

  $routes_file = fopen("../routes/routes.txt", "r");
  $routes_list = [];

  if ($routes_file) {
    while(($line = fgets($routes_file)) !== false) {
      // Skip commented lines
      if($line[0] != "#") {
        array_push($routes_list, trim($line));
      }
    }
  }
  else {
    echo "Error loading routes.txt\n";
  }

  fclose($routes_file);

  $callback = [];

  require_once "../routes/autoload.php";

  for ($i=0; $i < count($routes_list); $i++) { 
    route($routes_list[$i], $callback[$i]);
  }

  $action = $_SERVER['REQUEST_URI'];

  dispatch($action);
?>