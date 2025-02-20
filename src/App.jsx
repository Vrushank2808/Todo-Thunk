import { Provider } from "react-redux"
import {store} from "./store/store"
import Todo from "./components/Todo"
import "./styles.css"

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  )
}

export default App
