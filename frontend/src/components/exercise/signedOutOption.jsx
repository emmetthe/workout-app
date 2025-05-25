import { Link } from 'react-router-dom';

const SignedOut = () => {
  return (
    <div className="text-center my-6">
      <h2 className="text-2xl font-bold">
        Please{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          login
        </Link>{' '}
        or{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          register
        </Link>{' '}
        to continue
      </h2>
    </div>
  );
};

export default SignedOut;
