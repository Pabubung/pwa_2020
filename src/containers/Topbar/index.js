import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from '../../components/uielements/icon';
import appActions from '../../redux/app/actions';
import { AppHolder, Toolbar, IconButtons, TopbarComponents } from './style';
import Typography from '../../components/uielements/typography';
import TopbarUser from './topbarUser';

import themeActions from "../../redux/themeSwitcher/actions";
import SecondarySidebar from "../SecondarySidebar";
import TopbarNotification from "./sidebarNotification";

const { toggleCollapsed } = appActions;
const { switchActivation } = themeActions;

class Topbar extends Component {
	render() {
		const { toggleCollapsed, locale, url, customizedTheme, switchActivation } = this.props;
		const propsTopbar = { locale, url };
		return (
			<AppHolder className={"topbar_div_2020"}>
				<Toolbar
					style={{
						paddingLeft: '30px',
						minHeight: '64px',
						background: '#ffffff',
						// background: customizedTheme.topbarTheme,
					}}
				>
					<IconButtons
						id="topbarCollapsed"
						aria-label="open drawer"
						onClick={toggleCollapsed}
						className="right"
						style={{
						// background: '#666666',
						color:'#666666'
						// background: customizedTheme.topbarTheme,
					}}
					>
						<Icon>menu</Icon>					
					</IconButtons>
					<Typography className="topbar" >Portal Mobile DXG</Typography>
					<TopbarComponents>
						<ul className="topbarItems">
							{/* <li className="topbarUser">
								<TopbarUser {...propsTopbar} />
							</li> */}
							<li className="topbarNotification">
								<div>
								<IconButtons aria-label="Add to shopping cart" style={{color:'#666666'}}>
									<Icon
									onClick={() => switchActivation("notification")}
									style={{ matginTop: 5 }}
									>notifications</Icon>
									<SecondarySidebar
										InnerComponent={TopbarNotification}
										currentActiveKey="notification"
										{...propsTopbar}
									/>
								</IconButtons>
								{/* <Icon
									onClick={() => switchActivation("notification")}
									style={{ matginTop: 5 }}
								>
									notifications
								</Icon>
								<SecondarySidebar
									InnerComponent={TopbarNotification}
									currentActiveKey="notification"
									{...propsTopbar}
								/> */}
								</div>
							</li>
						</ul>
						
					</TopbarComponents>
					{/* <IconButtons aria-label="Add to shopping cart" style={{color:'#666666'}}>
						<Icon>crop_free</Icon>
					</IconButtons>
					<IconButtons aria-label="Add to shopping cart" style={{color:'#666666'}}>
						<Icon
						onClick={() => switchActivation("notification")}
						style={{ matginTop: 5 }}
						>notifications</Icon>
						<SecondarySidebar
							InnerComponent={TopbarNotification}
							currentActiveKey="notification"
							{...propsTopbar}
						/>
					</IconButtons> */}
				</Toolbar>
			</AppHolder>
		);
	}
}

export default connect(
	state => ({
		...state.App,
		locale: state.LanguageSwitcher.language.locale,
		customizedTheme: state.ThemeSwitcher.topbarTheme,
	}),
	{ toggleCollapsed, switchActivation }
)(Topbar);
