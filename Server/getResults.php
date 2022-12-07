<?php
require_once 'require.php';
require_once 'auth.php';

if (
	empty($_POST['user'])
) die('{"success": false, "reason": "missing values in request"}');

try {
	global $mysqli;
	$stmt = $mysqli->prepare("SELECT * FROM results WHERE user LIKE ? ORDER BY id DESC");
	$stmt->bind_param('s', $_POST['user']);
	$stmt->execute();
	$result = $stmt->get_result();
	$stmt->close();


	$array = array();
	while ($row = mysqli_fetch_array($result)) {
		$array[] = $row;
	}

	//Filter duplicate entries from array
	$filteredArray = [];
	foreach ($array as $key => $value) {
		$ta = [];
		foreach ($value as $key2 => $value2) {
			if (!is_numeric($key2)) {
				$ta[$key2] = $value2;
			}
		}
		$filteredArray[] = $ta;
	}

	echo '{"success": true, "reason": "", "data": ' . json_encode($filteredArray) . '}';
} catch (Exception $e) {
	echo '{"success": false, "reason": ' . $e->getMessage() . '}';
}

