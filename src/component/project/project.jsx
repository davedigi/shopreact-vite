import { Favourite, isActive } from '../actions/Favourite';
import ImageComponent from '../image/image';

const Project = ({ project, modifyChoices }) => {
    const { id, retailer, title, category } = project;
    let persistent = window.localStorage.getItem('projects_favourite')
    if (!persistent) {
		persistent = []
	} else {
		persistent = JSON.parse(persistent)
	}
    const active = isActive(project, persistent)
    const im = 'https://random-image-pepebigotes.vercel.app/api/random-image?'+id
    console.log('im='+im)
    return (
        <>
            <div className="project">

                <ImageComponent width='100%' src={im} />
                <div className='detail'>
                    <h4>{retailer}</h4>
                    <h3>{title}</h3>
                    <h5>{category}</h5>
                </div>
            </div>
            <Favourite
                project={project}
                modifyChoices={modifyChoices}
                active={active}
            />
        </>
    );
};

export default Project;