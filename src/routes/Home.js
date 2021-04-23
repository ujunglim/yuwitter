import React from "react";
import Yuweet from "components_view/Yuweet";
import YuweetFactory from 'components_view/YuweetFactory';
import { Shared } from 'components_view/CommonStyle';
import { useYuweets } from 'components_controll/ProvideYuweets';
import styled from 'styled-components';

export default function Home() {
	const {yuweets:{list}} = useYuweets();

	return (
		<HomeContainer>
			<YuweetFactory />
			<YuweetList>
				<div>
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
			</YuweetList>
		</HomeContainer>
	);
};

//================= Styled Components ====================
const HomeContainer = styled(Shared.Container)`
	overflow-y: hidden;
	align-items: center;
`;

const YuweetList = styled(Shared.Container)`
`;


