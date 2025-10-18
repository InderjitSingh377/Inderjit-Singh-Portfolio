import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// import components
import DownloadButton from '../common/components/DownloadButton/DownloadButton';
import IconButton from '../common/components/IconButton/IconButton';
import InputField from '../common/components/InputField/InputField';
import TextAreaField from '../common/components/TextAreaField/TextAreaField';
import SubmitButton from '../common/components/SubmitButton/SubmitButton';
import Loader from '../common/components/Loader/Loader';
import cv from '../assets/files/cv.pdf';

// import icons
import { FaReact } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin, AiFillHtml5, AiOutlineEye } from "react-icons/ai";
import { BiLogoGmail, BiLogoCss3, BiLogoJavascript, BiLogoRedux, BiLogoJava, BiPowerOff, BiLogoSpringBoot, BiLogoBlogger } from "react-icons/bi";
import { BsFacebook, BsGit, BsInstagram, BsPuzzle } from "react-icons/bs";
import { TbBrandCpp, TbBrandMysql } from "react-icons/tb";
import { FaMobileAlt } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { SiTypescript, SiRecoil, SiReactquery, SiVite, SiSpring, SiNextbilliondotai, SiNextdotjs } from "react-icons/si";

//import images
import Ataa from '../assets/images/screenshottimetable.png';
import Elzero from '../assets/images/screenshotagecalculator.png';
import Kasper from '../assets/images/Kasper.png';
import Leon from '../assets/images/Screenshotbloodbank.png';
import SokoNumber from '../assets/images/screenshot1.png';
import GlobalShare from '../assets/images/screenshotgym.png';

// import style
import style from './App.module.css';
import clsx from 'clsx';

const skills = [
	{
		name: 'HTML 5',
		icon: <AiFillHtml5 size="25px" color="white" />,
		cssName: "html"
	},
	{
		name: 'CSS 3',
		icon: <BiLogoCss3 size="25px" color="white" />,
		cssName: "css"
	},
	{
		name: 'Java Script',
		icon: <BiLogoJavascript size="25px" color="white" />,
		cssName: "java-script"
	},
	{
		name: "TypeScript",
		icon: <SiTypescript size="25px" color="white" />,
		cssName: "type-script"
	},
	{
		name: 'React',
		icon: <FaReact size="25px" color="white" />,
		cssName: "react"
	},
	{
		name: 'Redux ToolKit',
		icon: <BiLogoRedux size="25px" color="white" />,
		cssName: "redux"
	},
	{
		name: 'Redux Recoil',
		icon: <SiRecoil size="25px" color="white" />,
		cssName: "recoil"
	},
	{
		name: 'React Query',
		icon: <SiReactquery size="25px" color="white" />,
		cssName: "react-query"
	},
	{
		name: 'PowerBI',
		icon: <BiPowerOff size="25px" color="white" />,
		cssName: "redux"
	},
	{
		name: 'Vite',
		icon: <SiVite size="25px" color="white" />,
		cssName: "responsive"
	},
	{
		name: 'Next.js',
		icon: <SiNextdotjs size="25px" color="white" />,
		cssName: "responsive"
	},
	{
		name: 'Git & GitHub',
		icon: <BsGit size="25px" color="white" />,
		cssName: "git"
	},
	{
		name: 'Java',
		icon: <BiLogoJava size="25px" color="white" />,
		cssName: "java"
	},
	{
		name: 'MySQL',
		icon: <TbBrandMysql size="25px" color="white" />,
		cssName: "cpp"
	},
	
	{
		name: 'Spring-Boot',
		icon: <SiSpring size="25px" color="white" />,
		cssName: "problem-solving"
	}
];

const projects = [
	{
		name: 'INDER-GYM-MANAGEMENT-SYSTEM',
		
		github: 'https://github.com/InderjitSingh377/INDER-GYM-MANAGEMENT-SYSTEM-USING-JAVA',
		description: 'A Gym Management System (GMS) is a special type of software created to cater to the needs of a particular fitness center. It aids in the proper maintenance of a member’s records. The application helps associated staff and even owners in keeping track of all members which includes tracking memberships, renewals as well as streamlining operations. In this project, we construct a simple yet effective desktop GUI application using Java Swing.',
		image: GlobalShare
	},
	{
		name: `TIME-TABLE-MANAGEMENT-SYSTEM`,
		
		github: 'https://github.com/InderjitSingh377/Time-Table-Generator-with-java.git',
		description: "This application is a simple, intuitive Project Timetable Generator. Users input their project's tasks, estimated durations, and dependencies, and the tool automatically processes this data to generate a clear, organized schedule or timeline. It helps project managers and teams plan effectively, visualize critical paths, and ensure all milestones are tracked and completed on time.",
		image: Ataa
	},
	{
		name: 'STUDENT-MANAGEMENT-SYSTEM',
		github: 'https://github.com/InderjitSingh377/Student_Management_System.git',
		description: 'This project is a comprehensive Student Management System (SMS) designed to centralize and streamline administrative tasks within an educational environment. It provides secure modules for managing student enrollment, academic records, attendance tracking, and grade reporting. The system improves efficiency by offering a single source of truth for student data, facilitating better communication between faculty, students, and parents, and simplifying day-to-day operational management.',
		image: SokoNumber
	},
	{
		name: 'INDER-BLOOD-BANK-SYSTEM',
		
		github: 'https://github.com/InderjitSingh377/INDER-Blood-Bank-System.git',
		description: 'This project develops a Blood Bank Management System designed to optimize the process of blood donation, inventory tracking, and distribution. The system securely manages donor profiles, tracks the status and availability of various blood types in real-time, and facilitates organized requests from hospitals. Its primary goal is to ensure the efficient management of blood resources and accelerate the matching of vital blood supplies to patient needs, ultimately saving lives.',
		image: Leon
	},

	{
		name: 'CALCULATOR-YOUR-AGE',
		
		github: 'https://github.com/InderjitSingh377/Calculate-your-Age.git',
		description: 'This is a quick and precise Age Calculator application. Simply enter your date of birth in the field and click Calculate to instantly view your current age, broken down into years, months, and days.',
		image: Elzero
	},
	
]

function App() {
	const form = useRef();

	const [menu, setMenu] = useState(false);
	const [loading, setLoading] = useState(false);

	const sendEmail = (e) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(function () {
			emailjs.sendForm('service_gjbmeus', 'template_qk6p0pa', form.current, 'HDMwz57k3xrihLg4J')
				.then((result) => {
					e.target.name.value = '';
					e.target.email.value = '';
					e.target.message.value = '';
				});
			setLoading(false);
		}, 2000);

	};

	return (
		<div className={style.app}>
			{/* Navbar */}
			<div className={style.nav}>
				<a className={style.logo}>
					<FaReact color='var(--primary-main)' size='50px' />
					<h5>INDER</h5>
				</a>
				<ul>
					<li><a href="#Home">Home</a></li>
					<li><a href="#About">About</a></li>
					<li><a href="#Projects">Projects</a></li>
					<li><a href="#Contact">Contact</a></li>
				</ul>
				<div className={style["menu-icon"]}>
					<input id='checkbox' className={style["checkbox2"]} type="checkbox" />
					<label className={`${style.toggle} ${style.toggle2}`} for="checkbox" onClick={() => setMenu(!menu)}>
						<div className={`${style.bars} ${style.bar4}`}></div>
						<div className={`${style.bars} ${style.bar5}`}></div>
						<div className={`${style.bars} ${style.bar6}`}></div>
					</label>
				</div>
			</div>
			{
				menu === true &&
				<ul className={style.menu}>
					<li><a href="#Home">Home</a></li>
					<li><a href="#About">About</a></li>
					<li><a href="#Projects">Projects</a></li>
					<li><a href="#Contact">Contact</a></li>
				</ul>
			}

			{/* Home */}
			<div id='Home' className={style.home}>
				<div className={style["home-content"]}>
					<h1>HEY, I'M Inderjit Singh</h1>
					<p> <b>Frontend development</b> involves building the user-facing parts of websites and applications, 
						focusing on design.
						 <b>Backend development</b> focuses on the server-side of applications, handling databases,
						  user authentication, and the logic that users don't see but makes an application 
						  function.</p>		
					<a
						href={cv}
						download="cv-PDF-document"
						target="_blank"
						rel="noopener noreferrer"
					>
						<DownloadButton >
							Download CV
						</DownloadButton>
					</a>
				</div>
				<div className={style["scroll-icon"]}>
					<div className={style["scroll-down"]} style={{ color: "skyblue !important" }}>
						<div className={style.chevrons}>
							<div className={style["chevron-down"]}></div>
							<div className={style["chevron-down"]}></div>
						</div>
					</div>
				</div>
				<div className={style["contact-nav"]}>
					<a className={style.github} target="_blank" href='https://github.com/InderjitSingh377' >
						<AiFillGithub size="30px" color='black' />
					</a>
					<a className={style.linkedin} target="_blank" href='https://www.linkedin.com/in/inderjit-singh-73b297141/' >
						<AiFillLinkedin size="30px" color='black' />
					</a>
					<a className={style.blogger} target="_blank" href="https://codewithinderr.blogspot.blog/" >
						<BiLogoBlogger size="30px" color='black' />
					</a>
					<a className={style.instagram} target="_blank" href='https://www.instagram.com/codewithinder__13' >
						<BsInstagram size="30px" color='black' />
					</a>
				</div>
			</div>

			{/* About */}
			<div id='About' className={style.about}>
				<div className={style.container}>
					<h2 className={style.title}>About Me</h2>
					<p>Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology</p>
					<div className={style["about-content"]}>
						<div className={style["about-info"]}>
							<h3>Get to know me!</h3>
							
							<p>
								I am a <span>Full-Stack Web Developer</span> specializing in creating end-to-end solutions. I design and implement both the <span>scalable 
								backend APIs and database structures </span>(the stuff you don't see) and the <span>responsive frontend applications </span>
								(the stuff you do see). My mission is to deliver robust products that directly contribute to overall business success.</p>
						
						</div>
						<div className={style["my-skill"]}>
							<h3>My Skills</h3>
							<div className={style.skills}>
								{
									skills.map((skill, index) => {
										return <div key={`skill${index}`} className={`${style.skill} ${style[skill.cssName]}`}>
											<div className={style["skill-name"]}>{skill.name}</div>
											<div className={style["skill-icon"]}>{skill.icon}</div>
										</div>
									})
								}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Projects */}
			<div id='Projects' className={style.projects}>
				<div className={style.container}>
					<h2 className={style.title}>Projects</h2>
					<p>Here you will find some of the personal and clients projects that I created with each project containing its own case study</p>
					<div className={style["projects-list"]}>
						{
							projects.map((project, index) => {
								return <div key={`project${index}`} className={style.project}>
									<div className={style["project-image"]}>
										<img src={project.image} alt="Project Image" />
									</div>
									<div className={style["project-info"]}>
										<h3>{project.name}</h3>
										<p>{project.description}</p>
										<div className={style["project-buttons"]}>
		
											<IconButton
												width="100px"
												height="50px"
												backgroundColor="black"
												color="white"
												link={project.github}
												icon={<AiFillGithub size="25px" color='white' />}
											>
												Github
											</IconButton>
										</div>
									</div>
								</div>
							})
						}

					</div>
				</div>
			</div>

			{/* Contact */}
			<div id='Contact' className={style.contact}>
				<div className={style.container}>
					<h2 className={style.title}>Contact</h2>
					<p>Feel free to Contact me by submitting the form below and I will get back to you as soon as possible</p>
					<form
						ref={form} onSubmit={sendEmail}
						className={
							clsx(
								{ [style['inactive-form']]: loading }
							)}
					>
						<InputField
							width="700px"
							height="40px"
							name="name"
							placeholder="Enter Your Name"
							label="Name"
							type="text"
						/>
						<InputField
							width="700px"
							height="40px"
							name="email"
							placeholder="Enter Your Email"
							label="Email"
							type="email"
						/>
						<TextAreaField
							width="700px"
							height="250px"
							name="message"
							placeholder="Enter Your Message"
							label="Message"
							type="text"
						/>
						<SubmitButton
							icon={<RiSendPlaneFill size="20px" color='white' />}
							width="200px"
							height="60px"
							color="white"
							backgroundColor="var(--primary-main)"
						>
							Submit
						</SubmitButton>
						{
							loading &&
							<div className={style.loader}>
								<Loader />
							</div>
						}
					</form>
				</div>
			</div>

			{/* footer */}
			<div className={style.footer}>
				<div className={style.container}>
					<div className={style["footer-info"]}>
						<div>
							<h3>INDERJIT SINGH</h3>
							<p>I am a Full-Stack Developer who builds complete, high-quality web applications.</p>
						</div>
						<div className={style.social}>
							<h3>Social</h3>
							<div className="">
								<a className={style.git} target="_blank" href='https://github.com/InderjitSingh377' >
									<AiFillGithub size="30px" color='white' />
								</a>
								<a className={style.linkedin} target="_blank" href='https://www.linkedin.com/in/inderjit-singh-73b297141/' >
									<AiFillLinkedin size="30px" color='white' />
								</a>
								<a className={style.blogger} target="_blank" href="https://codewithinderr.blogspot.com/" >
						<BiLogoBlogger size="30px" color='white' />
								</a>
								<a className={style.instagram} target="_blank" href='https://www.instagram.com/codewithinder__13' >
									<BsInstagram size="30px" color='white' />
								</a>
							</div>
						</div>
					</div>
					<div className={style["copy-right"]}>
						© Copyright 2025. Made by <span>INDERJIT SINGH</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;