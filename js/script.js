/**
 * Contient la liste des joueurs
 * @var {Object} $joueurs
 */
$joueurs = [];

/**
 * Contient la liste des pays et leurs acronymes
 * @var {Object} $pays
 */
$pays = [];

$.ajax({
  url: "files/country-codes.json",
  type: "GET",
  datatype: "jsonp",
  success: function(resultat){
    $pays = resultat.countries;
    console.log(resultat);
  },
  error: function(){
    console.log("Impossible de charger la liste des pays");
  }
});

$.ajax({
  url: "https://vbarbaresi.opendatasoft.com/api/records/1.0/search/?dataset=atp-rankings&rows=100&sort=-current_rank&facet=player_country&facet=current_rank",
  type: "GET",
  datatype: "jsonp",
  success: function(resultat, statut){
		console.log(resultat);
    $joueurs = resultat.records;
    for(i = 0 ; i < 100 ; i++){
      if($joueurs[i].fields.current_rank == $joueurs[i].fields.prev_rank){
        $joueurs[i].fields.prev_rank = "-";
      } else if($joueurs[i].fields.current_rank > $joueurs[i].fields.prev_rank){
        $difference = ($joueurs[i].fields.prev_rank - $joueurs[i].fields.current_rank) * -1;
        $joueurs[i].fields.prev_rank = "<span class='changement-score-negatif'><span class='fleche-score-precedent'> > </span>" + $difference + "</span>";
      } else if($joueurs[i].fields.current_rank < $joueurs[i].fields.prev_rank){
        $difference = $joueurs[i].fields.prev_rank - $joueurs[i].fields.current_rank;
        $joueurs[i].fields.prev_rank = "<span class='changement-score-positif'><span class='fleche-score-precedent'> < </span>" + $difference + "</span>";
      }

      $paysJoueur = '';
      for(j=0 ; j < $pays.length ; j++){
        if($joueurs[i].fields.player_country === $pays[j].name || $joueurs[i].fields.player_country === $pays[j].name2 || $joueurs[i].fields.player_country === $pays[j].name3){
          $joueurs[i].fields.player_country = $pays[j].acronym;
          $paysJoueur = $pays[j].name;
        }
      }

      $("table tbody").append("<tr><td>" + $joueurs[i].fields.current_rank + "</td><td>" + $joueurs[i].fields.prev_rank + "</td><td><img class='drapeau' src='http://www.countryflags.io/" + $joueurs[i].fields.player_country + "/flat/24.png' title='" + $paysJoueur + "' alt='" + $paysJoueur + "'/>" + $joueurs[i].fields.player_name + "<td>" + $joueurs[i].fields.player_points + "</td></tr>");
    }
    console.dir($joueurs);
  },
  error: function(){
    $(".container").append("<p>Aïe ! Un problème a été rencontré : impossible d'accéder aux données.</p>");
  },
  complete: function(resultat, statut){
		console.log("Fonction AJAX terminée : " + statut);
  }
});
