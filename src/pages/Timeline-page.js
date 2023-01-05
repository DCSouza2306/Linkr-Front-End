import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GeneralPost from '../components/General-Post';
import Header from '../components/Header';
import { URL_BASE } from '../constants/url';

export default function TimelinePage(params) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get(`${URL_BASE}/posts`)
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => {
				console.log(err.data);
			});
	}, []);

	return (
		<>
			<Header />
			<Wrapper>{posts.map(GeneralPost)}</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	background-color: #333333;
	padding-top: 100px;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;