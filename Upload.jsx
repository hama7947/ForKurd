import React, {useState} from 'react';
import API from '../api';

export default function Upload(){
  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [category,setCategory]=useState('');
  const [icon,setIcon]=useState(null);
  const [apk,setApk]=useState(null);

  async function submit(e){
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', desc);
    fd.append('category', category);
    if(icon) fd.append('icon', icon);
    if(apk) fd.append('apk', apk);
    try{
      // NOTE: this route requires auth (JWT). For quick testing, you can temporarily comment 'auth' middleware in backend/routes/apps.js
      const res = await API.post('/apps', fd, { headers:{ 'Content-Type':'multipart/form-data' }});
      alert('Uploaded: ' + res.data.title);
    }catch(err){ console.error(err); alert('Upload failed. See console.'); }
  }

  return (
    <form className="upload-form" onSubmit={submit}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="ناو" required />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="وەسف" />
      <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="هاوپۆل" />
      <label>Icon: <input type="file" onChange={e=>setIcon(e.target.files[0])} /></label>
      <label>APK: <input type="file" onChange={e=>setApk(e.target.files[0])} /></label>
      <button>پێشکەش</button>
    </form>
  );
}
