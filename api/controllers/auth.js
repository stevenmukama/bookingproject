import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { baseUrl } from '../utils/baseUrl.js';
import nodemailer from 'nodemailer';

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser = new User({
			...req.body,
			password: hash,
		});

		await newUser.save();
		res.status(200).send('User has been created.');
	} catch (err) {
		next(err);
	}
};
export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return next(createError(404, 'User not found!'));

		const isPasswordCorrect = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect)
			return next(createError(400, 'Wrong password or username!'));

		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin },
			process.env.JWT
		);

		const { password, isAdmin, ...otherDetails } = user._doc;
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json({ details: { ...otherDetails }, isAdmin });
	} catch (err) {
		next(err);
	}
};

//forgotpassword
export const forgotPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: '3h',
			});
			user.resetToken = token;
			await user.save();

			const transporter = nodemailer.createTransport({
				host: 'smtp.forwardemail.net',
				port: 465,
				secure: true,
				auth: {
					user: 'YOUR-NODEMAILER-EMAIL',
					pass: 'YOUR-NODEMAILER-PASSWORD',
				},
			});

			await transporter.sendMail({
				from: '"Bookingroom" <your@email.com>',
				to: `${user.name} <${user.email}>`,
				subject: 'Password Reset',
				html: `<p>Please Click the following link to reset your password:</p>
        				<a href="${baseUrl()}/reset-password/${token}" >Reset Password</a>
        `,
			});

			res.send({ message: 'We Sent a reset password link to your email' });
		} else {
			res.status(404).send({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).send({ message: 'Internal Server Error' });
	}
};

// reset-password
export const resetPassword = async (req, res) => {
	jwt.verify(
		req.body.token,
		process.env.JWT_SECRET,
		async (err, decode) => {
			if (err) {
				res.status(401).send({ message: 'Invalid Token' });
			} else {
				const user = await User.findOne({ resetToken: req.body.token });
				if (user) {
					if (req.body.password) {
						user.password = bcrypt.hashSync(req.body.password, 8);
						await user.save();
						res.send({
							message: 'Password reseted successfully',
						});
					}
				} else {
					res.status(404).send({ message: 'User not found' });
				}
			}
		}
	);
};
