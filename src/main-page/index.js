import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './main-page.css';
import Header from './Header';
import Students from './Students';
import StudentForm from '../components/StudentForm';

function App() {
  return (
    <Router>
      <Header>
        title="Tutor: Rostan"
      </Header>
          <Routes>    
            <Route path="/student/:id" element={<StudentForm/>} />
            <Route path="/student" element={<StudentForm/>} />
            <Route exact path="/" element={
            <Students>
              title="Tutor: Rostan"
            </Students>
            } 
            />
          </Routes>
    </Router>
  );
}

export default App;
