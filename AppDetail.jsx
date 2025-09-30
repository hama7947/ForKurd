import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function AppDetail(){
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(()=>{ if(id) fetchApp(); }, [id]);
  async function fetchApp(){
    try{
      const res = await API.get(`/apps/${id}`);
      setApp(res.data);
    }catch(err){ console.error(err); }
  }
  if(!app) return <p>Loading...</p>;

  return (
    <div>
      <h2>{app.title}</h2>
      <img src={app.iconUrl || '/placeholder.png'} alt="" style={{maxWidth:160}} />
      <p>{app.description}</p>
      <p>هاوپۆل: {app.category || '—'}</p>
      {app.apkUrl ? <a href={API.defaults.baseURL.replace('/api','') + app.apkUrl} target="_blank" rel="noreferrer">داونلۆد</a> : <p>هیچ داونلۆد نەماوە</p>}
    </div>
  );
}
