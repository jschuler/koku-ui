import {
  global_Color_100,
  global_FontSize_4xl,
  global_FontSize_xs,
  global_LineHeight_sm,
  global_spacer_md,
  global_spacer_sm,
  global_spacer_xs,
} from '@patternfly/react-tokens';
import React from 'react';

export const styles = {
  reportSummaryDetails: {
    marginBottom: global_spacer_md.value,
    display: 'flex',
    alignItems: 'flex-end',
  },
  text: {
    paddingBottom: global_spacer_sm.value,
    lineHeight: global_LineHeight_sm.value,
    fontSize: global_FontSize_xs.value,
  },
  units: {
    paddingLeft: global_spacer_xs.value,
    paddingBottom: global_spacer_sm.value,
    lineHeight: global_LineHeight_sm.value,
    fontSize: global_FontSize_xs.value,
    whiteSpace: 'nowrap',
  },
  value: {
    color: global_Color_100.var,
    marginRight: global_spacer_sm.value,
    fontSize: global_FontSize_4xl.value,
  },
  valueContainer: {
    display: 'inline-block',
    marginBottom: global_spacer_md.value,
    width: '50%',
    wordWrap: 'break-word',
  },
} as { [className: string]: React.CSSProperties };
