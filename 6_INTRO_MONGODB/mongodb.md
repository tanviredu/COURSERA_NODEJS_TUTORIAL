after installation run the database
with this command <br>

        sudo mongod --dbpath=data --bind_ip 127.0.0.1

create database <br>

    ->use conFusion  
    ->db 
create a collection <br>

    db.dishes.insert({
        "name":"Tanvir Rahman",
        "description":"Test"
    })     
find all thge documents <br>
    
    db.dishes.find().pretty()