import { dbService } from 'fbase';
import React, { useEffect, useState } from "react";
import Yuweet from "components/Yuweet";
import YuweetFactory from 'components/YuweetFactory';

const Home = ({ userObj }) => {
	const [yuweets, setYuweets] = useState([]);

	useEffect(() => {
		dbService
			.collection("yuweets")
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) => {
			const yuweetArray = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
				})
			);
			setYuweets(yuweetArray);
		});
	}, []);
	
	return (
		<div className="container">
			<YuweetFactory userObj={userObj} />
			<div style={{ marginTop: 30 }}>
				{yuweets.map(yuweet => (
					<Yuweet 
						key={yuweet.id} 
						yuweetObj={yuweet}
						isOwner={yuweet.creatorId === userObj.uid}
					/> 
				))}
			</div>
		</div>
	);
};

export default Home;