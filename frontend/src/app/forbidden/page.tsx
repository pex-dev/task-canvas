'use client';

import CustomErrorBox from '@/_components/organisms/CustomErrorBox';

const Custom403 = () => (
  <CustomErrorBox
    statusCode="403"
    message="このページにアクセスする権限がありません"
    description={<>URLにタイプミスがないか再度ご確認ください。</>}
  />
);

export default Custom403;