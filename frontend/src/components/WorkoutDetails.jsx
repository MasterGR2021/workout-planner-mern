import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDateToNow from 'date-fns/formatDistanceToNow';
import { FaTrashAlt } from 'react-icons/fa';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const deleteHandler = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELTE_WORKOUT', payload: json });
    }
  };
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps :</strong>
        {workout.reps}
      </p>
      <p className='time'>
        {formatDateToNow(new Date(workout.createdAt)) + ' ago'}
      </p>
      <button onClick={deleteHandler}>
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default WorkoutDetails;
