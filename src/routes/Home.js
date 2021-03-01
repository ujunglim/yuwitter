import React from "react";
import Yuweet from "components_view/Yuweet";
import YuweetFactory from 'components_view/YuweetFactory';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';

export default function Home() {
	const {yuweets:{list}} = useYuweets();
	// console.log(list);
	return (
		<div>
			<YuweetFactory />
			<Shared.Container>
				<div style={{ marginTop: 30 }}>
					{list.map(({id, displayName, photoURL, isOwner, text, attachmentUrl, email}) => (
						<Yuweet 
							key={id} 
							id={id}
							displayName={displayName}
							photoURL={photoURL}
							text={text}
							attachmentUrl={attachmentUrl}
							email={email}
							isOwner={isOwner}
						/> 
					))}
				</div>
			</Shared.Container>
		</div>
	);
};



