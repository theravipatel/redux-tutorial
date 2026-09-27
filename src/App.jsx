import ApiCallWithCreateAsyncThunk from './ApiCallWithCreateAsyncThunkComponent'
import GetApiCallWithRtkQuery from './GetApiCallWithRtkQueryComponent'
import './App.css'
import MyCounter from './MyCounterComponent'
import PostApiCallWithRtkQuery from './PostApiCallWithRtkQueryComponent'
import { Button } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import PageNotFound from './components/PageNotFound'
import ListNotes from './components/ListNotes'
import CreateNote from './components/CreateNote'

function App() {

    return (
        <BrowserRouter>
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
            <h2>POST API Call with Redux Toolkit Using RTK Query</h2>
            <PostApiCallWithRtkQuery />
            <br></br>
            <hr />
            <h2>Simple Note App for Practice</h2>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                to="/notes"
                                className={`nav-link bg-primary text-white border ${window.location.pathname === '/notes' ? 'active' : ''}`}
                            >
                                List Notes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/create-note"
                                className={`nav-link bg-primary text-white border ${window.location.pathname === '/create-note' ? 'active' : ''}`}
                            >
                                Create Note
                            </Link>
                        </li>
                    </ul>
                </nav>

                <hr />
                <br></br>
                <Routes>
                    <Route path="/notes" element={<ListNotes />} />
                    <Route path="/create-note" element={<CreateNote />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            <br></br>
            <hr />
        </BrowserRouter>
    )
}

export default App
