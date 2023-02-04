import * as React from 'react';

import { Stack } from '@mui/system';
import OverviewSetting from 'src/features/serverSetting/components/OverviewSetting';
import RoleSetting from 'src/features/serverSetting/components/RoleSetting';
import MemberSetting from 'src/features/serverSetting/components/MemberSetting';

const contentSettingServer = (props) => {
  const indexTab = props.index;
  return (
    <>
      <Stack pt={6} pl={2}>
        {(() => {
          switch (indexTab) {
            case 0:
              return <OverviewSetting />;
            case 1:
              return <RoleSetting />;
            case 2:
              return <MemberSetting />;
            default:
              return 0;
          }
        })()}
      </Stack>
    </>
  );
};

export default contentSettingServer;
