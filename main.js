var btnRecord = document.querySelector("Button#btnRecord");
var btnStop = document.querySelector("Button#btnStop");

function successCallBack(stream) {
	var recordRTC = RecordRTC(stream, { type: 'audio' });
	recordRTC.startRecording();
	recordRTC.stopRecording(function(audioURL) {
		
}

function errorCallBack(error) {
	console.log("getUserMedia error: " + error);
}

navigator.mediaDevices.getUserMedia({ audio:true }).then(successCallBack).catch(errorCallBack);
