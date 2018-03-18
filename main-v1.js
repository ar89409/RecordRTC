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
				var uint8 = new Uint8Array(reader.result);
				var n_uint8 = uint8.subarray(0,200);
				var n_str = "";
				for (var i = 0; i < n_uint8.length; i++) {
					var ch = String.fromCharCode(n_uint8[i]);
					n_str = n_str.concat(ch);
				}
				console.log(n_str);
			});
			reader.readAsArrayBuffer(recordedBlob);
		});
	}		
}

function errorCallBack(error) {
	console.log("getUserMedia error: " + error);
}

navigator.mediaDevices.getUserMedia({ audio:true }).then(successCallBack).catch(errorCallBack);
