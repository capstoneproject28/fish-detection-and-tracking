import React, { useEffect, useState } from 'react';

export default function Authentication() {

	useEffect(() => {
		if (localStorage.getItem('username') == null || localStorage.getItem('uid') == null) 
			navigation.navigate("/login");
	});

}