var media = document.querySelector("video#media");
var btnRecord = document.querySelector("button#btnRecord");
var btnStop = document.querySelector("button#btnStop");

function successCallBack(stream) {
	var recordRTC = RecordRTC(stream, { type: 'audio' });
	
	btnRecord.onclick = function() {
		recordRTC.startRecording();
	}

	btnStop.onclick = function() {
		recordRTC.stopRecording(function(audioURL) {
			media.src = audioURL;
			var recordedBlob = recordRTC.getBlob();
			console.log(recordedBlob);
			var reader = new FileReader();
			reader.addEventListener("loadend", function() {
				console.log(reader.result);
				var uint8array = new Uint8Array(reader.result);
				var string = new TextDecoder("ascii").decode(uint8array);
				console.log(string);
			});
			reader.readAsArrayBuffer(recordedBlob);
		});
	}		
}

function errorCallBack(error) {
	console.log("getUserMedia error: " + error);
}

navigator.mediaDevices.getUserMedia({ audio:true }).then(successCallBack).catch(errorCallBack);
