require("dotenv").config();
const { check, validationResult } = require("express-validator");
const User = require('../models/user');
const qrCode = require('qrcode');
const axios = require('axios');

/*AUTH_TOKEN = "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidGFnIjoiZ19kMG5leUptOF9TaklwdjZ5UnZTdyIsImFsZyI6IkExMjhHQ01LVyIsIml2IjoiNEVzU19ZRHNHRlJVSmxFWCJ9.h0UTA2-RwUDTA-4l6_dFRosujxbW3OHSsqDv25d4Bj0.NY3wKzbpS_5d9blLeJUqUg.2feoUpBPMZ3DNhA-uTCEFJL46CFrOGYg04IPje73Lb9omGBCczSyoQju_CFixAkM8ouwtkofGGcpB7qVWCKpNzNl1OkHGNDTkhhM_SEZdVVpKhgmIyDhyNCsE848NFg7saozd9IJFM97A17W3p0bRopAoZ68HLddYUiQ3VRkg6xdxVxdYVdz0gJqdEv2EGhkNJDSmcTD4lDYP38tX_wYQ6KVrtK1NalxabWUb8zZXBjsP_PcxF3h5M4ANRjIvc6TTtDo3mb4OoAwfo8TDIxHMQbx9almFpqTNm4CjpsFgGi4voSW48ZPpMAWttFigfLBTyapFY45i7zkutaLI-e9ziZGLgrcx2Bfq1yFM4eO4Ahf9iK411pvaP-abv84hEjY.NJCn_EsfEVA7j6qhz0m8qA"
axios.defaults.headers.common['X-Zeta-AuthToken'] = AUTH_TOKEN;*/

exports.home = function(req, res){
	res.render("mobile_form");
}

exports.home_form = function(req, res){
	var user_mobile = req.body.mobile;
	User.findOne({ mobile: user_mobile }, function(err, user){
		if(user) {
			res.redirect(`/dashboard/${user._id}`);
		}else{
<<<<<<< HEAD
		user = new User({mobile: user_mobile, UPI: user_mobile+"@zeta.com"});
=======
		user = new User({mobile: user_mobile, UPI: user_mobile+"@zeta"});
>>>>>>> without-zeta
		user.save(function(err){
			if(err){
				return res.status(500).send({
		        msg: err.message
		      });
			}
			res.redirect(`/details/${user_mobile}`)
		});
		}
	});
}

exports.user_details = function(req, res){
	res.render("detail");
}

exports.user_detail_form = function(req, res){
	var username = req.body.name;
	var date_of_birth = req.body.dob;
	var pan = req.body.pan;
	User.findOne({ mobile: req.params.mobile }, function(err, user){
		if(user){
			const date = new Date(date_of_birth);
			user.name = username
			user.dob = date_of_birth
			user.pan = pan
			user.save(function(err){
				if(err){
					return res.status(500).send({
				        msg: err.message
				      });
					}
					return res.redirect(`/transfer-fund/${user._id}`);
	  			});
			/*const formData = {
				  "ifiID": "140793",
				  "formID": String(Math.floor(Math.random() * 100000)),
				  "applicationType": "CREATE_ACCOUNT_HOLDER_01",
				  "spoolID": "3deb5a70-311c-11ea-978f-2e728ce88125",
				  "individualType": "REAL",
				  "salutation": "",
				  "firstName": username,
				  "middleName": "",
				  "lastName": "",
				  "profilePicURL": "",
				  "dob": {
				      "year": date.getFullYear(),
				      "month": date.getMonth(),
				      "day": date.getDate()
				  },
				  "gender": "",
				  "mothersMaidenName": "",
				  "kycDetails": {
				      "kycStatus": "MINIMAL",
				      "kycStatusPostExpiry": "KYC_EXPIRED",
				      "kycAttributes": {},
				      "authData": {
				        	"PAN": pan
				      },
				      "authType": "PAN"
				  },
				  "vectors": [
				      {
				          "type": "p",
				          "value": String(user.mobile),
				          "isVerified": true
				      }
				  ],
				  "pops": [],
				  "customFields": {
				      "entity_id": "ABCD0001"
				  }
				}
				axios.post('https://fusion.preprod.zeta.in/api/v1/ifi/140793/applications/newIndividual', formData)
				  .then(function (response) {
				  	if(response['status'] == 200){
				  		if(response.data.individualID){
				  			console.log(response.data);
				  			user.account_holder_id = response.data.individualID;
							const bundleData = {
								"accountHolderID": response.data.individualID,
								"name": "InvestopayFintechwalletbundle9adcf36",
								"phoneNumber": String(user.mobile)
							}
						    axios.post('https://fusion.preprod.zeta.in/api/v1/ifi/140793/bundles/eeae85f2-b764-48cf-af9d-d202bd8f174a/issueBundle', bundleData)
						  	.then(function(resp){
						  		if(resp['status'] == 200){
						  			console.log(resp.data);
						  			user.accountId = resp.data.accounts[0].accountID;
						  			user.save(function(err){
						  				if(err){
											return res.status(500).send({
									        msg: err.message
									      });
										}
										return res.redirect(`/transfer-fund/${user._id}`);
						  			});
						  		}
						  	})
						    .catch(function (error) {
						    	console.log(error);
							})
				  		}else{
				  			console.log("Already Exist");
				  			return res.redirect(`/dashboard/${user._id}`);
				  		}
				  	}else{
				  		console.log("Not 200");
				  		return res.redirect(`/dashboard/${user._id}`);
				  	}
				})
				  .catch(function (error) {
				    console.log(error);
				});*/
		}else{
			return res.send({
				msg: "User does not exist in the database!"
			});
		}
	});
}


exports.dashboard = function(req, res){
	var user_id = req.params.userId;
	if(user_id){
		User.findOne({_id: user_id}, function(err, user){
			if(err || !user){
				return res.send({
					msg: "User does not exist in the database!"
				});
			}else{
				return res.render("dashboard", {"user": user});
			}
		});
	}else {
		return res.redirect("/details");
	}
}


exports.pay_qr = function(req, res){
	var user_id = req.params.userId;
	if(user_id){
		User.findOne({_id: user_id}, function(err, user){
			if(err || !user){
				return res.send({
					msg: "User does not exist in the database!"
				});
			}else{
				merchant_id = "618e2b22-f639-4d4f-8649-eca6179aca19";
				qrCode.toDataURL(merchant_id, function(err, url){
					if(err){
						return res.status(500).send({ msg: err.message });
					}
					res.render("pay", {"url": url, "id": user._id});
				});
			}
		});
	}else{
		return res.status(404).send({
			message: "Not Found."
		});
	}
}


exports.pay_amount = function(req, res){
	var user_id = req.params.userId;
	User.findOne({ _id: user_id }, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		res.render("pay_amount", {"user": user });
	});
}


exports.make_payment = function(req, res){
	var user_id = req.params.userId;
	var amnt = req.body.amount;
	User.findOne({_id: user_id}, function(err, user){
		if(err || !user){
			return res.send({
				msg: "User does not exist in the database!"
			});
		}else{
			if(req.body.tens){
				numb = amnt % 10;
				numbr = 10 - Number(numb);
				final_amount = Number(amnt) + Number(numbr);
				invested_amount = Number(final_amount) - Number(amnt);
				user.investment = user.investment + invested_amount;
				user.save(function(err){
					if(err){
						return res.status(500).send({
					   	    msg: err.message
					    });
					}
					res.render("thankyou", {"final": amnt, "invest": invested_amount, "user": user});
				})
				/*const formData = {
				  "requestID": randomString(),
				  "amount": {
				    "currency": "INR",
				    "amount": amnt
				  },
				  "transferCode": "ATLAS_P2M_AUTH",
				  "debitAccountID": user.accountId,
				  "creditAccountID": "618e2b22-f639-4d4f-8649-eca6179aca19",
				  "transferTime": new Date().getTime(),
				  "remarks": "Fund transfer test",
				  "attributes": {}
				}
				axios.post('https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers', formData)
				.then(function(response){
					console.log(response.data);
					axios.get(`https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${user.accountId}/balance`)
					.then(function(resp){
						console.log(resp.data);
						user.balance = resp.data.balance;
						user.save(function(err){
							if(err){
								return res.status(500).send({
							   	    msg: err.message
							    });
							}
							res.render("thankyou", {"final": amnt, "invest": invested_amount, "user": user});
						})
					})
				})
				.catch(function(error){
					console.log(error);
				})*/
			}else if(req.body.hundred){
				numb = amnt % 100;
				numbr = 100 - Number(numb);
				final_amount = Number(amnt) + Number(numbr);
				invested_amount = Number(final_amount) - Number(amnt);
				user.investment = user.investment + invested_amount;
				user.save(function(err){
					if(err){
						return res.status(500).send({
					   	    msg: err.message
					    });
					}
					res.render("thankyou", {"final": amnt, "invest": invested_amount, "user": user});
				})
				/*const formData = {
				  "requestID": randomString(),
				  "amount": {
				    "currency": "INR",
				    "amount": amnt
				  },
				  "transferCode": "ATLAS_P2M_AUTH",
				  "debitAccountID": user.accountId,
				  "creditAccountID": "618e2b22-f639-4d4f-8649-eca6179aca19",
				  "transferTime": new Date().getTime(),
				  "remarks": "Fund transfer test",
				  "attributes": {}
				}
				axios.post('https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers', formData)
				.then(function(response){
					console.log(response.data);
					axios.get(`https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${user.accountId}/balance`)
					.then(function(resp){
						console.log(resp.data);
						user.balance = resp.data.balance;
						user.save(function(err){
							if(err){
								return res.status(500).send({
							   	    msg: err.message
							    });
							}
							res.render("thankyou", {"final": amnt, "invest": invested_amount, "user": user});
						})
					})
				})
				.catch(function(error){
					console.log(error);
				})*/
			}else{
				final_amount = Number(amnt);
				user.investment = user.investment + 0;;
				user.save(function(err){
					if(err){
						return res.status(500).send({
					        msg: err.message
					    });
					}
					res.render("thankyou", {"final": amnt, "invest": 0, "user": user});
				});
			}
		}
	});
}


exports.passbook = function(req, res){
	var user_id = req.params.userId;
	User.findOne({ _id: user_id }, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		res.render("passbook", {"user": user });
	})
}

exports.payment_accept = function(req, res){
	var user_id = req.params.userId;
	User.findOne({ _id: user_id}, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		merchant_id = "618e2b22-f639-4d4f-8649-eca6179aca19";
		qrCode.toDataURL(merchant_id, function(err, url){
			if(err){
				return res.status(500).send({ msg: err.message });
			}
			res.render("payment_accept", {"img_url": url, "upi": user_upi});
		});
	});
}


exports.thanks = function(req, res){
	var user_id = req.params.userId;
	User.findOne({ _id: user_id}, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		res.render("thankyou");
	});
}

/*exports.create_wallet = function(req, res){
	var user_id = req.params.userId
	User.findOne({ _id: user_id}, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		firstname = user.name.split(" ")[0];
		dob = user.dob.toLocaleString().split(',')[0];

		res.render("create_wallet", {"user": user, "firstname": firstname, "dob": dob});
	});	
}


exports.create_wallet_account = function(req, res){
	var user_id = req.params.userId
	User.findOne({ _id: user_id}, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		
	});
}*/


exports.transfer_fund = function(req, res){
	var user_id = req.params.userId
	User.findOne({ _id: user_id}, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		firstname = user.name.split(" ")[0];
		dob = user.dob.toLocaleString().split(',')[0];

		res.render("transfer_fund", {"user": user});
	});	
}

function randomString() {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 20; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

exports.transfer_amount = function(req, res){
	const amount = req.body.amount;
	var user_id = req.params.userId
	User.findOne({ _id: user_id }, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}
		user.balance +=amount;
		user.save(function(err){
			if(err){
				return res.status(500).send({
			   	    msg: err.message
			    });
			}
			return res.redirect(`/dashboard/${user._id}`);
		})
		/*const formData = {
		  "requestID": randomString(),
		  "amount": {
		    "currency": "INR",
		    "amount": amount
		  },
		  "transferCode": "ATLAS_P2M_AUTH",
		  "debitAccountID": "618e2b22-f639-4d4f-8649-eca6179aca19",
		  "creditAccountID": user.accountId,
		  "transferTime": new Date().getTime(),
		  "remarks": "Fund transfer test",
		  "attributes": {}
		}
		axios.post('https://fusion.preprod.zeta.in/api/v1/ifi/140793/transfers', formData)
		.then(function(response){
			console.log(response.data);
			axios.get(`https://fusion.preprod.zeta.in/api/v1/ifi/140793/accounts/${user.accountId}/balance`)
			.then(function(resp){
				console.log(resp.data);
				user.balance = resp.data.balance;
				user.save(function(err){
					if(err){
						return res.status(500).send({
					   	    msg: err.message
					    });
					}
					return res.redirect(`/dashboard/${user._id}`);
				})
			})
		})
		.catch(function(error){
			console.log(error);
		})*/
	});
}