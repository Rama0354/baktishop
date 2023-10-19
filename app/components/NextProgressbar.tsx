'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function NextProgressbar() {
  return (
    (
        <ProgressBar
              height="4px"
              color="#fff"
              options={{ showSpinner: false }}
              shallowRouting
            />
    )
  )
}
