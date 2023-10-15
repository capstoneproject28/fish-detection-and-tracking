import React, { useEffect, useState } from 'react';
import axios from 'axios'
import "../css/signup.css"

export default function SignInSignUp() {
	//signin to signup animation transition
	useEffect(() => {
		const toggleButton = document.querySelector('.img__btn');
		toggleButton.addEventListener('click', function () {
			document.querySelector('.cont').classList.toggle('s--signup');
			setErrorMessage(""); // Clear the error message when toggling
		});
	
		// Make sure to cleanup (remove) the event listener on component unmount
		return () => {
			toggleButton.removeEventListener('click');
		}
	}, []);	

	//register function
	const [errorMessage, setErrorMessage] = useState("");
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
					navigation.navigate("/history");
				}
			})
			.catch((error) => {
				console.error("Error registering: ", error);
				setErrorMessage("Error during registration. Please try again.");
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
						navigation.navigate("/upload");
						//window.location.reload();

					}
				})
				.catch((err) => {
					console.log("There was a: ", err);
					setErrorMessage("Invalid username or password.");
				});
			setsName("");
			setsPass("");
		}
	};

	return (
		<>
			<div className="cont">
				<div className="form sign-in">
					<img className="logo" src="../src/assets/LogoTop.png"></img>
					<label>
						<span>Username</span>
						<input type="email" onChange={(e) => { setsUsername(e.target.value); setErrorMessage(""); }} />
					</label>
					<label>
						<span>Password</span>
						<input type="password" onChange={(e) => { setsPass(e.target.value); setErrorMessage(""); }} />
					</label>
					{errorMessage && <p className="error-message">{errorMessage}</p>}
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
						<img className="logo" src="../src/assets/LogoTop.png"></img>
						<label>
							<span>Username</span>
							<input type="text" onChange={(e) => { setrUsername(e.target.value); setErrorMessage(""); }} />
						</label>
						<label>
							<span>Email</span>
							<input type="email" onChange={(e) => { setrEmail(e.target.value); setErrorMessage(""); }} />
						</label>
						<label>
							<span>Password</span>
							<input type="password" onChange={(e) => { setrPass(e.target.value); setErrorMessage(""); }} />
						</label>
						<label>
							<span>Re-enter Password</span>
							<input type="password" onChange={(e) => { setrPass2(e.target.value); setErrorMessage(""); }} />
						</label>
						{errorMessage && <p className="error-message">{errorMessage}</p>}
						<button type="button" className="submit" onClick={Register}>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</>
	);
}