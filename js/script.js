function ok(){
	$("#result").html("");
	var nbnodes = $('#nbnodes').val();
	var container = $('#container');
	container.html("");
	container.append("<form id='frm' name='frm'>");
	$("#frm").append("<table class='table' id='t'>");

	$('#t').append("<tr id='top'>");
	$("#top").append("<td></td>");
	for(var i=0;i<nbnodes;i++){
		$("#top").append("<th>ville: "+(i+1)+"</th>");
	}
	if($("#nbnodes").val()!=''){
		for(var i=0;i<nbnodes;i++){
			$('#t').append("<tr id='tr"+i+"'>");
			$("#tr"+i).append("<th> ville: "+(i+1)+"</th>");
			for(var j=0;j<nbnodes;j++){
				var disabled="";
				if(j==i) disabled="disabled placeholder=0 style='cursor:not-allowed;'";
				$("#tr"+i).append("<td><input class='inpt' id='"+i+"_"+j+"' "+disabled+" type=text></td>");
			}
		}
		$("#frm").append("<input type='button' class='btn btn-primary' value='Calculer' id='search'>");
		$(".all").show(200);
	}else $("#nbnodes").focus()
	$("#search").click(function(){
			$("#result").html("");
		
		var nbVille = $("#nbnodes").val();
		var preD = new Array(nbVille);
		for (var i = 0; i < nbVille; i++) {
			preD[i] = new Array(nbVille);
		}
		var min = 999, VilleSuivante = 0; // min holds the minimum value, VilleSuivante holds the value for the next node.
		var distance = new Array(nbVille); // the distance matrice
		var matrice = new Array(nbVille);
		for (var i = 0; i < nbVille; i++) {
			matrice[i] = new Array(nbVille);
		}
		var visite = new Array(nbVille); // the visite array
		
		
		
		for(var i = 0; i < nbVille; i++){
			visite[i] = 0; //initialize visite array to zeros
			preD[i] = 0;
			for(var j = 0; j < nbVille; j++){
				if(i==j){
					matrice[i][j]=0;
					continue;
				}else{

						matrice[i][j] = $("#"+i+"_"+j).val(); //fill the matrice
						if(matrice[i][j]==0){
							matrice[i][j] = 999; // make the zeros as 999
						}
				}
			}
		}
		
		distance = matrice[0]; //initialize the distance array
		visite[0] = 1; //set the source node as visite
		distance[0] = 0; //set the distance from source to source to zero which is the starting point
		

		
for(var counter = 0; counter < nbVille; counter++){
			
			min = 999;
			
			for(var i = 0; i < nbVille; i++){
				
				if(min > distance[i] && visite[i]!=1){
					
					min = distance[i];
					VilleSuivante = i;
					
				}
				
			}
			
			visite[VilleSuivante] = 1;
			
			for(var i = 0; i < nbVille; i++){
				
				if(visite[i]!=1){
					
					if(min+matrice[VilleSuivante][i] < distance[i]){
						
						distance[i] = min+matrice[VilleSuivante][i];
						preD[i] = VilleSuivante;
						
					}
					
				}
				
			}
			
		}
		$("#result").append("<h3>Resultat :</h3><hr><h4>Les distances :</h4>");
		for(var i = 0; i < nbVille; i++){
			$("#result").append("  - distance "+i+" : "+distance[i]+"<br>");
			
		}
		$("#result").append("<br><h4>Les Chemins :</h4>");
		var j;
		for(var i = 0; i < nbVille; i++){
			
			if(i!=0){
				$("#result").append("Chemin = <span class='b'>Ville " + (i+1) +"</span>");
				j = i;
				do{
					
					j=preD[j];
					$("#result").append(" <- <span class='b'>Ville " + (j+1) +"</span>");
				}while(j!=0);
				$("#result").append("</br></br>");
			}
			
			
		}
		
	});
	
}