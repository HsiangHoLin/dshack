<?php
$time = $_POST['time'];
$type = $_POST['type'];

$postData = array(
	'GlobalParameters' => ''
);


$apiKey = "4xCEJUWM97bv+5XJ7mqbDxBXhMghFjoTb9GIexUyZmebZSVNY6xiLLxjYGk4MXra9BCjPs5hFQNtf93C8wDTvA==";

$url = 'https://ussouthcentral.services.azureml.net/workspaces/034fffe5f0994bd987f4b9e7a5351f10/services/726ca7f470814bf7922fcdf94ce2a4d5/execute?api-version=2.0&details=true';


$authToken = "Bearer " . $apiKey;

$ch = curl_init($url);
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_HTTPHEADER => array(
        'Authorization: '.$authToken,
        'Content-Type: application/json'
    ),
    CURLOPT_POSTFIELDS => json_encode($postData)
));

// Send the request
$response = curl_exec($ch);

// Check for errors
if($response === FALSE){
    die(curl_error($ch));
}
?>