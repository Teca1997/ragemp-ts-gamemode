import './components/Toast/ToastManager';
import './styles/index.css';

import { Bounce, ToastContainer } from 'react-toastify';

import { CEF } from '@shared';
import Auth from './pages/Auth/Auth';
import CharacterCreator from './pages/CharacterCreator/CharacterCreator';
import CharacterSelector from './pages/CharacterSelector/CharacterSelector';
import Hud from './pages/Hud/Hud';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { pageManagerActions } from './redux/slices/pageManagerSlice';
import { RootState } from './redux/store';

function App() {
	const dispatch = useAppDispatch();
	const currentPage = useAppSelector(
		(state: RootState) => state.pageManager.currentPage
	);

	mp.events.add(CEF.Events.PageManager.SetPage, (page: string) =>
		dispatch(pageManagerActions.setPage(page))
	);
	return (
		<>
			{currentPage === CEF.Pages.Auth && <Auth />}
			{currentPage === CEF.Pages.CharacterSelector && (
				<CharacterSelector />
			)}
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
