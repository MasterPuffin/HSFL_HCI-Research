<?php
require_once 'require.php';
require_once 'auth.php';

if (
	empty($_POST['user']) ||
	empty($_POST['targetVal']) ||
	empty($_POST['selectedVal']) ||
	empty($_POST['replays']) ||
	empty($_POST['time'])
) die('{"success": false, "reason": "missing values in request"}');

try {
	global $mysqli;
	$stmt = $mysqli->prepare("INSERT INTO results (timestamp, user, targetVal, selectedVal, replays, time) VALUES (?, ?, ?, ?, ?, ?)");
	$time = time();
	$stmt->bind_param('isddif', $time, $_POST['user'], $_POST['targetVal'], $_POST['selectedVal'], $_POST['replays'], $_POST['time']);

	$stmt->execute();
} catch (Exception $e) {
	echo '{"success": false, "reason": ' . $e->getMessage() . '}';
}

echo '{"success": true, "reason": ""}';