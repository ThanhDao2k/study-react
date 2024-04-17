import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools} from 'react-query/devtools'

import SuperHeroes from './components/SuperHeroes.page';
import QRSuperHeroes from './components/QRSuperHeroes.page';
import Home from './components/Home.page';
import QRSuperHero from './components/QRSuperHero.page';
import ParallelQueries from './components/ParallelQueries.page';
import DynamicParallel from './components/DynamicParallel.page';
import DependentQueries from './components/DependentQueries.page';
import PaginatedQueries from './components/PaginatedQueries.page';
import InfiniteQueries from './components/InfiniteQueries.page';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-parallel'>ParallelQueries</Link>
              </li>
              <li>
                <Link to='/rq-dynamic-parallel'>DynamicParallel</Link>
              </li>
              <li>
                <Link to='/rq-dependent-queries'>DependentQueries</Link>
              </li>
              <li>
                <Link to='/rq-paginated'>PaginatedQueries</Link>
              </li>
              <li>
                <Link to='/rq-infinite'>InfiniteQueries</Link>
              </li>
            </ul>
          </nav>
      <Routes>
            <Route path='/super-heroes' element={<SuperHeroes />}/>
            <Route path='/rq-super-heroes' element={<QRSuperHeroes />}/>
            <Route path='/'element={<Home />}/>
            <Route path='/rq-super-heroes/:heroId' element={<QRSuperHero />}/>
            <Route path='/rq-parallel' element={<ParallelQueries />}/>
            <Route path='/rq-dynamic-parallel' element={<DynamicParallel heroIds={[1,3]} />}/>
            <Route path='/rq-dependent-queries' element={<DependentQueries email='daoanh479@gmail.com' />}/>
            <Route path='/rq-paginated' element={<PaginatedQueries />}/>
            <Route path='/rq-infinite' element={<InfiniteQueries />}/>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
        </div>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
