import React from 'react';
import CertificateNamespace from '../../../@types/certificate';

interface CertificateTableProps {
  data: CertificateNamespace.Certificate[];
}

const CertificateTable: React.FC<CertificateTableProps> = ({ data }) => {
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
              <td>{item.createdAt.toLocaleDateString()}</td>
              <td>{item.updatedAt.toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
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
