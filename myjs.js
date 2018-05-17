 if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
     }

     web3.eth.defaultAccount = web3.eth.accounts[0];

     var ElectionContract=web3.eth.contract([
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "voterstatus",
				"type": "bool"
			},
			{
				"indexed": false,
				"name": "votecount",
				"type": "uint256"
			}
		],
		"name": "VotingData",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "candidatesCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
     var Election=ElectionContract.at("0xd8d325d10a29eb60a4c2cab6e3ad9bbddfcaf21f");



     $("#voting").click(function(){
     	$("#loader").show();
     	
     	Election.vote($("#candidates").val(),(err,res)=>{
     		if(err)
           		$("#loader").hide();
           	else
           		$("#tran").text(res);
     });
     	});
     	 Election.candidates(1,function(err,res){
     		if(!err){
     			$("#vote1").text(res[2]);
     		}
     			
     		else
     			console.log(error);
     			$("#loader").hide();	
     });



         Election.candidates(2,function(err,res){
     		if(!err){
     			$("#vote2").text(res[2]);
     		}
     			
     		else
     			console.log(error);
     			$("#loader").hide();	
     });

Election.voters(web3.eth.defaultAccount,function(err,res){
	if(!err){
		if(res==true){
			$("#voting").hide();
		}
	}	
});

$("#VoterAccount").text(web3.eth.defaultAccount);
// if(Election.voters(web3.eth.defaultAccount).call(function(err,res){
// 	$("#voting").hide();
// }));
