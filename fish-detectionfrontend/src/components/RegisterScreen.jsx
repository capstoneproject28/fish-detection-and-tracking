import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import "../css/register.css"
import "../css/global.css"

function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [pass2, setPass2] = useState("");

	async function Register() {
		const fd = new FormData()
		fd.append("username", username)
		fd.append("email", email)
		fd.append("password", pass)

		await axios
			.post("http://127.0.0.1:8000/api/register/", fd)
			.then((response) => {
				console.log(response.data);
				if (response !== null || "" || undefined) {
					useNavigate().navigate("/");
				}
			})
			.catch((error) => {
				console.error("Error registering: ", error);
			});
	}

	return (
		<div className="app">
			<div class="mainContent">
				<div class="left">
					<img class="logo" src="../src/assets/logo/fullLogoBlue.png" />
				</div>
				<div class="right">
					<h1>Welcome to AquaVision</h1>
					<h3>See Beyond the Surface with Aquavision: Precision Fish Tracking and Analysis.</h3>
					<div class="formFormat">
						<input type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}></input>
						<input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}></input>
						<input type="password" placeholder="Password" onChange={(e) => { setPass(e.target.value) }}></input>
						<input type="password" placeholder="Re-Enter Password" onChange={(e) => { setPass2(e.target.value) }}></input>
						<input type="submit" placeholder="Re-Enter Password" onClick={Register}></input>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterScreen;
