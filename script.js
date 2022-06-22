const $inserHereYourUsername = window?.location?.hash?.substring(1) || 'orsifrancesco'; // <!-- your username here!!

function render(json) {

	const html = json.map(el => `<a target="_blank" href="${el.link}"><img src="${el.img}" /></a>`).join('');
	document.querySelector('#rss500px').innerHTML = html;

	// document.querySelector('#loading').classList.add('hide');
	// setTimeout(() => { document.querySelector('#loading').remove() }, 500);

}

async function fetchData(username = '') {
	if (!username) username = 'orsifrancesco'
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
	console.log({ json });
	render(json);
}

fetchData($inserHereYourUsername);