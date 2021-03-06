import { Report, ReportPathsType, ReportType } from 'api/reports/report';
import { runReport } from 'api/reports/reportUtils';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { FetchStatus } from 'store/common';
import { RootState } from 'store/rootReducer';
import { createStandardAction } from 'typesafe-actions';
import { getReportId } from './reportCommon';
import { selectReport, selectReportFetchStatus } from './reportSelectors';

const expirationMS = 30 * 60 * 1000; // 30 minutes

interface ReportActionMeta {
  reportId: string;
}

export const fetchReportRequest = createStandardAction('report/request')<
  ReportActionMeta
>();
export const fetchReportSuccess = createStandardAction('report/success')<
  Report,
  ReportActionMeta
>();
export const fetchReportFailure = createStandardAction('report/failure')<
  AxiosError,
  ReportActionMeta
>();

export function fetchReport(
  reportPathsType: ReportPathsType,
  reportType: ReportType,
  query: string
): ThunkAction<void, RootState, void, any> {
  return (dispatch, getState) => {
    if (!isReportExpired(getState(), reportPathsType, reportType, query)) {
      return;
    }

    const meta: ReportActionMeta = {
      reportId: getReportId(reportPathsType, reportType, query),
    };

    dispatch(fetchReportRequest(meta));
    runReport(reportPathsType, reportType, query)
      .then(res => {
        // See https://github.com/project-koku/koku-ui/pull/580
        // const repsonseData = dropCurrentMonthData(res, query);
        dispatch(fetchReportSuccess(res.data, meta));
      })
      .catch(err => {
        dispatch(fetchReportFailure(err, meta));
      });
  };
}

function isReportExpired(
  state: RootState,
  reportPathsType: ReportPathsType,
  reportType: ReportType,
  query: string
) {
  const report = selectReport(state, reportPathsType, reportType, query);
  const fetchStatus = selectReportFetchStatus(
    state,
    reportPathsType,
    reportType,
    query
  );
  if (fetchStatus === FetchStatus.inProgress) {
    return false;
  }

  if (!report) {
    return true;
  }

  const now = Date.now();
  return now > report.timeRequested + expirationMS;
}
