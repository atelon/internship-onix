import privateKey from "./key.js";

const autoCompleteSettings = {
  "async": true,
  "crossDomain": true,
  "method": "GET",
	"headers": {
		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
		"x-rapidapi-key": privateKey
	}
}

export default autoCompleteSettings;
