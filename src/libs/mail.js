'use strict'
const express = require('express');
const mailer = require('express-mailer');
const path = require("path");
var app = new (require(path.resolve(path.join(__dirname ,".." + "/" + "index.js"))).index)()._app;

// mailer.extend(app,{
// 	from:"no-reply@talkk.ai",
// 	host:"email-smtp.us-east-1.amazonaws.com",
// 	secureConnection: false,
// 	port: 587,
// 	transportMethod: 'SMTP',
// 	auth: {
// 		user: 'AKIAILWP4MBH6UZCMTIQ',
// 		pass: 'Amo3phintD8JMMFP7gGYkWQwDodaNzXrtI2SNWXLkISA'
// 	},
// 	xMailer:"Gray Matrix Solution Private Limited",
// 	identityString:"Talkk.ai"
// });

// mailer.extend(app,{
// 	from:"asi@esoft.co.za",
// 	host:"mail.esoft.co.za",
// 	secureConnection: false,
// 	port: 587,
// 	transportMethod: 'SMTP',
// 	auth: {
// 		user: 'asi@esoft.co.za',
// 		pass: 'P@ssword01'
// 	},
// 	xMailer:"ASI Financial Services",
// 	identityString:"asi@esoft.co.za"
// });


// mailer.extend(app,{
// 	from:"ask@assegai.co.za",
// 	host:"mail.assegai.co.za",
// 	secureConnection: false,
// 	port: 587,
// 	transportMethod: 'SMTP',
// 	auth: {
// 		user: 'ask@assegai.co.za',
// 		pass: 'P@ssword01'
// 	},
// 	xMailer:"ASI Financial Services",
// 	identityString:"ask@assegai.co.za"
// });

// mailer.extend(app,{
// 	from:"tawheed.khan@graymatrix.com",
// 	host:"smtp.graymatrix.com",
// 	secureConnection: false,
// 	port: 587,
// 	transportMethod: 'SMTP',
// 	auth: {
// 		user: 'tawheed.khan@graymatrix.com',
// 		pass: 'Jpf(mMr3'
// 	},
// 	xMailer:"ASI Financial Services",
// 	identityString:"asi.esoft.co.za"
// });
// mailer.extend(app,{
// 	from:"epod@esoft.co.za",
// 	host:"mail.esoft.co.za",
// 	secureConnection: false,
// 	port: 587,
// 	transportMethod: 'SMTP',
// 	auth: {
// 		user: 'epod@esoft.co.za',
// 		pass: 'P@ssword01'
// 	},
// 	xMailer:"ASI Financial Services",
// 	identityString:"asi.esoft.co.za"
// });



mailer.extend(app,{
	from:"mail.esoft.co.za",
	host:"smtp.gmail.com",
	secureConnection: false,
	port: 587,
	transportMethod: 'SMTP',
	auth: {
		user: 'reachesoft@gmail.com',
		pass: 'matrix@1234'
	},
	xMailer:"Minipos",
	identityString:"Minipos"
});

function sendMail(){}

sendMail.send = function(to,templete,subject,callback,local={},cc=null,bcc=null,replyTo=null,headers={},attachments=[]){
	local.hostname = app.get("host");
	var options = {
		to:to,
		subject:subject,
		identityString:"Gray Matrix Solution Private Limited",
		headers:{"x-powered-By":"Gray Matrix Solution Private Limited"},
		otherProperty:local
	};
	if(cc!=null)
		options.cc = cc;
	if(bcc!=null)
		options.bcc = bcc;
	if(replyTo!=null)
		options.replyTo = replyTo;
	for(var k in headers){
		options.headers[k]=headers[k];
	}
	if(attachments.length)
		options.attachments = attachments;
	app.mailer.send(templete,options,function(err){
		if(err)
		{
			console.log(err);
			callback(err,null);
		}else{
			console.log("3");
			callback(null,"Success");
		}
	});
}

module.exports.mail = sendMail;

