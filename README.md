# 500px-json-rss-feed-api

Snippet of code to get your images from 500px. [Click here for a demo](https://orsifrancesco.github.io/500px-json-rss-feed-api/).

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

If you need additional code for your UI rendering, everything is included in `index.html` file.

..if you are looking for the same JSON result in PHP you can get the same code in `bonus.php` file.