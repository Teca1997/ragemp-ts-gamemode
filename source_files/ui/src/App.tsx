import './components/Toast/ToastManager';
import './styles/index.css';

import { Bounce, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Auth from './pages/Auth/Auth';
import { CEF } from '@shared';
import CharacterCreator from './pages/CharacterCreator/CharacterCreator';
import CharacterSelector from './pages/CharacterSelector/CharacterSelector';
import Hud from './pages/Hud/Hud';
import { RootState } from './redux/store';
import { pageManagerActions } from './redux/slices/pageManagerSlice';

function App() {
	const dispatch = useDispatch();
	const currentPage = useSelector((state: RootState) => state.pageManager.currentPage);

	if (window.mp) {
		mp.events.add(CEF.Events.PageManager.SetPage, (page: string) =>
			dispatch(pageManagerActions.setPage(page))
		);
	}
	return (
		<>
			{currentPage === CEF.Pages.Auth && <Auth />}
			{currentPage === CEF.Pages.CharacterSelector && <CharacterSelector />}
			{currentPage === CEF.Pages.CharacterCreator && <CharacterCreator />}
			{currentPage === CEF.Pages.Hud && <Hud />}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
		</>
	);
}

export default App;
