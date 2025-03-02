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

          this.listOfDatabases.push(json_str);
          this.updateStorage();

          this.gui.updateDatabaseListGUI(DNS, Username);

        }
        else {

          // alert("DB " + dns + " with Username " + username + " already exists");
          if (logger)
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
        if (logger)
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

// dm.addItem({DNS:"Elenoriana_db_host:Elenoriana_db_name", Username:"Elenoriana", Password:"486234"});
// dm.addItem({DNS:"Morgandale_db_host:Morgandale_db_name", Username:"Morgandale", Password:"645457"});
// dm.addItem({DNS:"Giovannina_db_host:Giovannina_db_name", Username:"Giovannina", Password:"123123"});
// dm.addItem({DNS:"Sebastiano_db_host:Sebastiano_db_name", Username:"Sebastiano", Password:"797897"});
// dm.addItem({DNS:"Lorenziato_db_host:Lorenziato_db_name", Username:"Lorenziato", Password:"567373"});
// dm.addItem({DNS:"Alessandra_db_host:Alessandra_db_name", Username:"Alessandra", Password:"098098"});
// dm.addItem({DNS:"Elenoriana_db_host:Elenoriana_db_name", Username:"Morgandale", Password:"645457"});
// dm.addItem({DNS:"Morgandale_db_host:Morgandale_db_name", Username:"Sebastiano", Password:"797897"});
// dm.addItem({DNS:"Giovannina_db_host:Giovannina_db_name", Username:"Alessandra", Password:"098098"});
// dm.addItem({DNS:"Sebastiano_db_host:Sebastiano_db_name", Username:"Elenoriana", Password:"486234"});
// dm.addItem({DNS:"Lorenziato_db_host:Lorenziato_db_name", Username:"Giovannina", Password:"123123"});
// dm.addItem({DNS:"Alessandra_db_host:Alessandra_db_name", Username:"Lorenziato", Password:"567373"});