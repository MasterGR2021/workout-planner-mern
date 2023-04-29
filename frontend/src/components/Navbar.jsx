import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar container'>
      <Link to='/' className='brand'>
        Workout Planner
      </Link>
    </div>
  );
};

export default Navbar;
