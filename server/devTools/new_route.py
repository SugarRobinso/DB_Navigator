import os
import pathlib

routes_dict = {}
# routes_list = []
routes_list = list(os.listdir(str(pathlib.Path(__file__).parent.parent) + "/routes/route_files/"))

# Cleaning the line after reading from file
# Check cases:
#   CHAR COUNT LENGTH
#   /    0     n
#   /    1     1
#   /    1     n
#   /    n     n
# For each case create the new name and put in a dictionary
with open(str(pathlib.Path(__file__).parent.parent) + "/routes/routes.txt", "r") as routes_file:
  for line in routes_file:
    line = line.strip()
    if line.count('#') != 1:
      if line.count('/') == 0 and len(line) > 1:
        routes_dict[line] = line + ".php"
        routes_list.remove(routes_dict[line])
      elif line.count('/') == 1 and len(line) == 1:
        routes_dict[line] = "index.php"
        routes_list.remove(routes_dict[line])
      elif line.count('/') == 1 and len(line) > 1:
        tmp_line = line.split('/')
        routes_dict[line] = tmp_line[0] + '_' + tmp_line[1] + ".php"
        routes_list.remove(routes_dict[line]) 
      elif line.count('/') > 1 and len(line) > 1:
        j = 0
        tmp_line = line.split('/')
        tmp_name = ""

        for j in range(len(tmp_line)):
          tmp_name += tmp_line[j]
          if j < len(tmp_line) - 1:
            tmp_name += "_"

        routes_dict[line] = tmp_name + ".php"
        routes_list.remove(routes_dict[line])

# Sort names alphabetically
routes_dict = dict(sorted(routes_dict.items()))

for removable in routes_list:
  os.remove(str(pathlib.Path(__file__).parent.parent) + "/routes/route_files/" + removable)


routes_file = open(str(pathlib.Path(__file__).parent.parent) + "/routes/routes.txt", "w")

# Essentials
i = 0
ds = "  "

# Create autoload file to import all the new endpoints automatically
autoload = open(str(pathlib.Path(__file__).parent.parent) + "/routes/autoload.php", "w")

# Create the new files body with anonymous functions (necessary for callbacks)
for i in range(len(routes_dict)):
  routes_file.write(list(routes_dict.items())[i][0] + "\n")

  if i == 0:
    autoload.write("<?php\n")

  autoload.write(ds + "require_once __DIR__ . \"/route_files/" + list(routes_dict.items())[i][1] + "\";\n")

  if i == len(routes_dict) - 1:
    autoload.write("?>\n")

  try:
    php_file = open(str(pathlib.Path(__file__).parent.parent) + "/routes/route_files/" + list(routes_dict.items())[i][1], "x")

    php_file.write("<?php\n")
    php_file.write(ds + "array_push($callback, function() {\n")
    php_file.write(ds + ds + "return \"" + str(list(routes_dict.items())[i][1])[0:len(list(routes_dict.items())[i][1]) - 4] + "\";\n")
    php_file.write(ds + "});\n")
    php_file.write("?>\n")

    php_file.close()
  except:
    print("File " + list(routes_dict.items())[i][1] + " already existing, skipping")

autoload.close()
routes_file.close()