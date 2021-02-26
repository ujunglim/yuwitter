import React from "react";
import Yuweet from "components_view/Yuweet";
import YuweetFactory from 'components_view/YuweetFactory';
import { Shared } from 'components_view/CommonStyle';
import { useAuth } from '../components_controll/ProvideAuth';
import { useYuweets } from 'components_controll/ProvideYuweets';


export default function Home() {
	const {userObj} = useAuth();
	const {yuweets} = useYuweets();

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



