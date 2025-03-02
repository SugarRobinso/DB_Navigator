class webGUI {

  updateDatabaseListGUI(dns, username) {

    var container = document.createElement("div");
    container.setAttribute("id", dns);
    container.classList.add("min-box");

    var item_name = document.createElement("p");
    var item_status = document.createElement("p");
    var rm_db = document.createElement("input");
    var conn_db = document.createElement("input");

    rm_db.setAttribute("type", "button");
    rm_db.setAttribute("value", "X");
    rm_db.setAttribute("onclick", "dm.rmItem(\"" + dns + "\", \"" + username + "\")");
    conn_db.setAttribute("type", "button");
    conn_db.setAttribute("value", "P");
    conn_db.setAttribute("onclick", "connect()");

    var db_dns = document.createTextNode(dns);
    var db_status = document.createTextNode("status");
    
    container.appendChild(item_name);
    item_name.appendChild(db_dns);
    container.appendChild(item_status);
    item_status.appendChild(db_status);
    container.appendChild(rm_db);
    container.appendChild(conn_db);

    
    var list_of_db = document.getElementById("db_box");
    list_of_db.insertBefore(container, list_of_db.children[1]);

  }

  webGUIremoveElement(id) {

    document.getElementById(id).remove();

  }

}


class dataManager {

  listOfDatabases = [];
  gui = new webGUI();

  constructor() {}

  loadStorage() {

    if(localStorage.getItem("db_list").length > 0 && JSON.parse(localStorage.getItem("db_list")) != null) {

      this.listOfDatabases = JSON.parse(localStorage.getItem("db_list"));

    }
    else {

      localStorage.setItem("db_list", null);

    }

  }

  updateStorage() {
    localStorage.setItem("db_list", JSON.stringify(this.listOfDatabases));
  }

  findDB(dns, username) {

    var index = -1;

    for (let i = 0; i < this.listOfDatabases.length; i++) {

      if ((arguments.length == 2 && this.listOfDatabases[i].DNS == dns && this.listOfDatabases[i].Username == username) || (arguments.length == 1 && this.listOfDatabases[i].DNS == dns)) {
        
        index = i;
        break;

      }

    }

    return index;

  }

  addItem(dbInfo = null) {

    if(dbInfo == null) {

      var DNS = document.getElementById("db_dns").value;
      var Username = document.getElementById("db_user").value;
      var Password = document.getElementById("db_pass").value;

      if (DNS == "" || Username == "" || Password == "") {

        console.log("One or more fields are empty");

      }
      else {

        if (this.findDB(DNS, Username) < 0) {

          var json_str = { DNS, Username, Password };
          console.log(json_str);

          this.listOfDatabases.push(json_str);
          this.updateStorage();

          this.gui.updateDatabaseListGUI(DNS, Username);

        }
        else {

          // alert("DB " + dns + " with Username " + username + " already exists");
          console.log("DB " + DNS + " with Username " + Username + " already exists");

        }

        document.getElementById("db_dns").value = "";
        document.getElementById("db_user").value = "";
        document.getElementById("db_pass").value = "";

      }

    }
    else if (dbInfo != null) {

      if (this.findDB(dbInfo.DNS, dbInfo.Username) < 0) {

        this.listOfDatabases.push(dbInfo);

        localStorage.setItem("db_list", JSON.stringify(this.listOfDatabases));
        this.updateStorage();

        this.gui.updateDatabaseListGUI(dbInfo.DNS, dbInfo.Username);

      }
      else {

        // alert("DB " + dbInfo.DNS + " with Username " + dbInfo.Username + " already exists");
        console.log("DB " + dbInfo.DNS + " with Username " + dbInfo.Username + " already exists");

      }

    }
    else {

      console.log("Error adding the new database info");

    }

  }

  rmItem(dns, username) {

    this.listOfDatabases.splice(this.findDB(dns, username), 1);

    this.gui.webGUIremoveElement(dns);

    this.updateStorage();

    if (logger)
      console.log("Removed DataBase " + dns + " with Username " + username);
  }

  pritItems() {

    for (let i = 0; i < this.listOfDatabases.length; i++) {

      console.log("Db " + (i + 1) + ":\n  " + this.listOfDatabases[i].DNS + "\n  " + this.listOfDatabases[i].Username + "\n  " + this.listOfDatabases[i].Password);

    }

  }

  printStorage() {

    console.log(JSON.parse(localStorage.getItem("db_list")));

  }

  test(log) {

    console.log("This is the test " + log);

  }

}


dm = new dataManager();

// Adding with command test
dm.addItem({DNS:"asdsadsad_db_host:dpmfgodmfg_db_name", Username:"asdsadsad", Password:"486234"});
dm.addItem({DNS:"fdgfdgfdd_db_host:opmdsopmva_db_name", Username:"fdgfdgfdd", Password:"645457"});
dm.addItem({DNS:"hgjkhjkhj_db_host:poeirpoewk_db_name", Username:"hgjkhjkhj", Password:"123123"});
dm.addItem({DNS:"qweqweqwe_db_host:qwrenkodqw_db_name", Username:"qweqweqwe", Password:"797897"});
dm.addItem({DNS:"rtyrtytry_db_host:rtyrtrstrr_db_name", Username:"rtyrtytry", Password:"567373"});
dm.addItem({DNS:"piopupiiu_db_host:cvbkjbsdks_db_name", Username:"piopupiiu", Password:"098098"});

// Duplicates test
dm.addItem({DNS:"qweqweqwe_db_host:qwrenkodqw_db_name", Username:"qweqweqwe", Password:"797897"});
dm.addItem({DNS:"piopupiiu_db_host:cvbkjbsdks_db_name", Username:"piopupiiu", Password:"098098"});

// Removing with command test
dm.rmItem("rtyrtytry_db_host:rtyrtrstrr_db_name", "rtyrtytry");
dm.rmItem("qweqweqwe_db_host:qwrenkodqw_db_name", "qweqweqwe");

dm.loadStorage();
dm.test(1);

// Prints test
dm.pritItems();
dm.printStorage();