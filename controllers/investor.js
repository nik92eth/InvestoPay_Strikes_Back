require("dotenv").config();
const { check, validationResult } = require("express-validator");
const User = require('../models/user');
const qrCode = require('qrcode');


exports.home = function(req, res){
	res.render("mobile_form");
}

exports.home_form = function(req, res){
	var user_mobile = req.body.mobile;
	User.findOne({ mobile: user_mobile }, function(err, user){
		if(user) {
			res.redirect(`/dashboard/${user._id}`);
		}else{
		user = new User({mobile: user_mobile, UPI: user_mobile+"@razorpay"});
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
	var city = req.body.city;
	var mob = req.params.mobile;
	User.findOne({ mobile: mob }, function(err, user){
			if(user){
				user.name = username
				user.dob = date_of_birth
				user.city = city
				user.save(function(err){
					if(err){
						return res.status(500).send({
				        msg: err.message
				      });
					}
					return res.redirect(`/dashboard/${user._id}`);
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
				data = {
					"name": user.name,
					"mobile_no": user.mobile,
					"upi_id": user.UPI
				}
				qrCode.toDataURL(JSON.stringify(data), function(err, url){
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
	res.render("pay_amount");
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
				});
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
					});
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
		user_upi = user.UPI;
		qrCode.toDataURL(user_upi, function(err, url){
			if(err){
				return res.status(500).send({ msg: err.message });
			}
			res.render("payment_accept", {"img_url": url, "upi": user_upi});
		});
	});
}


exports.add_amount = function(req, res){
	return res.render('add_money');
}


exports.add_money = function(req, res){
	var user_id = req.params.userId;
	var amount = req.body.amount;
	console.log(amount);
	User.findOne({_id: user_id}, function(err, user){
		if(err || !user){
			return res.json({
				msg: "User does not exist in the database!"
			});
		}else{
			user.balance = Number(user.balance) + Number(amount);
			user.save(function(err){
				if(err){
					return res.status(500).send({
				   	    msg: err.message
				    });
				}
				return res.redirect(`/dashboard/${user._id}`);
			})
		}
	})
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