import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });
    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-block'>
        <label htmlFor='github_username'>Usuário do GitHub</label>
        <input
          name='github_username'
          id='github_username'
          required
          value={github_username}
          onChange={event => setGithubUsername(event.target.value)}
        />
      </div>

      <div className='input-block'>
        <label htmlFor='techs'>Tecnologias</label>
        <input
          name='techs'
          id='techs'
          required
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />
      </div>

      <div className='input-group'>
        <div className='input-block'>
          <label htmlFor='latitude'>Latitude</label>
          <input
            name='latitude'
            id='latitude'
            type='number'
            value={latitude}
            required
            onChange={event => setLatitude(event.target.value)}
          />
        </div>
        <div className='input-block'>
          <label htmlFor='Longitude'>Longitude</label>

          <input
            name='longitude'
            id='longitude'
            type='number'
            value={longitude}
            required
            onChange={event => setLongitude(event.target.value)}
          />
        </div>
      </div>
      <button type='submit'>Salvar</button>
    </form>
  );
}
