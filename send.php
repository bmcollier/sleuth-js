<?php

require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPConnection;
use PhpAmqpLib\Message\AMQPMessage;

$connection = new AMQPConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$channel->queue_declare('sleuth', false, false, false, false);

$msg = new AMQPMessage($_GET['message']);
$channel->basic_publish($msg, '', 'sleuth');

$channel->close();
$connection->close();

?>