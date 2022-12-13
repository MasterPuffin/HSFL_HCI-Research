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

	//I don't know why, but not using these vars make the app not run in the prod env
	$user = $_POST['user'];
	$targetVal =  $_POST['targetVal'];
	$selectedVal = $_POST['selectedVal'];
	$replays = $_POST['replays'];
	$time2 = $_POST['time'];

	$stmt->bind_param('isddid', $time, $user, $targetVal, $selectedVal, $replays, $time2);

	$stmt->execute();
} catch (Exception $e) {
	echo '{"success": false, "reason": ' . $e->getMessage() . '}';
}

echo '{"success": true, "reason": ""}';