function connect() {
  req = new XMLHttpRequest();
  
  // url = "http://localhost:8080/server.php/ioajsiofdajsfio";
  url = "http://localhost:8080/api/";
  // url = "https://api.restful-api.dev/objects/6";
  param = "";
  // param = "POST";
  // param = "/";
  // param = "/select";
  // param = "name=/select/database&test=poop";
  // param = "name=select";
  // param = "/select/table";
  // param = "/select/field";
  // param = "/delete";

  // req.open("POST", url + param, true);
  // req.open("POST", url, true);

  // req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // req.setRequestHeader("Content-type", "text/plain");
  // req.setRequestHeader("Content-type", "application/json");
  
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {

      // resp = JSON.parse(req.response);
      resp = req.response;
      console.log(resp);

    }
  };

  // req.open("GET", url, true);
  req.open("POST", url, true);
  // console.log("Status: ", req.status);

  req.onload = () => {
    console.log("Client-side - DONE");
    // console.log("DONE: ", req.status);
    // console.log("DONE: ", req.responseText);
  };

  // req.setRequestHeader("Content-type", "application/json");
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // It doesn't work because it uses POST whis I'm not using on index.php
  // req.send();
  req.send(param);
  // req.send(null);
  // req.send("name=test");
}