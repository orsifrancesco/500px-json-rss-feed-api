# 500px-json-rss-feed-api

## Code and example

Snippet of code to get your images from 500px. [Click here for a demo](https://orsifrancesco.github.io/500px-json-rss-feed-api/).

You can try with your images from 500px [#addingYour500pxUsername](https://orsifrancesco.github.io/500px-json-rss-feed-api/#orsifrancesco) at the end of the url.

```js

async function fetchData(username = '') {
    if (!username) return []
    const response = await fetch(`https://500px.com/${username}/rss`);
    let data = await response.text();
    data = data.replace(/\t/g, '');
    const items = data.split('<item>');
    let json = [];
    items.forEach(item => {
        const title = item.match(/<title>(.*?)<\/title>/g)?.map((val) => val?.replace(/<\/?title>/g, ''))?.[0]
        const link = item.match(/<link>(.*?)<\/link>/g)?.map((val) => val?.replace(/<\/?link>/g, ''))?.[0]
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/g)?.map((val) => val?.replace(/<\/?pubDate>/g, ''))?.[0]
        const img = item.match(/<img src="(.*?)">/g)?.map((val) => val.replace(/<img src="/g, '')?.replace(/">/g, ''))?.[0]
        if (pubDate) json.push({ title, link, pubDate, img, epoch: parseInt(new Date(pubDate).getTime() / 1000) })
    })
    return json;
}

fetchData('orsifrancesco'); // <!-- your username here!!!!

```

## XML response from 500px converted in JSON

```json

[
  {
    "title": "Ponte Vecchio, Florence",
    "link": "https://500px.com/photo/201381977/Ponte-Vecchio-Florence-by-Francesco-Orsi",
    "pubDate": "Sat, 4 Mar 2017 23:06:48 +0000",
    "img": "https://drscdn.500px.org/photo/201381977/q%3D50_h%3D450/v2?sig=3a43a3510603a53aa810cdeeb2fa159d06e2aa6c95778f822fe5b1139c147ea5",
    "epoch": 1488668808
  },
  {
    "title": "Isabella",
    "link": "https://500px.com/photo/201380519/Isabella-by-Francesco-Orsi",
    "pubDate": "Sat, 4 Mar 2017 22:54:15 +0000",
    "img": "https://drscdn.500px.org/photo/201380519/q%3D50_h%3D450/v2?sig=beaec82f2dc9859ba649aafcd9d67a9a21e61fff3e42c6211d15d885f1052d4b",
    "epoch": 1488668055
  }
]

```

If you need additional code for your UI rendering, everything is included in `index.html` file.

## Bonus file PHP

..if you are looking for the same JSON result in PHP you can get the same code in `bonus.php` file.