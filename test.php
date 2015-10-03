<?php

//'TI5GvmA2bFyuD7aKDpH8L4Knv7N5c0sLCugLvsyPJfiH1v02nbqmQ6KdLuvBdD6pEG6zNtasE5yuX05ygAXang=='

$postData = array(
	'Inputs' => array(
		'input1' => array(
			'ColumnNames' => array('Pclass', 'Sex', 'Age', 'Fare'),
			'Values' => array(array('1', 'female', '0', '0'))
			),
		),
	'GlobalParameters' => ''
);

$url = 'https://ussouthcentral.services.azureml.net/workspaces/6fc5ba6ac001474eb9693b40513c189b/services/febd5308295f4b86a48b17ab5d423005/execute?api-version=2.0&details=true';

$authToken = "Bearer TI5GvmA2bFyuD7aKDpH8L4Knv7N5c0sLCugLvsyPJfiH1v02nbqmQ6KdLuvBdD6pEG6zNtasE5yuX05ygAXang==";

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


/*
	// create curl resource 
        $ch = curl_init(); 

        // set url 
        curl_setopt($ch, CURLOPT_URL, "www.google.com"); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch);
*/

?>