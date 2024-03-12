import RootStore from "./stores/RootStore"
import { AppRouter } from "./pages/Router"
import { RootContext } from './hooks/RootContext'

function App() {

    return (
        <RootContext.Provider value={new RootStore()}>
            <AppRouter/>
        </RootContext.Provider>
  )
}

export default App
