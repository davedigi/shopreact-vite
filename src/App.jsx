import { useState } from 'react'
import './App.css';
import List from './component/list/List';
import Navbar from './component/navbar/Navbar';
import { isActive } from './component/actions/Favourite';

function App() {

	let persistent = window.localStorage.getItem('projects_favourite')
	if (!persistent) {
		persistent = []
	} else {
		persistent = JSON.parse(persistent)
	}
	console.log('persistent:', persistent)
	const [favouriteProjects, setFavouritedProjects] = useState(persistent);

	const modifyChoices = (project, action) => {
		const newFavouriteProjects = [...favouriteProjects];

		switch (action) {
			case 'ADD_TO_FAVOURITE_PROJECTS':
				console.log('ATTEMPT TO ADD_TO_FAVOURITE_PROJECTS :', project)
				if (!isActive(project, newFavouriteProjects)) {
					newFavouriteProjects.push(project);
					setFavouritedProjects(newFavouriteProjects);
					console.log('ADD_TO_FAVOURITE_PROJECTS :', project)
				} else {
					console.log('FAILED TO ADD_TO_FAVOURITE_PROJECTS: it is present')
				}

				break;
			case 'REMOVE_FAVOURITE_PROJECTS':
				console.log('ATTEMPT TO REMOVE_FAVOURITE_PROJECTS :', project)
				if (isActive(project, persistent)) {
					let idxToRemove = newFavouriteProjects.findIndex(item => item.id === project.id)
					newFavouriteProjects.splice(idxToRemove, 1)
					setFavouritedProjects(newFavouriteProjects);
					console.log('REMOVE_FAVOURITE_PROJECTS :', idxToRemove)
				} else {
					console.log('FAILED TO REMOVE_FAVOURITE_PROJECTS: it is NOT present')
				}
				break;
			default:
				return {};
		}
		try {
			window.localStorage.setItem('projects_favourite', JSON.stringify(newFavouriteProjects))
		} catch (error) {
			console.error('ERROR window.localStorage.setItem(projects_favourite)', error)
		}
	};

	return (
		<>
			<Navbar />
			<List modifyChoices={modifyChoices} />
		</>
	);
}

export default App;
