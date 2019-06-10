import React from "react";
import { Layout, Container } from "../components";
import styled from "styled-components";


const Content = styled(Container)`
	line-height: 1.42;
	ul li {
		line-height: 1.42;
	}
	h1.title {
		font-size: 2.4rem;
	}
	h1 {
		font-size: 1.4rem;
		margin-top: 2rem;

	}
	h2 {
		font-size: 1.2rem;
	}
	h3 {
		font-size: 1.1rem;
		display: flex;
		justify-content: space-between;
	}
`;

class Resume extends React.Component {

	constructor(props) { 
		super(props);
	}

	render() {
		return (
			<Layout pathname={this.props.location.pathname}>
				<Content type="text">
					<h1 className="title">Kyle Karpack</h1>
					<p>Seattle, WA</p>

					<p>I am an experienced software engineer specializing in front-end development for large applications. I have experience
						across the product development lifecycle from leading teams and making business-critical product design decisions to
						architecting scalable software and building world-class user experiences.</p>
					<h1>SKILLS</h1>
					<ul className="small">
						<li><b>Languages</b>: JavaScript, Typescript, CSS, SCSS, HTML, SQL, C#</li>
						<li><b>Platforms</b>: Angular, AngularJS, React, NodeJS, .NET, Azure, AWS, WordPress, Ionic, GraphQL, ElasticSearch</li>
						<li><b>Tooling</b>: Webpack, NPM/Yarn, Karma, Jasmine, Protractor, Git, Gulp, Jira, TeamCity, Adobe Photoshop</li>
					</ul>
					<h1>PROFESSIONAL EXPERIENCE</h1>
					<h2>Net-Inspect LLC, Kirkland, WA</h2>
					<h3><i>Lead Front-End Engineer </i>August 2018 - Present</h3>
					<p>Leading a team of developers building the top SaaS application for manufacturing quality management. In addition to
						previous duties, this role includes:</p>
					<ul className="small">
						<li>Completion and launch of a full rewrite of the application in AngularJS and Angular</li>
						<li>Responsibility for architectural decisions, sprint planning, mentoring junior developers, and interviewing
							candidates</li>
						<li>Implementation of regular code reviews, code quality standards, automated testing, extensive documentation, and
							performance budgets to reduce bugs and improve developer productivity</li>
						<li>Migration to Microsoft Azure to reduce costs and provide scalability</li>
					</ul>
					<h3><i>Software Engineer</i> January 2014 - July 2018</h3>
					<p>Built and maintained the Net-Inspect application. Accomplishments include:</p>
					<ul className="small">
						<li>Implementation of modern development system including SCSS, Webpack, TypeScript, and continuous integration</li>
						<li>Construction of a robust set of reusable interface components</li>
						<li>Design and development of innovative new products including capability scoring, supply chain risk mapping, and
							electronic source inspection</li>
						<li>Development of dozens of database procedures and RESTful API endpoints for controlled access to data</li>
					</ul>
					<h3><i>Software Engineering Intern</i> March 2013 - December 2013</h3>
					<p>Made major contributions to the application and began implementation of various modern web technologies at
						Net-Inspect</p>
					<h2>Reach Networks, Kirkland, WA</h2>
					<h3><i>Web Design Intern</i> June 2012 - September 2012</h3>
					<p>Performed front-end web development for a collection of 200 educational websites</p>
					<h1>EDUCATION</h1>
					<h2>University of Washington, Seattle, WA</h2>
					<h3>
						<i>B.S.E., Human-Centered Design and Engineering</i>
					</h3>
					<p>Bachelor’s of Science in Engineering with a focus in Human-Computer Interaction</p>
				</Content>
			</Layout>
		);
	}

}

export default Resume;