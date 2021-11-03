<?php
include "config.php";

// Check user login or not
if(!isset($_SESSION['uname'])){
    header('Location: index.php');
}

// logout
if(isset($_POST['but_logout'])){
    session_destroy();
    header('Location: index.php');
}
?>
<html>
    <head>
    <link href='../css/main.css' rel="stylesheet" type="text/css">
    </head>
    <nav>
        <ul class="navbar">
            <li class="menuItem"><a href="../php/compra.php">Comprar Entradas</a></li>
            <li class="menuItem"><a href="../php/crearEvento.php">Crear Evento</a></li>
        </ul>
    </nav>
    <body>
        <h1>Homepage</h1>
        <form method='post' action="">
            <input type="submit" value="Logout" name="but_logout">
        </form>
    </body>
</html>