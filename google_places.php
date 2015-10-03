<?php
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$radius = $_POST['radius'];

$url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.809336,-73.959855&radius=500&types=food&key=AIzaSyBEwZC-6NgDwCKEqTqn_x7Bs-JEYD9gg0g';

$ch = curl_init($url);
curl_setopt_array($ch, array(
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    )
));

// Send the request
$response = curl_exec($ch);

// Check for errors
if($response === FALSE){
    die(curl_error($ch));
}
?>