import { global_FontSize_xs, global_spacer_sm } from '@patternfly/react-tokens';
import React from 'react';

const styles = {
  chartTitle: {
    fontSize: global_FontSize_xs.value,
    marginBottom: global_spacer_sm.value,
  },
} as { [className: string]: React.CSSProperties };

interface ChartTitleProps {
  children: React.ReactNode;
}

const ChartTitle: React.SFC<ChartTitleProps> = ({ children }) => (
  <div style={styles.chartTitle}>{children}</div>
);

export { ChartTitle, ChartTitleProps };
