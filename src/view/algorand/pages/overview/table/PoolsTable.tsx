import React from 'react';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/algorand/overview/overviewSelectors';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import PoolTable from 'src/view/algorand/components/PoolTable';
import Pagination from 'src/view/shared/table/Pagination';

function PoolsTable({ pools }) {

  const loading = useSelector(
    selectors.selectLoading,
  );

  const poolPagination = useSelector(
    selectors.selectPoolPagination,
  );

  const doPoolPagination = (pagination) => {};

  return (
    <div className=" top-assets-table">
      <TableWrapper >
        <PoolTable
          loading={loading}
          pools={pools}
        />
      </TableWrapper>
      <Pagination
        onChange={doPoolPagination}
        disabled={loading}
        pagination={poolPagination}
      />
    </div>
  )
}

export default PoolsTable;
