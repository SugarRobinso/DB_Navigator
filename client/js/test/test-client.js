// Adding with command test
dm.addItem({DNS:"Elenoriana_db_host:Elenoriana_db_name", Username:"Elenoriana", Password:"486234"});
dm.addItem({DNS:"Morgandale_db_host:Morgandale_db_name", Username:"Morgandale", Password:"645457"});
dm.addItem({DNS:"Giovannina_db_host:Giovannina_db_name", Username:"Giovannina", Password:"123123"});
dm.addItem({DNS:"Sebastiano_db_host:Sebastiano_db_name", Username:"Sebastiano", Password:"797897"});
dm.addItem({DNS:"Lorenziato_db_host:Lorenziato_db_name", Username:"Lorenziato", Password:"567373"});
dm.addItem({DNS:"Alessandra_db_host:Alessandra_db_name", Username:"Alessandra", Password:"098098"});

// Duplicates test
dm.addItem({DNS:"Giovannina_db_host:Giovannina_db_name", Username:"Giovannina", Password:"123123"});
dm.addItem({DNS:"Sebastiano_db_host:Sebastiano_db_name", Username:"Sebastiano", Password:"797897"});

// Removing with command test
dm.rmItem("Sebastiano_db_host:Sebastiano_db_name", "Sebastiano");
dm.rmItem("Lorenziato_db_host:Lorenziato_db_name", "Lorenziato");

// Prints test
// dm.pritItems();
// dm.printStorage();

// Extra tests
// dm.loadStorage();
// dm.test(1);