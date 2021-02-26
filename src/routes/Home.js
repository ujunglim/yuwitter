import { dbService } from 'fbase';
import React, { useEffect, useState } from "react";
import Yuweet from "components/Yuweet";
import YuweetFactory from 'components/YuweetFactory';
import { Shared } from 'components/CommonStyle';
import { useAuth } from './Auth';


export default function Home() {
  const {userObj} = useAuth();
	const [yuweets, setYuweets] = useState([]);

	useEffect(() => {
		dbService
			.collection("yuweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
				console.log('getPost on snapshot');
				const yuweetArray = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
					})
				);
				setYuweets(yuweetArray);
			});
	}, []);
		
	return (
		<div>
			<YuweetFactory />
			<Shared.Container>
				<div style={{ marginTop: 30 }}>
					{yuweets.map(yuweet => (
						<Yuweet 
							key={yuweet.id} 
							yuweetObj={yuweet}
							isOwner={yuweet.creatorId === userObj.uid}
						/> 
					))}
				</div>
			</Shared.Container>
		</div>
		
	);
};



