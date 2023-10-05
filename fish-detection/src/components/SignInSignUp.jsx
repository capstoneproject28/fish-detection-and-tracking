import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "../css/signup.css"

export default function SignInSignUp() {
	//signin to signup animation transition
	useEffect(() => {
		document.querySelector('.img__btn').addEventListener('click', function () {
			document.querySelector('.cont').classList.toggle('s--signup');
		});
	}, []);

	//register function
	const [rusername, setrUsername] = useState("");
	const [remail, setrEmail] = useState("");
	const [rpass, setrPass] = useState("");
	const [rpass2, setrPass2] = useState("");

	async function Register() {

		if (rpass != rpass2) {
			console.error("Error registering: passwords don't match");
		}

		const fd = new FormData()
		fd.append("username", rusername)
		fd.append("email", remail)
		fd.append("password", rpass)

		await axios
			.post("http://127.0.0.1:8000/api/register/", fd)
			.then((response) => {
				console.log(response.data);
				if (response !== null || "" || undefined) {
					navigation.navigate("/works");
				}
			})
			.catch((error) => {
				console.error("Error registering: ", error);
			});
	}

	//sign in function
	const [sUsername, setsUsername] = useState("");
	const [sPass, setsPass] = useState("");

	const SignIn = () => {
		if (sUsername !== "" && sPass !== "") {
			console.log("gets here")
			const formData = new FormData();
			formData.append("username", sUsername);
			formData.append("password", sPass);
			axios
				.post("http://127.0.0.1:8000/api/login/", formData)
				.then((response) => {
					console.log(response.data);
					let token = response.data;
					localStorage.setItem("uid", token.token);
					localStorage.setItem("username", token.username);
					console.log(token.token);
					if (token !== undefined || null) {
						//Navigate to the Detection Page
						navigation.navigate("/works");
						//window.location.reload();

					}
				})
				.catch((err) => {
					console.log("There was a: ", err);
				});
			setsName("");
			setsPass("");
		}
	};

	return (
		<>
			<div className="cont">
				<div className="form sign-in">
					<h2>Welcome back</h2>
					<label>
						<span>Username</span>
						<input type="email" onChange={(e) => { setsUsername(e.target.value) }} />
					</label>
					<label>
						<span>Password</span>
						<input type="password" onChange={(e) => { setsPass(e.target.value) }} />
					</label>
					<button type="button" className="submit" onClick={SignIn}>
						Sign In
					</button>
				</div>
				<div className="sub-cont">
					<div className="img">
						<div className="img__text m--up">
							<h2>New here?</h2>
							<p>Sign up and see beyond the surface with AquaVision!</p>
						</div>
						<div className="img__text m--in">
							<h2>One of us?</h2>
							<p>If you already have an account, just sign in. We've missed you!</p>
						</div>
						<div className="img__btn">
							<span className="m--up">Sign Up</span>
							<span className="m--in">Sign In</span>
						</div>
					</div>
					<div className="form sign-up">
						<h2>Welcome to AquaVision</h2>
						<br></br>
						<p>See Beyond the Surface with Aquavision: Precision Fish Tracking and Analysis.</p>
						<label>
							<span>Usernname</span>
							<input type="text" onChange={(e) => { setrUsername(e.target.value) }} />
						</label>
						<label>
							<span>Email</span>
							<input type="email" onChange={(e) => { setrEmail(e.target.value) }} />
						</label>
						<label>
							<span>Password</span>
							<input type="password" onChange={(e) => { setrPass(e.target.value) }} />
						</label>
						<label>
							<span>Re-enter Password</span>
							<input type="password" onChange={(e) => { setrPass2(e.target.value) }} />
						</label>
						<button type="button" className="submit" onClick={Register}>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</>
	);
}