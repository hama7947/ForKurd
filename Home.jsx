import React, {useEffect,useState} from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [apps, setApps] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=>{ fetchApps(); }, []);
  async function fetchApps(){
    try{
      const res = await API.get('/apps');
      setApps(res.data);
    }catch(err){ console.error(err); }
  }
  async function onSearch(e){
    e.preventDefault();
    try{
      const res = await API.get('/apps', { params:{ q }});
      setApps(res.data);
    }catch(err){ console.error(err); }
  }

  return (
    <div>
      <form className="search" onSubmit={onSearch}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="گەڕان..." />
        <button>گەڕان</button>
      </form>

      <div className="grid">
        {apps.length===0 && <p>هیچ بەرنامە نەدۆزراوە.</p>}
        {apps.map(a=>(
          <div className="card" key={a._id}>
            <img src={a.iconUrl || '/placeholder.png'} alt="" />
            <h3>{a.title}</h3>
            <p>{a.description?.slice(0,120)}</p>
            <Link to={`/app/${a._id}`}>زیاتر</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
