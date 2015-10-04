<?php
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$radius = $_POST['radius'];

$url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' . $_POST['lat'] . ',' . $_POST['lng'] . '&sensor=false&key=AIzaSyB406vXyPSWhQcly8qoYbdRaxSCjU-u9Jc';

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