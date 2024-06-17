import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "./store/store";
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <div id="app-wrapper">
      <div id="app-main">
        <App />
      </div>
    </div>
  </Provider>,
)
