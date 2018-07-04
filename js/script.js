/**
 * Contient la liste des joueurs
 * @var {Object} $joueurs
 */
$joueurs = [];

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
        $difference = $joueurs[i].fields.prev_rank - $joueurs[i].fields.current_rank;
        $joueurs[i].fields.prev_rank = "<span class='fleche-score-precedent'> > </span>" + $difference;
      } else if($joueurs[i].fields.current_rank < $joueurs[i].fields.prev_rank){
        $difference = $joueurs[i].fields.prev_rank - $joueurs[i].fields.current_rank;
        $joueurs[i].fields.prev_rank = "<span class='fleche-score-precedent'> < </span>" + $difference;
      }

      $("table tbody").append("<tr><td>" + $joueurs[i].fields.current_rank + "</td><td>" + $joueurs[i].fields.prev_rank + "</td><td>" + $joueurs[i].fields.player_name + "</td><td>" + $joueurs[i].fields.player_country + "</td><td>" + $joueurs[i].fields.player_points + "</td></tr>");
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

// PROCHAINEMENT : TRANSFORMER LES NOMS DES PAYS EN DRAPEAUX
$.ajax({
  url: "files/country-codes.json",
  type: "GET",
  datatype: "jsonp",
  success: function(json){
    console.log(json);
  },
  error: function(){
    console.log("error");
  }
});
