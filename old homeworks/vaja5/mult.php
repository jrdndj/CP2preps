<?php
	$n = 10;
	$m = 10;
?>
<!DOCTYPE html>
<html>
<head>
<title>Multiplication table</title>
<style>
table {
	border-collapse: collapse;
}

td {
	border: 1px solid black;
	width: 30px;
	text-align: center;
	padding: 5px;
}

.head {
	background-color: yellow;
	font-weight: bold;
}
</style>
</head>

<body>
<table>
<?php
for ($row = 0; $row <= $n; $row++) {
	echo "<tr>\n";
	for ($col = 0; $col <= $m; $col++) {
		if ($row == 0 && $col == 0)
			$val = "&times;";
		elseif ($row == 0)
			$val = $col;
		elseif ($col == 0)
			$val = $row;
		else
			$val = $row * $col;

		if ($row == 0 || $col == 0)
			echo "<td class='head'>$val</td>\n";	
		else
			echo "<td>$val</td>\n";
	}
	echo "</tr>\n";
}
?>
</table>
</body>
</html>