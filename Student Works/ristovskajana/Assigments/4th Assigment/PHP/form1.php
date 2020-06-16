<!DOCTYPE html>
<html>
<head>
	<title>Registration Form</title>
</head>
<body>
Welcome, your submission has been confirmed
First name: <?php echo $_POST["fname"]; ?><br>
Middle name: <?php echo $_POST["mname"]; ?>
Last name: <?php echo $_POST["lname"]; ?>
Your email address is: <?php echo $_POST["email"]; ?>
Date of Birth: <?php echo $_POST["bdate"]; ?>
Place if birth: <?php echo $_POST["pbirth"]; ?>
Gender: <?php echo $_POST["gender"]; ?>
Email adress: <?php echo $_POST["email"]; ?>
Usrename: <?php echo $_POST["username"]; ?>
Photo: <?php echo $_POST["foto"]; ?>
Favourite color: <?php echo $_POST["fcolor"]; ?>
Favorite animal: <?php echo $_POST["fanimal"]; ?>
Description of yourself: <?php echo $_POST["desc"]; ?>
Why you joined this page: <?php echo $_POST["reason"]; ?>
</body>
</html>