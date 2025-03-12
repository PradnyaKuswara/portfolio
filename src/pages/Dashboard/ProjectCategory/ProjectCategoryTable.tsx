import React from 'react';
import ProjectCategoryNamespace from '../../../@types/project-category';
import { convertDateTime } from '../../../helpers/date';

interface ProjectCategoryTableProps {
  data: ProjectCategoryNamespace.ProjectCategory[];
  editModal: (data: ProjectCategoryNamespace.ProjectCategory) => void;
  handleDelete: (uuid: string) => void;
}

const ProjectCategoryTable: React.FC<ProjectCategoryTableProps> = ({
  data,
  editModal,
  handleDelete,
}) => {
  return (
    <table className="table table-bordered table-compact table-sm">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>

              <td>{convertDateTime(item.createdAt)}</td>
              <td>{convertDateTime(item.updatedAt)}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => editModal(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.uuid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="text-center">
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProjectCategoryTable;
