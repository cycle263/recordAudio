import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(error) {
        console.error(error.message);
    },
});

// 2. Plugins
app.use({});

// 3. Model
app.model(require('./models/record').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
