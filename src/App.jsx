import ApiCallWithCreateAsyncThunk from './ApiCallWithCreateAsyncThunkComponent'
import GetApiCallWithRtkQuery from './GetApiCallWithRtkQueryComponent'
import './App.css'
import MyCounter from './MyCounterComponent'

function App() {

    return (
        <>
            <h1>React Redux & Redux Toolkit Tutorial</h1>
            <br></br><br></br>
            <h2>Basic Example of Counter to setup store with Redux & RTK:</h2>
            <MyCounter></MyCounter>
            <br></br>
            <hr />
            <h2>API Call with Redux Toolkit Using createAsyncThunk</h2>
            <ApiCallWithCreateAsyncThunk />
            <br></br>
            <hr />
            <h2>GET API Call with Redux Toolkit Using RTK Query</h2>
            <GetApiCallWithRtkQuery />
            <br></br>
            <hr />
        </>
    )
}

export default App
