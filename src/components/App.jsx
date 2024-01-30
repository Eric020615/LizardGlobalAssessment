import Table from './table/Table';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './details/Detail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Table/>}/>
        <Route path='/details' element={<Detail/>}/>
      </Routes>
    </BrowserRouter>
  );
}
