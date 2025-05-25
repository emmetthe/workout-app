import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const EditableExerciseTable = ({ exercises, onDeleteExercise }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-white">Exercise Name</th>
            <th className="py-3 px-4 text-left font-semibold text-white">Actions</th>
          </tr>
        </thead>

        <tbody>
          {exercises.map((exercise, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-[#2e323d] text-white">
              <td className="py-3 px-4">{exercise.exercise.exerciseName}</td>
              <td className="py-3 px-4">
                <Link
                  to={`/workouts/edit/${exercise.id}`}
                  state={{ exercise }}
                  className="inline-flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FiEdit className="h-5 w-5" />
                </Link>

                <button
                  onClick={() => onDeleteExercise(exercise.id, true)}
                  className="ml-4 inline-flex items-center text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableExerciseTable;
