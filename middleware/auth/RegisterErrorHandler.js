function clientAuthErrorHandler(type = "client") {
	return (req, res, next) => {
		const {
			first_name,
			last_name,
			email,
			phone,
			password,
			confirm_password,
			height,
			sex,
		} = req.body;
		// Regular expression that tests if the password is strong enough
		// ^ = String starts
		// (?=.*[a-z]) contains any lowercase alphabetical char from a-z
		// (?=.*[A-Z]) contains any uppercase alphabetical char from A-Z
		// (?=.*[0-9]) contains any number
		// (?=.*[!@#\$%\^&\*]) contains any special character
		// (?=.{8,}) string length of at lest 8 characters (You can add a second number to have the length be between those)
		const passRegex = new RegExp(
			"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		// All of this could probably move to a middleware later. Checking required fields are there,
		// Checking if passwords match, checking if pass is strong enough. We could have Detailed error messages
		// and do password checks for each field.
		if (!height || (!sex && type === "client")) {
			return res.status(400).json("All fields must be filled!");
		}
		if (
			!first_name ||
			!last_name ||
			!email ||
			!phone ||
			!password ||
			!confirm_password
		) {
			console.log("getting here?");
			return res.status(400).json("All fields must be filled!");
		}
		if (password !== confirm_password) {
			return res.status(400).json("Passwords do not match.");
		}
		if (!passRegex.test(password)) {
			return res
				.status(400)
				.json(
					"Password must contain at least 8 characters, one upper case alphabetical character, and a number."
				);
		}
		next();
	};
}

module.exports = clientAuthErrorHandler;
