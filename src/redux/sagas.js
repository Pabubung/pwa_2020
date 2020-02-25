import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import homeSagas from './home/saga';
import guesehatSagas from './gueSehat/saga';
import leaveRequestSagas from './leaveRequest/saga';
import leaveCreateRequestSagas from './leaveCreateRequest/saga';
import ticketingSagas from './ticket/saga';
import eesApprovalRequestSagas from './essApproval/saga';
import taskRequestSagas from './taskApproval/saga';
import eesApprovalHistoryRequestSagas from './essApprovalHistory/saga';
import iattendSagas from './iattend/saga';
import iattendAgendaSagas from './iattendAgenda/saga';
import iattendQuestionSagas from './iattendQuestion/saga';
import iattendListSagas from './iattendList/saga';
import iattendSpeakerSagas from './iattendSpeaker/saga';
import iattendSponsorSagas from './iattendSponsor/saga';
import iattendPollingSagas from './iattendPolling/saga';
import iattendPollingChooseSagas from './iattendPollingChoose/saga';
import etravelApprovalRequestSagas from './eTravelApproval/saga';
import spklApprovalRequestSagas from './spklApproval/saga';

export default function* rootSaga(getState) {
	yield all([
		authSagas(),
		homeSagas(),
		guesehatSagas(),
		leaveRequestSagas(),
		ticketingSagas(),
		leaveCreateRequestSagas(),
		eesApprovalRequestSagas(),
		taskRequestSagas(),
		iattendSagas(),
		iattendAgendaSagas(),
		iattendQuestionSagas(),
		iattendListSagas(),
		iattendSpeakerSagas(),
		iattendSponsorSagas(),
		iattendPollingSagas(),
		iattendPollingChooseSagas(),
		eesApprovalHistoryRequestSagas(),
		etravelApprovalRequestSagas(),
		spklApprovalRequestSagas()
		
	]);
}
