import $ from "../node_modules/jquery/dist/jquery.js";
import autocomplete from "./autocomplete.js";
import autoCompleteSettings from "./webSearch.autoComplete.js";
import googleSearchSettings from "./googleSearch.Search.js";

autocomplete($);

$('#search').autocomplete({
    lookup: function (query, done) {

      let settings = Object.assign(
        autoCompleteSettings,
        {
          "url": `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete?text=${encodeURI(query)}`
        }
      );

      // Forbidden error.. nice!
      // Have no time even to get mail from devs to resolve it
      // or clean up mess

      $.ajax(settings)
        .done(function (response) {

          let result = {
            suggestions: response
          };

          done(result);
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
          let result = {
            suggestions: []
          };
          done(result);
        });

    }
});

let warningMsg = (msg, alertLevel) =>
  `<div id="t-warning" class="row justify-content-center">
     <div class="col-9">
       <div class="alert ${alertLevel} ta-centered-text" role="alert">
         ${msg}
       </div>
     <div>
  <div>`;


let queryForGoogleSearch = (query) => {

  let newSettings = {
    "url": `https://google-search5.p.rapidapi.com/google-serps/?pages=2&gl=us&hl=en-US&duration=d&autocorrect=1&q=${encodeURI(query)}`,
    beforeSend: function() {
      $("body").addClass("loading");
    }
  };

  newSettings = Object.assign(newSettings, googleSearchSettings);

  console.log(newSettings);

  return $.ajax(newSettings);


}

let responseTemplate = (results) => {

  let truncate = (str) => str.length > 34 ? `${str.substring(0, 30)}...` : str;

  let tpl = (url, title, snippet, cacheUrl) => {
    return `<div class="row special">
              <div class="col">
                <p class="special"><a class="c-black" href="${url}">${truncate(url)}</a></p>
                <p class="special p-bold">${title}</p>
                <p class="special c-gray">${snippet}</p>
                <p class="special c-gray">Cached Content: <a class="c-gray" href="${cacheUrl}">${truncate(cacheUrl)}</a></p>
              </div>
            </div>`;
  }

  let completedTpl = '<div id="response">';

  results.forEach((el) => completedTpl += tpl(el.url, el.title, el.snippet, el.cache_url));

  completedTpl += '<\div>';

  console.log(completedTpl);

  return completedTpl;
}

$("#search-btn").click(function() {
  $("#response").remove();
  $("#t-warning").remove();
  $("form").removeClass("form-normalized");
  if(!$("#search").val()) {
    $(".container").append(warningMsg('Search query is empty', 'alert-danger'));
  }
  else {
    queryForGoogleSearch($("#search").val())
      .done(function (response) {
        $("body").removeClass("loading");
        console.log(response);
        if(!response.data.meta.results) {
          $(".container").append(warningMsg(
            'Sorry, your query did not return any results.',
            'alert-primary'
          ));
        }
        else{
          $("form").addClass("form-normalized");
          $(".container").append(responseTemplate(response.data.results.organic));
        }
      })
      .fail(function() {
        $("body").removeClass("loading");
        $(".container").append(warningMsg(
          'There was error during query execution. Try again later..',
          'alert-danger'
        ));
      });
  }
});

