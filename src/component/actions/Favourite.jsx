import '../../App.css';
import { FavouriteOff, FavouriteOn } from '../image/WIMicons';

export const isActive = (value, arr) => {
  return (arr.find(item => item.id === value.id) ? true : false)
}

export const Favourite = ({ project, modifyChoices, active }) => (
  < button
    type="button"
    onClick={() => modifyChoices(project, (active ? 'REMOVE_FAVOURITE_PROJECTS' : 'ADD_TO_FAVOURITE_PROJECTS'))}
  >
    {(active ? <FavouriteOn /> : <FavouriteOff />)}
  </button >
);
