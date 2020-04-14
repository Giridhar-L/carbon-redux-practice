import React from 'react';
import { useEffect, useState } from 'react';
import RepoTable from './RepoTable';
import { DataTableSkeleton, Pagination } from 'carbon-components-react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const RepoPage = props => {
  const headers = props.repos.headers;
  const rows = props.repos.rows;

  // const [headers, setHeaders] = useState([]);
  // const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalItems, setTotalItems] = useState(0);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(3);

  useEffect(() => {
    //local json hosted using json-server for development purpose
    //command from Data folder -- json-server --watch repoTable.json --port 3004
    fetch('http://localhost:3004/data')
      .then(res => res.json())
      .then(data => {
        props.loadRepos(data);
        // setHeaders(data.headers);
        // setRows(data.rows);
        setTotalItems(data.rows.length);
        setLoading(false);
      })
      .catch(err => console.error(err));
    return () => {};
  }, []);

  if (loading) {
    return (
      <DataTableSkeleton columnCount={6} rowCount={10} headers={headers} />
    );
  } else {
    return (
      <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
        <div className="bx--row repo-page__r1">
          <div className="bx--col-lg-16">
            <RepoTable
              headers={headers}
              rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)}
            />
            <Pagination
              totalItems={totalItems}
              backwardText="Previous page"
              forwardText="Next page"
              pageSize={currentPageSize}
              // pageSizes={[5, 10, 15, 25]}
              pageSizes={[3, 6, 9, 12, 15]}
              itemsPerPageText="Items per page"
              onChange={({ page, pageSize }) => {
                console.log(`page:${page} -- pagesize:${pageSize}`);
                if (pageSize !== currentPageSize) {
                  setCurrentPageSize(pageSize);
                }
                setFirstRowIndex(pageSize * (page - 1));
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    repos: state.repo.repos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRepos: data => dispatch(actions.loadRepos(data)),
    // isFileUploading: (status) => dispatch(actions.updateFileUploadFlag(status))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoPage);
