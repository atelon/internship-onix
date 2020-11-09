import privateKey from "./key.js";

// https://rapidapi.com/serpsbot/api/google-search5

var searchSettings = {
	"async": true,
	"crossDomain": true,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "google-search5.p.rapidapi.com",
		"x-rapidapi-key": privateKey
	}
}

export default searchSettings;
