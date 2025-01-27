db_list = [];
logger=true;

function cleaner() {
  localStorage.clear();
};

function isStirngJSON() {

  try {
    JSON.parse(str);
  } catch (e) {
      return false;
  }

    return true;

}

function printArray(arrayObj) {

  arrayObj.forEach((element) => {

    // if (isStirngJSON) {
    //   console.log(element);
    //   // console.log(JSON.parse(element));
    // } else {
    //   console.log(element);
    // }

    console.log(element);
    
  });

}

function al(str) {
  alert(str);
}

function starter() {

  container = document.createElement("div");
  container.setAttribute("id", db_list[Object.keys(db_list).length - 1].DBName);
  container.classList.add("min-box");
  // container.id = "db_box";
  
  // <input type="button" value="X">
  // <input type="button" value="P"></input>
  item_name = document.createElement("p");
  item_status = document.createElement("p");
  rm_db = document.createElement("input");
  conn_db = document.createElement("input");

  rm_db.setAttribute("type", "button");
  rm_db.setAttribute("value", "X");
  rm_db.setAttribute("onclick", "remove_db_item(\"" + db_list[Object.keys(db_list).length - 1].DBName + "\")");
  conn_db.setAttribute("type", "button");
  conn_db.setAttribute("value", "P");
  conn_db.setAttribute("onclick", "connect()");
  
  db_name = document.createTextNode(db_list[Object.keys(db_list).length - 1].DBName);
  db_status = document.createTextNode("status");
  
  container.appendChild(item_name);
  item_name.appendChild(db_name);
  container.appendChild(item_status);
  item_status.appendChild(db_status);
  container.appendChild(rm_db);
  container.appendChild(conn_db);

  
  list_of_db = document.getElementById("db_box");
  list_of_db.insertBefore(container, list_of_db.children[1]);

};

function add_db_item(db_item) {

  if (db_item == null) {
    dns=document.getElementById("db_host").value + document.getElementById("db_name").value;
    if(logger)
      console.log(dns);

    json_str = {"Host":document.getElementById("db_host").value,
      "DBName":document.getElementById("db_name").value,
      "Username":document.getElementById("db_user").value,
      "Password":document.getElementById("db_pass").value
    };

    db_list.push(json_str);
  } else {
    // This is necessary for tests, it doesn't cause problems
    // even if uncommented in production
    db_list.push(db_item);
  }

  // printArray(db_list);

  persist_db_list();
  starter();

  if(logger)
    console.log("Added Database: " + db_list[db_list.length - 1].DBName);

  if (
    document.getElementById("db_host") != null &&
    document.getElementById("db_name") != null &&
    document.getElementById("db_user") != null &&
    document.getElementById("db_pass") != null
  ) {
    document.getElementById("db_host").value = "";
    document.getElementById("db_name").value = "";
    document.getElementById("db_user").value = "";
    document.getElementById("db_pass").value = "";
  }

};

function remove_db_item(name) {

  if (db_list.length > 0) { 
    index = null;
    
    for (let i = 0; i < db_list.length; i++) {
      if(db_list[i].DBName == name) {
        index = i;
        break;
      }
    }

    if(logger)
      console.log("Removed Database: " + db_list[index].DBName);
    document.getElementById(db_list[index].DBName).remove();

    if (index != -1) {
      db_list.splice(index, 1);
    }
    
    persist_db_list();
    // printArray(db_list);
  }
  // else {
  //   alert("EMPTY DB IDIOT!");
  // }

};

function persist_db_list() {

  localStorage.setItem("db_list", JSON.stringify(db_list));

};


// Test
add_db_item({Host:"asdsadsad_db_host", DBName:"dpmfgodmfg_db_name", Username:"asdsadsad", Password:"486234"});
add_db_item({Host:"fdgfdgfdd_db_host", DBName:"opmdsopmva_db_name", Username:"fdgfdgfdd", Password:"645457"});
add_db_item({Host:"hgjkhjkhj_db_host", DBName:"poeirpoewk_db_name", Username:"hgjkhjkhj", Password:"123123"});
// add_db_item({Host:"qweqweqwe_db_host", DBName:"qwrenkodqw_db_name", Username:"qweqweqwe", Password:"797897"});
// add_db_item({Host:"rtyrtytry_db_host", DBName:"rtyrtrstrr_db_name", Username:"rtyrtytry", Password:"567373"});
// add_db_item({Host:"piopupiiu_db_host", DBName:"cvbkjbsdks_db_name", Username:"piopupiiu", Password:"098098"});
// remove_db_item("poeirpoewk_db_name");
// remove_db_item("opmdsopmva_db_name");
// remove_db_item("rtyrtrstrr_db_name");