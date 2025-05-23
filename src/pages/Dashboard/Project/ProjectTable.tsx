import React from 'react';
import ProjectNamespace from '../../../@types/project';
import { convertDateTime } from '../../../helpers/date';

interface ProjectTableProps {
  data: ProjectNamespace.Project[];
  editModal: (data: ProjectNamespace.Project) => void;
  handleDelete: (slug: string) => void;
  handleChangeStatus: (slug: string) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  data,
  editModal,
  handleDelete,
  handleChangeStatus,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Status</th>
          <th>No</th>
          <th>Title</th>
          <th>Category</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item.id}>
              {item.is_active ? (
                <td>
                  <button
                    className="badge badge-success text-success-content rounded-sm"
                    onClick={() => handleChangeStatus(item.slug)}
                  >
                    Active
                  </button>
                </td>
              ) : (
                <td>
                  <button
                    className="badge badge-error text-error-content rounded-sm"
                    onClick={() => handleChangeStatus(item.slug)}
                  >
                    Inactive
                  </button>
                </td>
              )}
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.ProjectCategory.name}</td>
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
                  onClick={() => handleDelete(item.slug)}
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

export default ProjectTable;
