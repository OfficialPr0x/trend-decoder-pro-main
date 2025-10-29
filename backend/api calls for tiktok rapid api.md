const url = 'https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=taylorswift';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/info-with-region?uniqueId=tiktok';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/info-by-id?userId=107955';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/followers?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=30&minCursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/followings?secUid=MS4wLjABAAAAY3pcRUgWNZAUWlErRzIyrWoc1cMUIdws4KMQQAS5aKN9AD1lcmx5IvCXMUJrP2dB&count=30&minCursor=0&maxCursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/posts?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=35&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/popular-posts?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=35&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/oldest-posts?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=30&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/liked-posts?secUid=MS4wLjABAAAA-hnFaH9aGUYLRspPmUXT3nZOha3-CEyChdtqwlyFaG1M_kAi4MD0AaZkbuIsPIzc&count=30&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/playlist?secUid=MS4wLjABAAAAWFGzG2-_92Qv9a1I2XZIto24-CxXu2BRC3-HbwH13Y2SIsqt_j1XrNrvYOSHN6q4&count=20&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/playlist?secUid=MS4wLjABAAAAWFGzG2-_92Qv9a1I2XZIto24-CxXu2BRC3-HbwH13Y2SIsqt_j1XrNrvYOSHN6q4&count=20&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/user/story?userId=6881290705605477381';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/general?keyword=cat&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/video?keyword=cat&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/video?keyword=cat&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/account?keyword=catt&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/live?keyword=cat&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/live?keyword=cat&cursor=0&search_id=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/search/others-searched-for?keyword=cat';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/detail?videoId=7306132438047116586';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/comments?videoId=6574657885953933314&count=50&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/comments?videoId=6574657885953933314&count=50&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/comment/replies?videoId=7230348754455481601&commentId=7230359281404740357&count=6&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/related?videoId=7311302323228167429&count=16&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/trending?count=16';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/post/trending?count=16';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/ads/detail?ads_id=7169172119488577537';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/ads?page=1&period=7&limit=20&country=US&order_by=ctr';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/creator?page=1&limit=20&sort_by=follower&country=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/video?page=1&limit=20&period=30&order_by=vv&country=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/hashtag?page=1&limit=20&period=120&country=US&sort_by=popular';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/song?page=1&limit=20&period=7&rank_type=popular&country=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/keyword?page=1&limit=20&period=7&country=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/keyword/posts?keyword=promotion&country=US&limit=10&period=7';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/commercial-music-library/playlist/detail?playlist_id=6929526806429469442&page=1&limit=20&region=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/commercial-music-library/playlist?limit=20&region=US';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/keyword/sentence?keyword=promotion&page=1&limit=50&period=30&country=US&order_type=desc';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/top-products?page=1&last=7&order_by=post&order_type=desc';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/top-products/detail?product_id=601226';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/trending/top-products/metrics?product_id=601226';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/challenge/info?challengeName=xh';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/challenge/posts?challengeId=763263&count=30&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/music/info?musicId=7224128604890990593';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/music/posts?musicId=7224128604890990593&count=30&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/place/info?placeId=22535796481538024';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
		'Content-Type': 'application/json'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/place/posts?placeId=22535796481538024&count=30&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/download/video?url=https%3A%2F%2Fwww.tiktok.com%2F%40taylorswift%2Fvideo%2F7288965373704064286';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/download/music?url=https%3A%2F%2Fwww.tiktok.com%2F%40taylorswift%2Fvideo%2F7312069407369366830';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/shop/product?productId=1729847971520022791';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/live/stream?related_live_tag=Fortnite&load_more=true';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/live/stream?related_live_tag=Fortnite&load_more=true';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/live/check-alive?uniqueId=soloz___';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/effect/info?effectId=321535';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/effect/posts?effectId=321535&count=30&cursor=0';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/collection/info?collectionId=7442134949027351314';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

const url = 'https://tiktok-api23.p.rapidapi.com/api/collection/posts?collectionId=7442134949027351314&count=30';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '8730fd6b3emsh933ea8eb58c4362p1ef053jsnd3c7dbdbf7ac',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}