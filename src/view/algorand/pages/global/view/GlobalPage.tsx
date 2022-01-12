import React from 'react';
import { i18n } from 'src/i18n';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import GlobalChart from 'src/view/algorand/pages/global/chart/GlobalChart';

function AlgoExplorerPage() {

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('algorand.menu'), '/algorand'],
          ['Global'],
        ]}
      />
      <GlobalChart />
    </>
  )
}

export default AlgoExplorerPage;
