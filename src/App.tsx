import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import { store } from './store';
import { customTheme } from './theme';
function App() {
    return (
        <ConfigProvider theme={customTheme}>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
