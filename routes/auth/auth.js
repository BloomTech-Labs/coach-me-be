const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const client_db = require("../../models/client-model");
const coach_db = require("../../models/coach-models");
const user_model = require("../../models/user-model");
const user_db = new user_model();
const httpError = require("http-errors");
const sgMail = require("@sendgrid/mail");
const access = require("../../middleware/auth/globalPriv");

router.post('/register', require("../../middleware/auth/RegisterErrorHandler")(), async (req, res, next)=>{
    try {
        const {user_type} = req.query;
        const user = await client_db.getUserByEmail(req.body.email, user_type);
        if(user) return res.status(409).json("There is an account associated with your email address. Try logging in.");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        switch(user_type){
            case 'client':
                await client_db.addClient({
                    ...req.body,
                    password: hashedPassword
                });
                return res.json('success');
            case 'coach':
                await coach_db.addCoach({
                    ...req.body,
                    password: hashedPassword
                })
                return res.json('success');
            default:
                throw new httpError(400, "user_type query value must be provided. (e.g: /auth?user_type='coach'")
        }
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
	try {
		if (req.session?.passport?.user)
			return res.redirect(
				`/api/${req.query.user_type}/${req.session.passport.user.id}`
			);
		passport.authenticate(
			"local",
			{ userProperty: "email" },
			(err, user, info) => {
				if (!user) return res.json(info.message);
				req.login(user, function (error) {
					if (error) throw error;
					res.json("Login successful");
				});
			}
		)(req, res, next);
	} catch (error) {
		next(error);
	}
});
router.post("/logout", async (req, res, next) => {
	try {
		req.session.destroy();
		return res.json("Logged out successfully.");
	} catch (error) {
		next(error);
	}
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "https://www.googleapis.com/auth/user.birthday.read"],
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/api/auth/logout" }),
	(req, res) => {
		res.writeHead(302, {
			Location: `${process.env.CLIENT_URL}/dashboard`,
		});
		res.end();
	}
);

router.get(
	"/facebook",
	passport.authenticate("facebook", {
		scope: ["email", "user_birthday", "user_gender"],
	})
);

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", { failureRedirect: "/api/auth/logout" }),
	async (req, res, next) => {
		try {
			const registeredUser = await user_db.getUserByFacebookId(req.user?.id);
			if (registeredUser) {
				//login
				res.status(200).json("Login successful");
			} else {
				//register
				const names = req.user.displayName.split(" ");
				client_db.addClient({
					facebook_id: req.user.id,
					first_name: names[0],
					last_name: names[names.length - 1],
					registration_complete: false,
				});
				res.status(201).json("User registration started");
			}
		} catch (err) {
			next(err);
		}

		res.status(200).json({ user_data: req.user });
	}
);

router.post("/forgot_password", async (req, res, next) => {
	try {
		const { method, user_type, cred_value } = req.body;
        const user = method === "phone" ? await user_db.getUserByPhone(cred_value, user_type) : await client_db.getUserByEmail(cred_value, user_type);
        if(!user) return res.status(404).json('If an email or phone number was associated to the credentials you provided, a reset link will be sent.')
		const token = await client_db.generateRecoveryToken(user.id, user_type);
		switch (method) {
			case "phone":
				const twilioSID = process.env.TWILIO_SID;
				const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
				const smsClient = require("twilio")(twilioSID, twilioAuthToken);
				await smsClient.messages.create({
					body: `You requested a password reset. Reset your password <a href="${process.env.CLIENT_URL}/${token}"> here. </a> If you did not request this reset do not click the link and let us know.`,
					from: "+12058786652",
					to: `+1${user.phone}`,
				});
				return res.json(
					"If an email or phone number was associated to the credentials you provided, a reset link will be sent."
				);
			case "email":
				if (!user)
					return res.json(
						"If an email or phone number was associated to the credentials you provided, a reset link will be sent."
					);
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				const msg = {
					to: user.email,
					from: "noreply-password@coachme.org",
					subject: `Reset your CoachMe password.`,
					text: "You requested a password reset from Coachme.org?",
					html: `<strong>Yoyoyo. Reset your password <a href="${process.env.CLIENT_URL}/${token}">Here</a></strong>`,
				};
				sgMail.send(msg);
				return res.json(
					"If an email or phone number was associated to the credentials you provided, a reset link will be sent."
				);
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

router.post(
	"/forgot_password/password_recovery",
	access.validateRecoveryToken,
	async (req, res, next) => {
		try {
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
