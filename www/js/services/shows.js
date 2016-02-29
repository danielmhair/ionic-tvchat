var mod = angular.module('tvchat.services.showService', []);

mod.service('ShowsService', function ($http, $q, $ionicLoading) {

	var self = {
    shows: [],
    getShow: function (showId) {
      return _.find(self.shows, {id: showId});
    },
    getShows: function() {
      $ionicLoading.show();
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: "https://api.themoviedb.org/3/discover/movie" +
        "?sort_by=popularity.desc" +
        "&api_key=c608e0fbfd3e9c0f46477e10ee88054b"
      }).then(function successCallback(response) {
        self.shows = [];
        response.data.results.forEach(function (show) {
          show.image = self.getImageUrl(show.poster_path);
          self.shows.push(show);
        });
        console.log(self.shows);
        deferred.resolve(self.shows);
        $ionicLoading.hide();
      }, function errorCallback(response) {
        console.log(response);
        deferred.reject(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      return deferred.promise;
    },
    getImageUrl: function(posterRef) {
      return self.showImages.images.base_url + self.showImages.images.profile_sizes[1] + posterRef;
    },
    showImages: {
      "images": {
        "base_url": "http://image.tmdb.org/t/p/",
        "secure_base_url": "https://image.tmdb.org/t/p/",
        "backdrop_sizes": [
          "w300",
          "w780",
          "w1280",
          "original"
        ],
        "logo_sizes": [
          "w45",
          "w92",
          "w154",
          "w185",
          "w300",
          "w500",
          "original"
        ],
        "poster_sizes": [
          "w92",
          "w154",
          "w185",
          "w342",
          "w500",
          "w780",
          "original"
        ],
        "profile_sizes": [
          "w45",
          "w185",
          "h632",
          "original"
        ],
        "still_sizes": [
          "w92",
          "w185",
          "w300",
          "original"
        ]
      },
      "change_keys": [
        "adult",
        "also_known_as",
        "alternative_titles",
        "biography",
        "birthday",
        "budget",
        "cast",
        "character_names",
        "crew",
        "deathday",
        "general",
        "genres",
        "homepage",
        "images",
        "imdb_id",
        "name",
        "original_title",
        "overview",
        "plot_keywords",
        "production_companies",
        "production_countries",
        "releases",
        "revenue",
        "runtime",
        "spoken_languages",
        "status",
        "tagline",
        "title",
        "trailers",
        "translations"
      ]
    }
	};
	return self;
});
