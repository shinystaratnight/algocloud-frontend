import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { formatNumber, formatPercent } from 'src/modules/algorand/utils';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import Spinner from 'src/view/shared/Spinner';
import { images } from 'src/images/images';
import { NoteModal } from 'src/view/algorand/components/Notes';

function AssetTable(props) {
  const {
    loading,
    assets,
    favoriteIds,
    showcaseId,
    togglePermission,
    showcasePermission,
    hasRows,
    sorter,
    doChangeSort,
    setToogleId,
    setShowcaseId,
  } = props;

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [id, setId] = useState(null);

  const onClickComment = (_id) => {
    setOpenCreateModal(true);
    setId(_id)
  }

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  }


  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped mt-2">
        <thead className="thead">
          <tr>
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='name'
              label='NAME'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='unitName'
              label='SYMBOL'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='marketCap'
              label='MCAP'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='liquidity'
              label='LIQUIDITY'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='lastDayVolume'
              label='VOL[24H]'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='price'
              label='PRICE'
            />
            <TableColumnHeader
              onSort={doChangeSort}
              hasRows={hasRows}
              sorter={sorter}
              name='lastDayPriceChange'
              label='24H %'
            />
            <TableColumnHeader
              name='favorite'
              label='FAVORITE'
            />
            <TableColumnHeader
              name='showcase'
              label='SHOWCASE'
            />
            <TableColumnHeader
              name='more'
              label=''
              align='right'
            />
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={100}>
                <Spinner />
              </td>
            </tr>
          )}
          {!loading && !assets.length && (
            <tr>
              <td colSpan={100}>
                <div className="d-flex justify-content-center">
                  {i18n('table.noData')}
                </div>
              </td>
            </tr>
          )}
          {!loading && (assets.length > 0) && assets.map((asset) => {
            let image = asset.assetId === 0 ? '/assets/asa-list/ALGO/icon.png' : `https://algoexplorer.io/images/assets/big/light/${asset.assetId}.png`;
            for (let i = 0; i < images.length; i++) {
              const img = images[i];
              let id = parseInt(img.split('-')[1]);
              if (id == asset.assetId) {
                image = `/assets/asa-list/${img}/icon.png`;
                break;
              }
            }
            return (
              <tr key={asset.id}>
                <td>
                  <Link to={`/algorand/assets/${asset.assetId}`}>
                    <img src={image} style={{ width: 25, marginRight: 10, objectFit: 'contain', float: 'left' }}></img>
                    <h6 className='table-algo-title'>{asset.name}</h6>
                  </Link>
                </td>
                <td><b>{asset.unitName}</b></td>
                <td>{formatNumber(asset.marketCap)}</td>
                <td>{formatNumber(asset.liquidity)}</td>
                <td>{formatNumber(asset.lastDayVolume)}</td>
                <td>{formatNumber(asset.price)}</td>
                <td>
                  <span className={(parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? 'text-danger' : 'text-success'}>{formatPercent(asset.lastDayPriceChange)}
                    {asset.lastDayPriceChange ? (parseFloat(formatPercent(asset.lastDayPriceChange)) < 0) ? <span>{'  '}<i
                      className={`fas fa-arrow-down`}
                    ></i></span> : <span>{'  '}<i
                      className={`fas fa-arrow-up`}
                    ></i></span> : ''}
                  </span>
                </td>
                <td>
                  {togglePermission && (
                    <button
                      className="btn btn-algocloud-default me-1 mb-1"
                      onClick={() =>
                        setToogleId(asset.assetId)
                      }
                    >
                      <b>{favoriteIds.includes(asset.assetId) ? <div><svg className="svg-inline--fa fa-minus fa-w-14 me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Unfavorite</div> : <div><svg className="svg-inline--fa fa-plus fa-w-14 me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>Favorite</div>}</b>
                    </button>
                  )}
                </td>
                <td>
                  {showcasePermission && (
                    <button
                      className="btn btn-algocloud-default me-1 mb-1"
                      disabled={asset.assetId === showcaseId}
                      onClick={() =>
                        setShowcaseId(asset.assetId)
                      }
                    >
                      <b>{asset.assetId === showcaseId ? 'Currently Set' : 'Set As Main'}</b>
                    </button>
                  )}
                </td>
                <td>
                  <button className='btn btn-sm' onClick={() => onClickComment(asset.assetId)}>
                    <i className='ml-2 fas fa-comment'></i>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {
        openCreateModal && (
          <NoteModal
            onClose={handleCloseCreateModal}
            cancelText={i18n('note.modal.cancel')}
            okText={i18n('note.modal.okText')}
            assetId={id}
          />
        )
      }
    </div>
  );
}

export default AssetTable;
