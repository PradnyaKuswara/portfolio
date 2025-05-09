import React from 'react';
import CertificateNamespace from '../../../@types/certificate';
import { convertDateTime } from '../../../helpers/date';

interface CertificateTableProps {
  data: CertificateNamespace.Certificate[];
  editModal: (data: CertificateNamespace.Certificate) => void;
  handleDelete: (uuid: string) => void;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
  data,
  editModal,
  handleDelete,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Organization</th>
          <th>Month Obtained</th>
          <th>Year Obtained</th>
          <th>Month Expired</th>
          <th>Year Expired</th>
          <th>Url</th>
          <th>Description</th>
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
              <td>{item.organization}</td>
              <td>{item.month_obtained}</td>
              <td>{item.year_obtained}</td>
              <td>{item.month_expired}</td>
              <td>{item.year_expired}</td>
              <td>{item.url}</td>
              <td>{item.description}</td>
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

export default CertificateTable;
