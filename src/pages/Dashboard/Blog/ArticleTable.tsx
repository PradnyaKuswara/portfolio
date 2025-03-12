import React from 'react';
import ArticleNamespace from '../../../@types/article';
import { convertDateTime } from '../../../helpers/date';

interface ArticleTableProps {
  data: ArticleNamespace.Article[];
  editModal: (data: ArticleNamespace.Article) => void;
  handleDelete: (slug: string) => void;
  handleUpdateStatus: (slug: string) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  data,
  editModal,
  handleDelete,
  handleUpdateStatus,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Status</th>
          <th>Title</th>
          <th>Meta Description</th>
          <th>Meta Keyword</th>
          <th>Tag</th>
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
              <td>
                {item.is_active ? (
                  <button
                    onClick={() => handleUpdateStatus(item.slug)}
                    className="badge badge-success text-success-content rounded-sm"
                  >
                    Active
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(item.slug)}
                    className="badge badge-error text-error-content rounded-sm"
                  >
                    Inactive
                  </button>
                )}
              </td>
              <td>{item.title}</td>
              <td>{item.meta_desc}</td>
              <td>{item.meta_keyword}</td>
              <td>
                {item.tags.map((tag, index) => (
                  <span key={index} className="badge badge-primary rounded-sm">
                    #{tag.name}
                  </span>
                ))}
              </td>
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

export default ArticleTable;
