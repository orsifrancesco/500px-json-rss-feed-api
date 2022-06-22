<?php

header('Content-type: text/javascript');

function getRss500px($username = '') {

    if(!$username) $username = 'orsifrancesco';

    $url = 'https://500px.com/' . $username . '/rss';

    $json = array();

    $options = array(
        'http' => array(
            'method' => "GET",
            'header' => array('header' => "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36")
        )
    );

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $result = str_replace("\r", "", $result);
    $result = str_replace("\n", "", $result);
    $result = trim(preg_replace('/\t+/', '', $result));

    $items = (explode("<item>",$result));

    foreach($items as $value) {

        preg_match('/<title>(.*?)<\/title>/s', $value, $title);
        preg_match('/<link>(.*?)<\/link>/s', $value, $link);
        preg_match('/<pubDate>(.*?)<\/pubDate>/s', $value, $pubDate);
        preg_match('/<img src="(.*?)">/s', $value, $img);
        
        if($pubDate[1]) {
            $json[] = array(
                'title' => $title[1],
                'link' => $link[1],
                'pubDate' => $pubDate[1],
                'img' => $img[1],
                'epoch' => strtotime($pubDate[1])
            );
        }

    }

    return json_encode($json, JSON_PRETTY_PRINT);

}

$insertHereYourUsername = 'orsifrancesco';
echo getRss500px($insertHereYourUsername);

?>