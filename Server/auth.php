<?php

header('Content-Type: application/json; charset=utf-8');

if (API_KEY != @$_GET['key']) die('{"success": false, "reason": "wrong api key"}');