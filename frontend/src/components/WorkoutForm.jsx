import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useWorkoutsContext();

  const [emptyFields, setEmptyFields] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError('');
      console.log('New Workout Added');
      setTitle('');
      setReps('');
      setLoad('');
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <h2>Add a New Workout</h2>
      <label htmlFor='title'>Exercise Title</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type='text'
        name='title'
        id='title'
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label htmlFor='reps'>Reps</label>
      <input
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        type='number'
        name='reps'
        id='reps'
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label htmlFor='load'>Load</label>
      <input
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        type='number'
        name='load'
        id='load'
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <button>Add Workout</button>
      {error && <div className='error-mssg'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
